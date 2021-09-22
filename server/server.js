const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*"
    }
});

module.exports = io;

io.on('connection', (socket) => {
    console.log('user connected');
    // console.log(socket.id);

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
    });
})

const db = require('./app/models');
const Role = db.roles;

var corsOptions = {
    origin: '*'
};


app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// simple route
app.get("/", (req, res) => {
    res.json({message: "Welcome to Raed's application."});
});


function initial() {
    Role.create({
        id: 1,
        name: "customer"
    });

    Role.create({
        id: 2,
        name: "admin"
    });

}

// {force:true}
// {alter: true}
db.sequelize.sync().then(() => {
    // console.log('Drop and Resync Db');
    // initial();
});

// routes
require('./app/routes/auth')(app);
require('./app/routes/user')(app);
require('./app/routes/products')(app);
require('./app/routes/categories')(app);
require('./app/routes/orders')(app);
require('./app/routes/shoppingCartItem')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;

httpServer.listen(8080, () => {
    console.log(`Server is running on port ${PORT}.`);
});
