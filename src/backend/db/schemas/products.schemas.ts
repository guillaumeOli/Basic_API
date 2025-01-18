import { relations } from 'drizzle-orm'
import * as mysql from "drizzle-orm/mysql-core";
import { mysqlTable as table } from "drizzle-orm/mysql-core";
import { createInsertSchema } from 'drizzle-zod';
import { type } from 'os';

import { items } from './items.schemas';

export const products = table("products", {
    name: mysql.varchar("name", {length: 255}).notNull().primaryKey(),
    description: mysql.varchar("description", {length: 255}).notNull(),
    price: mysql.float("price").notNull(),
    createdAt: mysql.timestamp("create_at", {mode: "string"}).notNull().defaultNow(),
    updatedAt: mysql.timestamp("updated_at", {mode: "string"}).notNull().defaultNow(),
})

export const productRelations = relations(products, ({many}) => ({
    items: many(items, {
        relationName: "product"
    })
}))

export const productInsertSchema = createInsertSchema(products)
