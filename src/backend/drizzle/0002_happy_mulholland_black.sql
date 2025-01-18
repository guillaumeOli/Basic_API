CREATE TABLE `shoppingList` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`create_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `shoppingList_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `shoppingList_to_products` (
	`shoppingList_id` int NOT NULL,
	`product_name` varchar(255) NOT NULL,
	CONSTRAINT `shoppingList_to_products_shoppingList_id_product_name_pk` PRIMARY KEY(`shoppingList_id`,`product_name`)
);
--> statement-breakpoint
ALTER TABLE `shoppingList_to_products` ADD CONSTRAINT `shoppingList_to_products_shoppingList_id_shoppingList_id_fk` FOREIGN KEY (`shoppingList_id`) REFERENCES `shoppingList`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `shoppingList_to_products` ADD CONSTRAINT `shoppingList_to_products_product_name_product_name_fk` FOREIGN KEY (`product_name`) REFERENCES `product`(`name`) ON DELETE no action ON UPDATE no action;