ALTER TABLE `items` MODIFY COLUMN `create_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `items` MODIFY COLUMN `updated_at` timestamp DEFAULT (now());