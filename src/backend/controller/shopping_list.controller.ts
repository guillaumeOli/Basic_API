import { MySql2Database } from "drizzle-orm/mysql2";
import { FastifyReply, FastifyRequest } from "fastify";
import { createShoppingList } from "../services/shopping_list.service";

export async function registerShoppingListHandler(request: FastifyRequest, reply: FastifyReply) {
    const body = request.body
    try {
        const shopping_list = await createShoppingList(body)
        return reply.code(200).send(shopping_list)
    }catch(e){
        return reply.code(500).send(e)
    }
}