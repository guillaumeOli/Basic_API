import { relations, sql } from 'drizzle-orm'
import * as mysql from "drizzle-orm/mysql-core";
import { mysqlTable as table } from "drizzle-orm/mysql-core";
import { createInsertSchema} from 'drizzle-zod';
import { z } from 'zod';

import { products, productRelations} from './products.schemas';
import { shoppingLists, shoppingListRelations } from './shopping_lists.schemas';

export const items = table("items", {
    type: mysql.varchar("type", {length: 255}).notNull().primaryKey().references(() => products.name),
    shoppingListId: mysql.int("shopping_list_id").notNull().references(() => shoppingLists.id),
    quantity: mysql.int("quantity").notNull(),
    createdAt: mysql.timestamp("create_at", {mode: "string"}).defaultNow(),
    updatedAt: mysql.timestamp("updated_at", {mode: "date"}).notNull().defaultNow(),
})

export const itemRelation = relations(items, ({one}) => ({
    product: one(products, {
        fields: [items.type],
        references: [products.name],
        relationName: "product"
    }),
    shoppingList: one(shoppingLists, {
        fields: [items.shoppingListId],
        references: [shoppingLists.id],
        relationName: "shoppingList"
    })
}))

export const itemInsertSchemas = createInsertSchema(items, {
    quantity: (schema) => schema.min(0)
})