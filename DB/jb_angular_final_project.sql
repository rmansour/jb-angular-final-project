-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 28, 2021 at 06:48 AM
-- Server version: 10.6.4-MariaDB
-- PHP Version: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jb_angular_final_project`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `spGetProducts` (`pageNum` INT, `pageSize` INT)  BEGIN
    set @fromRowNum = (pageNum - 1) * pageSize + 1;
    set @toRowNum = (pageNum * pageSize);

    With Q As (
        select row_number() over (order by product_name) as rowNum, id, product_name
        from products
    ),
         Q1 As (
             select Q.* -- ceiling((rowNum / 3)) as pageNum,
             from Q
             where rowNum between @fromRowNum and @toRowNum
         )
    select *
    from Q1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_moveCartToOrderItems` (`pOrderId` INT, `pUserId` INT)  BEGIN
    DECLARE `_rollback` BOOL DEFAULT 0;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET `_rollback` = 1;
    START TRANSACTION;
    insert into order_items (orderId, productId, price, qnt, createdAt, updatedAt)
    select pOrderId as orderId, c.productId, price, qnt, now(), now()
    from shopping_cart_items c
             inner join products p on c.productId = p.id
    where userId = pUserId;

    IF `_rollback` THEN
        ROLLBACK;
    ELSE
        Begin
            delete
            from shopping_cart_items
            where userId = pUserId;
            IF `_rollback` THEN
                ROLLBACK;
            ELSE
                COMMIT;
            END IF;
        END;
    END IF;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category`, `createdAt`, `updatedAt`) VALUES
(1, 'Alcoholic Beverages', '2021-08-05 22:01:18', '2021-08-05 22:01:48'),
(2, 'Beverages', '2021-08-05 22:01:48', '2021-08-05 22:01:48'),
(3, 'Bread & Bakery', '2021-08-05 22:01:48', '2021-08-05 22:01:48'),
(4, 'Breakfast & Cereal', '2021-08-05 22:01:48', '2021-08-05 22:01:48'),
(5, 'Canned Goods', '2021-08-05 22:01:48', '2021-08-05 22:01:48'),
(6, 'Cleaning Supplies', '2021-08-05 22:01:48', '2021-08-05 22:01:48'),
(7, 'Snacks', '2021-08-05 22:01:48', '2021-08-05 22:01:48'),
(8, 'Dairy, Eggs & Cheese', '2021-08-05 22:01:48', '2021-08-05 22:01:48'),
(9, 'Deli & Cafe', '2021-08-05 22:01:48', '2021-08-05 22:01:48'),
(10, 'Frozen Foods', '2021-08-05 22:01:48', '2021-08-05 22:01:48'),
(11, 'Fruits & Vegetables', '2021-08-05 22:01:48', '2021-08-05 22:01:48'),
(12, 'Grains & Pasta', '2021-08-05 22:01:48', '2021-08-05 22:01:48'),
(13, 'Health & Beauty', '2021-08-05 22:01:48', '2021-08-05 22:01:48'),
(14, 'Meat & Seafood', '2021-08-05 22:01:48', '2021-08-05 22:01:48'),
(15, 'Paper Products', '2021-08-05 22:01:48', '2021-08-05 22:01:48'),
(16, 'Spices & Bake', '2021-08-05 22:01:48', '2021-08-05 22:01:48');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `orderDate` datetime NOT NULL,
  `shippingDate` datetime NOT NULL,
  `totalPrice` decimal(10,2) NOT NULL,
  `shippingCity` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shippingAddress` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `creditCardNumber` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `userId`, `orderDate`, `shippingDate`, `totalPrice`, `shippingCity`, `shippingAddress`, `createdAt`, `updatedAt`, `creditCardNumber`) VALUES
(34, 6, '2021-09-27 14:38:48', '2021-10-01 00:00:00', '21.80', 'Haifa', 'Beit Lekhem 3', '2021-09-27 14:38:48', '2021-09-27 14:38:48', '1234567890123456'),
(35, 6, '2021-09-27 17:36:49', '2021-09-27 00:00:00', '34.00', 'Haifa', 'Beit Lekhem 3', '2021-09-27 17:36:49', '2021-09-27 17:36:49', '1234123412345678');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `price` float NOT NULL,
  `qnt` float NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `orderId`, `productId`, `price`, `qnt`, `createdAt`, `updatedAt`) VALUES
(4, 34, 2, 8, 1, '2021-09-27 18:16:03', '2021-09-27 18:16:03'),
(5, 34, 1, 6.9, 2, '2021-09-27 18:16:03', '2021-09-27 18:16:03');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `product_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `product_img_src` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `product_name`, `category_id`, `price`, `product_img_src`, `createdAt`, `updatedAt`) VALUES
(1, 'Milk 3%', 8, '6.90', 'src', '2021-08-06 19:27:57', '2021-09-01 17:07:31'),
(2, 'Ice Coffee', 9, '8.00', 'src', '2021-08-06 19:28:06', '2021-09-01 16:50:42'),
(3, 'Green Olives', 5, '10.00', 'src', '2021-08-06 19:28:07', '2021-08-06 19:28:00'),
(4, 'Frozen Chicken - 1kg', 14, '25.00', 'src', '2021-08-06 19:28:02', '2021-09-01 16:47:24'),
(5, 'Frozen Beef - 1kg', 14, '32.00', 'src', '2021-08-06 19:28:02', '2021-08-06 19:28:01'),
(6, 'Aperol', 1, '35.00', 'src', '2021-08-06 19:28:02', '2021-08-06 19:28:01'),
(7, 'Black Label - John Walker - Whiskey', 1, '39.00', 'src', '2021-08-06 19:28:02', '2021-08-06 19:28:01'),
(8, 'Russian Standard - Vodka', 1, '39.00', 'src', '2021-08-06 19:28:02', '2021-08-06 19:28:01'),
(9, 'Bulgarian Cheese - 500g', 8, '22.90', 'src', '2021-08-06 19:28:02', '2021-08-06 19:28:01'),
(10, 'Chicken Wings - 1kg', 14, '25.00', 'src', '2021-08-06 19:28:02', '2021-08-06 19:28:01'),
(11, 'Wiener Schnitzel - 500g', 14, '34.00', 'src', '2021-08-06 19:28:02', '2021-08-06 19:28:01'),
(12, 'Cottage 5% - 400g', 8, '17.99', 'src', '2021-08-06 19:28:02', '2021-08-06 19:28:01');

-- --------------------------------------------------------

--
-- Table structure for table `shopping_cart_items`
--

CREATE TABLE `shopping_cart_items` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `qnt` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `shopping_cart_items`
--

INSERT INTO `shopping_cart_items` (`id`, `userId`, `productId`, `qnt`, `createdAt`, `updatedAt`) VALUES
(80, 6, 3, 1, '2021-09-27 17:07:09', '2021-09-27 18:01:08'),
(81, 6, 2, 2, '2021-09-27 17:07:11', '2021-09-27 18:06:18');

-- --------------------------------------------------------

--
-- Table structure for table `temp`
--

CREATE TABLE `temp` (
  `id` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb3 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `temp`
--

INSERT INTO `temp` (`id`, `name`) VALUES
(1, 'a'),
(2, 'b');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `street` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cartCreatedDate` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isAdmin` int(11) NOT NULL,
  `IDnum` int(11) NOT NULL,
  `firstName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `city`, `street`, `cartCreatedDate`, `createdAt`, `updatedAt`, `isAdmin`, `IDnum`, `firstName`, `lastName`) VALUES
(1, 'raied272@gmail.com', '$2a$08$aHd1djVCcZncaTgWevekBu5r1Nl5sLrR.QQUTzgG6CzdrZF8rDdDK', 'Haifa', 'Beit Lekhem 3/6', NULL, '2021-08-05 16:26:14', '2021-08-30 01:27:18', 1, 123456789, 'Raed', 'Mansour'),
(6, 'rabeh@gmail.com', '$2a$08$9AucMRq0lxZ4W9Xy18ZtGOF9Blctd9hCDEBD1kQjxIuZ7n5A81qTu', 'Haifa', 'Beit Lekhem 3', '2021-08-25 20:09:37', '2021-08-24 03:29:40', '2021-08-30 16:54:14', 0, 111111111, 'Rabia', 'Mansour');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orderId` (`orderId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shopping_cart_items`
--
ALTER TABLE `shopping_cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `temp`
--
ALTER TABLE `temp`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDnum` (`IDnum`),
  ADD UNIQUE KEY `IDnum_2` (`IDnum`),
  ADD UNIQUE KEY `IDnum_3` (`IDnum`),
  ADD UNIQUE KEY `IDnum_4` (`IDnum`),
  ADD UNIQUE KEY `IDnum_5` (`IDnum`),
  ADD UNIQUE KEY `IDnum_6` (`IDnum`),
  ADD UNIQUE KEY `IDnum_7` (`IDnum`),
  ADD UNIQUE KEY `IDnum_8` (`IDnum`),
  ADD UNIQUE KEY `IDnum_9` (`IDnum`),
  ADD UNIQUE KEY `IDnum_10` (`IDnum`),
  ADD UNIQUE KEY `IDnum_11` (`IDnum`),
  ADD UNIQUE KEY `IDnum_12` (`IDnum`),
  ADD UNIQUE KEY `IDnum_13` (`IDnum`),
  ADD UNIQUE KEY `IDnum_14` (`IDnum`),
  ADD UNIQUE KEY `IDnum_15` (`IDnum`),
  ADD UNIQUE KEY `IDnum_16` (`IDnum`),
  ADD UNIQUE KEY `IDnum_17` (`IDnum`),
  ADD UNIQUE KEY `IDnum_18` (`IDnum`),
  ADD UNIQUE KEY `IDnum_19` (`IDnum`),
  ADD UNIQUE KEY `IDnum_20` (`IDnum`),
  ADD UNIQUE KEY `IDnum_21` (`IDnum`),
  ADD UNIQUE KEY `IDnum_22` (`IDnum`),
  ADD UNIQUE KEY `IDnum_23` (`IDnum`),
  ADD UNIQUE KEY `IDnum_24` (`IDnum`),
  ADD UNIQUE KEY `IDnum_25` (`IDnum`),
  ADD UNIQUE KEY `IDnum_26` (`IDnum`),
  ADD UNIQUE KEY `IDnum_27` (`IDnum`),
  ADD UNIQUE KEY `IDnum_28` (`IDnum`),
  ADD UNIQUE KEY `IDnum_29` (`IDnum`),
  ADD UNIQUE KEY `IDnum_30` (`IDnum`),
  ADD UNIQUE KEY `IDnum_31` (`IDnum`),
  ADD UNIQUE KEY `IDnum_32` (`IDnum`),
  ADD UNIQUE KEY `IDnum_33` (`IDnum`),
  ADD UNIQUE KEY `IDnum_34` (`IDnum`),
  ADD UNIQUE KEY `IDnum_35` (`IDnum`),
  ADD UNIQUE KEY `IDnum_36` (`IDnum`),
  ADD UNIQUE KEY `IDnum_37` (`IDnum`),
  ADD UNIQUE KEY `IDnum_38` (`IDnum`),
  ADD UNIQUE KEY `IDnum_39` (`IDnum`),
  ADD UNIQUE KEY `IDnum_40` (`IDnum`),
  ADD UNIQUE KEY `IDnum_41` (`IDnum`),
  ADD UNIQUE KEY `IDnum_42` (`IDnum`),
  ADD UNIQUE KEY `IDnum_43` (`IDnum`),
  ADD UNIQUE KEY `IDnum_44` (`IDnum`),
  ADD UNIQUE KEY `IDnum_45` (`IDnum`),
  ADD UNIQUE KEY `IDnum_46` (`IDnum`),
  ADD UNIQUE KEY `IDnum_47` (`IDnum`),
  ADD UNIQUE KEY `IDnum_48` (`IDnum`),
  ADD UNIQUE KEY `IDnum_49` (`IDnum`),
  ADD UNIQUE KEY `IDnum_50` (`IDnum`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `shopping_cart_items`
--
ALTER TABLE `shopping_cart_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `temp`
--
ALTER TABLE `temp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_119` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_120` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `shopping_cart_items`
--
ALTER TABLE `shopping_cart_items`
  ADD CONSTRAINT `shopping_cart_items_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
