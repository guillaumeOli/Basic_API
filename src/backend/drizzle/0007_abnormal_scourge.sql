ALTER TABLE `items` MODIFY COLUMN `updated_at` timestamp NOT NULL DEFAULT (now());