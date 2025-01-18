CREATE TABLE `itemList` (
	`name` varchar(255) NOT NULL,
	`price` int NOT NULL,
	`create_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `itemList_name` PRIMARY KEY(`name`)
);
