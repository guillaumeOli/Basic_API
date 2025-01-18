import { db } from '../server';
import { shoppingListInsertSchema } from '../db/schemas/shopping_lists.schemas';
import { shoppingLists } from '../db/schemas/shopping_lists.schemas';
import { eq } from 'drizzle-orm';

export async function createShoppingList(body: any) {
    try {
        const parsedBody: any = shoppingListInsertSchema.parse(body);
        const shoppingList = await db.insert(shoppingLists).values({
          name: parsedBody.name,
        })
        return shoppingList
    }catch(e) {
        return;
    }
}
