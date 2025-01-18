DROP TABLE `shoppingList_to_products`;--> statement-breakpoint
RENAME TABLE `itemList` TO `items`;--> statement-breakpoint
RENAME TABLE `product` TO `products`;--> statement-breakpoint
RENAME TABLE `shoppingList` TO `shopping_lists`;--> statement-breakpoint
ALTER TABLE `items` RENAME COLUMN `name` TO `type`;--> statement-breakpoint
ALTER TABLE `items` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `products` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `shopping_lists` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `items` ADD PRIMARY KEY(`type`);--> statement-breakpoint
ALTER TABLE `products` ADD PRIMARY KEY(`name`);--> statement-breakpoint
ALTER TABLE `shopping_lists` ADD PRIMARY KEY(`id`);--> statement-breakpoint
ALTER TABLE `items` ADD `shopping_list_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `items` ADD CONSTRAINT `items_type_products_name_fk` FOREIGN KEY (`type`) REFERENCES `products`(`name`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `items` ADD CONSTRAINT `items_shopping_list_id_shopping_lists_id_fk` FOREIGN KEY (`shopping_list_id`) REFERENCES `shopping_lists`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `items` DROP COLUMN `price`;