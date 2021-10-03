const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
// const httpServer = require('http').createServer(app);
// const io = require('socket.io')(httpServer, {
//   cors: {
//     origin: '*'
//   }
// });
//
// module.exports = io;
//
// io.on('connection', (socket) => {
//   console.log('user connected');
//   // console.log(socket.id);
//
//   socket.on('disconnect', () => {
//     console.log('user disconnected', socket.id);
//   });
// });

const db = require('./app/models');

var corsOptions = {
  origin: '*'
};


app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// simple route
app.get('/', (req, res) => {
  res.json({message: 'Welcome to Raed\'s application.'});
});


async function checkIfRoutinesExist(schemaName, routineType, routineName) {
  let bool = false;

  let stmt = `SELECT IF(COUNT(*) = 0, 'F', 'T') AS ProcedureExists
  FROM INFORMATION_SCHEMA.ROUTINES
  WHERE ROUTINE_SCHEMA = '${schemaName}'
  AND ROUTINE_TYPE = '${routineType}'
  AND UCASE(ROUTINE_NAME) = UCASE('${routineName}');`;

  await db.sequelize.query(stmt).then((result) => {
    bool = result[0][0].ProcedureExists === 'T';
  });

  return bool;
}


db.sequelize.sync().then(() => {
  let bool = checkIfRoutinesExist('jb_angular_final_project', 'PROCEDURE', 'sp_moveCartToOrderItems');
  if (!bool) {
    console.log('creating procedure');
    let stmt = `
CREATE PROCEDURE sp_moveCartToOrderItems(
    pUserId int,
    pShippingDate datetime,
    pTotalPrice float,
    pShippingAddress nvarchar(255),
    pShippingCity nvarchar(255),
    pCreditCardNumber nvarchar(255)
)

BEGIN
    DECLARE \`_rollback\` BOOL DEFAULT 0;
    DECLARE pOrderId int;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET \`_rollback\` = 1;

    START TRANSACTION;

    insert into orders (userId, orderDate, shippingDate, totalPrice, shippingCity, shippingAddress, createdAt,
                        updatedAt, creditCardNumber)
    values (pUserId, now(), pShippingDate, pTotalPrice, pShippingCity, pShippingAddress, now(), now(),
            pCreditCardNumber);

    set pOrderId = last_insert_id();

    insert into order_items (orderId, productId, price, qnt, createdAt, updatedAt)
    select pOrderId as orderId, c.productId, price, qnt, now(), now()
    from shopping_cart_items c
             inner join products p on c.productId = p.id
    where userId = pUserId;
    delete
    from shopping_cart_items
    where userId = pUserId;
    IF \`_rollback\` THEN
        ROLLBACK;
    ELSE
        COMMIT;
    END IF;
END;
`;
    db.sequelize.query(stmt);
  }
});

// routes
require('./app/routes/auth')(app);
require('./app/routes/user')(app);
require('./app/routes/products')(app);
require('./app/routes/categories')(app);
require('./app/routes/orderItems')(app);
require('./app/routes/orders')(app);
require('./app/routes/shoppingCartItem')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;

// httpServer.listen(8080, () => {
app.listen(8080, () => {
  console.log(`Server is running on port ${PORT}.`);
});
