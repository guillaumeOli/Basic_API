import { relations } from 'drizzle-orm'
import * as mysql from "drizzle-orm/mysql-core";
import { mysqlTable as table } from "drizzle-orm/mysql-core";
import { createInsertSchema } from 'drizzle-zod';
import {z} from "zod"

import { items } from './items.schemas';

export const shoppingLists = table("shopping_lists", {
    id: mysql.int("id").notNull().primaryKey().autoincrement(),
    name: mysql.varchar("name", {length: 255}).notNull(),
    createdAt: mysql.timestamp("create_at", {mode: "string"}).notNull().defaultNow(),
    updatedAt: mysql.timestamp("updated_at", {mode: "string"}).notNull().defaultNow(),
})
  
  export const shoppingListRelations = relations(shoppingLists, ({many}) => ({
    items: many(items, {
      relationName: "shoppingList"
    }) 
}))

export const shoppingListInsertSchema = createInsertSchema(shoppingLists)
