CREATE SCHEMA `webshop`;

CREATE TABLE `webshop`.`user` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(35) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `gender` tinyint NOT NULL COMMENT '0-1-2',
  `phone` varchar(20),
  `country` varchar(55) COMMENT 'Ország',
  `country_1` varchar(100) COMMENT 'Megye',
  `city` varchar(100),
  `post_code` smallint COMMENT 'Legnagyobb Mo. ir.szám: 9985',
  `street` varchar(150),
  `house_number` varchar(15) COMMENT 'vchar, mert  1/B pl.',
  `post_other` varchar(100) COMMENT 'emelet / ajtó, egyéb',
  `mail_confirmed` bool NOT NULL,
  CHECK (gender BETWEEN 0 and 3)
);

CREATE TABLE `webshop`.`product` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(55) NOT NULL,
  `description` varchar(255),
  `price` int NOT NULL,
  `sale_price` int,
  `stock` int NOT NULL DEFAULT 0,
  `visible` bool NOT NULL DEFAULT true,
  CHECK (`price` < 0)
);

CREATE TABLE `webshop`.`product_images` (
  `product_id` int NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `priority` tinyint NOT NULL DEFAULT 0,
  PRIMARY KEY (`product_id`, `image_url`)
);

CREATE TABLE `webshop`.`categories` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `category` varchar(55) NOT NULL,
  `description` varchar(255),
  `priority` tinyint NOT NULL DEFAULT 0
);

CREATE TABLE `webshop`.`product_category` (
  `product_id` int NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`product_id`, `category_id`)
);

CREATE TABLE `webshop`.`keywords` (
  `product_id` int NOT NULL,
  `keyword` varchar(55) NOT NULL,
  PRIMARY KEY (`product_id`, `keyword`)
);

CREATE TABLE `webshop`.`variations` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(150) NOT NULL
);

CREATE TABLE `webshop`.`product_variations` (
  `variation_id` int NOT NULL,
  `product_id` int NOT NULL,
  `small_desc` varchar(35),
  PRIMARY KEY (`variation_id`, `product_id`)
);

CREATE TABLE `webshop`.`orders` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `order_date` datetime NOT NULL COMMENT 'default: NOW()',
  `order_state` tinyint NOT NULL COMMENT 'programban kezelt enum alapján',
  `payment_method` tinyint NOT NULL COMMENT 'programban kezelt enum alapján',
  `payment_state` tinyint NOT NULL COMMENT 'programban kezelt enum alapján',
  `phone` varchar(20) NOT NULL,
  `country` varchar(55) NOT NULL COMMENT 'Ország',
  `country_1` varchar(100) NOT NULL COMMENT 'Megye',
  `city` varchar(100) NOT NULL,
  `post_code` smallint COMMENT 'Legnagyobb Mo. ir.szám: 9985',
  `street` varchar(150) NOT NULL,
  `house_number` varchar(15) NOT NULL COMMENT 'vchar, mert  1/B pl.',
  `post_other` varchar(100) NOT NULL COMMENT 'emelet / ajtó, egyéb'
);

CREATE TABLE `webshop`.`order_products` (
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `count` int NOT NULL DEFAULT 1,
  `price` int NOT NULL,
  `sale_price` int NOT NULL,
  PRIMARY KEY (`order_id`, `product_id`),
  CHECK(`count` < 0)
);

CREATE TABLE `webshop`.`basket` (
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `count` int NOT NULL DEFAULT 1,
  `expire` datetime,
  PRIMARY KEY (`user_id`, `product_id`),
  CHECK(`count` < 0)
);

CREATE TABLE `webshop`.`tokens` (
  `token` varchar(255) PRIMARY KEY NOT NULL,
  `type` tinyint NOT NULL COMMENT 'programban kezelt enum alapján',
  `value` int NOT NULL DEFAULT 1,
  `remaining` int NOT NULL DEFAULT -1,
  `expire` datetime,
  `description` varchar(255)
);

ALTER TABLE `webshop`.`product_images` ADD FOREIGN KEY (`product_id`) REFERENCES `webshop`.`product` (`id`);

ALTER TABLE `webshop`.`product_category` ADD FOREIGN KEY (`product_id`) REFERENCES `webshop`.`product` (`id`);

ALTER TABLE `webshop`.`product_category` ADD FOREIGN KEY (`category_id`) REFERENCES `webshop`.`categories` (`id`);

ALTER TABLE `webshop`.`keywords` ADD FOREIGN KEY (`product_id`) REFERENCES `webshop`.`product` (`id`);

ALTER TABLE `webshop`.`product_variations` ADD FOREIGN KEY (`variation_id`) REFERENCES `webshop`.`variations` (`id`);

ALTER TABLE `webshop`.`product_variations` ADD FOREIGN KEY (`product_id`) REFERENCES `webshop`.`product` (`id`);

ALTER TABLE `webshop`.`orders` ADD FOREIGN KEY (`user_id`) REFERENCES `webshop`.`user` (`id`);

ALTER TABLE `webshop`.`order_products` ADD FOREIGN KEY (`order_id`) REFERENCES `webshop`.`orders` (`id`);

ALTER TABLE `webshop`.`order_products` ADD FOREIGN KEY (`product_id`) REFERENCES `webshop`.`product` (`id`);

ALTER TABLE `webshop`.`basket` ADD FOREIGN KEY (`user_id`) REFERENCES `webshop`.`user` (`id`);

ALTER TABLE `webshop`.`basket` ADD FOREIGN KEY (`product_id`) REFERENCES `webshop`.`product` (`id`);
