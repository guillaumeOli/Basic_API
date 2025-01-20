CREATE TABLE `items` (
        `type` varchar(255) NOT NULL,
        `shopping_list_id` int NOT NULL,
        `quantity` int NOT NULL,
        `create_at` timestamp DEFAULT (now()),
        `updated_at` timestamp NOT NULL DEFAULT (now()),
        CONSTRAINT `items_type` PRIMARY KEY(`type`)
);

CREATE TABLE `products` (
        `name` varchar(255) NOT NULL,
        `description` varchar(255) NOT NULL,
        `price` float NOT NULL,
        `create_at` timestamp NOT NULL DEFAULT (now()),
        `updated_at` timestamp NOT NULL DEFAULT (now()),
        CONSTRAINT `products_name` PRIMARY KEY(`name`)
);

CREATE TABLE `shopping_lists` (
        `id` int AUTO_INCREMENT NOT NULL,
        `name` varchar(255) NOT NULL,
        `create_at` timestamp NOT NULL DEFAULT (now()),
        `updated_at` timestamp NOT NULL DEFAULT (now()),
        CONSTRAINT `shopping_lists_id` PRIMARY KEY(`id`)
);

ALTER TABLE `items` ADD CONSTRAINT `items_type_products_name_fk` FOREIGN KEY (`type`) REFERENCES `products`(`name`) ON DELETE no action ON UPDATE no action;
ALTER TABLE `items` ADD CONSTRAINT `items_shopping_list_id_shopping_lists_id_fk` FOREIGN KEY (`shopping_list_id`) REFERENCES `shopping_lists`(`id`) ON DELETE no action ON UPDATE no action;