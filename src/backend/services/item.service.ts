import { db } from '../server';
import { items } from '../db/schemas/items.schemas';
import { eq, and } from 'drizzle-orm';
import { itemInsertSchemas} from '../db/schemas/items.schemas';
import * as mysql from "drizzle-orm/mysql-core";
import { date } from 'drizzle-orm/mysql-core';

export async function createItem(body: any) {
    try {
        const parsedBody: any = itemInsertSchemas.parse(body);
        const item = await db.insert(items).values({
          type: parsedBody.type,
          shoppingListId: parsedBody.shoppingListId,
          quantity: parsedBody.quantity,
        })
        return item
    }catch(e) {
        return e;
    }
}

export async function addQuantityItem(body: any) {
    try {
        const parsedBody: any = itemInsertSchemas.parse(body);
        const item = await db.update(items).set({
          quantity: parsedBody.quantity,
        }).where(and(eq(items.shoppingListId, parsedBody.shoppingListId), eq(items.type, parsedBody.type)))
        return item
    }catch(e) {
        return e;
    }
}

export async function getShoppingListItems(shopping_list_id: number) {
    try {
        const item = await db.select().from(items).where(eq(items.shoppingListId, shopping_list_id))
        return item
    }catch(e) {
        return e;
    }
  }
  

export async function getAllItems() {
  try {
      const item = await db.select().from(items)
      return item
  }catch(e) {
      return e;
  }
}

export async function deleteItems(body: any) {
  try {
    const parsedBody: any = itemInsertSchemas.parse(body);
    const item = await db.delete(items).where(and(eq(items.type, parsedBody.type),eq(items.shoppingListId, parsedBody.shoppingListId)))
        return item
    }catch(e) {
        return e;
    }
}