import { db } from "../server";
import { items } from "../db/schemas/items.schemas";
import { itemInsertSchemas } from "../db/schemas/items.schemas";
import { eq, and} from "drizzle-orm";
import { FastifyReply, FastifyRequest } from "fastify";
import { createItem, getAllItems, getShoppingListItems, deleteItems, addQuantityItem } from "../services/item.service";

export async function registerItemHandler(request: FastifyRequest, reply: FastifyReply) {
    
    const body = request.body
    try {
        const parsedBody: any = itemInsertSchemas.parse(body);
        const exisiting_items = await db.select().from(items).where(and(eq(items.type , parsedBody.type), eq(items.shoppingListId, parsedBody.shoppingListId)))
        if (exisiting_items.length == 0) {
            const item = await createItem(body)
            return reply.code(200).send(item)
        } else {
            const item = await addQuantityItem(body)
            return reply.code(200).send(item)
        }
    }catch(e){
        return reply.code(500).send(e)
    }
}

export async function getItemsHandler(request: FastifyRequest, reply: FastifyReply) {
        try {
        const item = await getAllItems()
        return reply.code(200).send(item)
    }catch(e){
        return reply.code(500).send(e)
    }
}

export async function getShoppingListItemsHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
    const id = request.params["shopping_list_id"]
    const item = await getShoppingListItems(id)
    return reply.code(200).send(item)
}catch(e){
    return reply.code(500).send(e)
}
}


export async function deleteItemHandler(request: FastifyRequest, reply: FastifyReply) {
    
    try {
        const item = await deleteItems({shoppingListId: request.params["shopping_list_id"], type: request.params["type"]})
        return reply.code(200).send(item)
    }catch(e){
        return reply.code(500).send(e)
    }
}
