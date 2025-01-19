import { FastifyInstance } from "fastify";
import { deleteItemHandler, registerItemHandler, getShoppingListItemsHandler } from "../controller/items.controller";
import { registerShoppingListHandler } from "../controller/shopping_list.controller";

async function shoppingListRoute(server: FastifyInstance) {
    server.post('/', async (request, reply) => {
        try {
        const result = await registerShoppingListHandler(request, reply)
        return result
        }catch(e) {
            request.log.error(e);
            return reply.send(500);
        }
    })
    server.post('/:shopping_list_id/item', async (request, reply) => {
       
        try {
        const result = await registerItemHandler(request, reply)
        return result
        }catch(e) {
            request.log.error(e);
            return reply.send(500);
        }
    })
    server.get('/:shopping_list_id/item', async (request, reply) => {
       
        try {
        const result = await getShoppingListItemsHandler(request, reply)
        return result
        }catch(e) {
            request.log.error(e);
            return reply.send(500);
        }
    })
    server.delete('/:shopping_list_id/item/:type', async (request, reply) => {
        console.log("Parameters", request.body)
        try {
        const result = await deleteItemHandler(request, reply)
        return result
        }catch(e) {
            request.log.error(e);
            return reply.send(500);
        }
    })


}

export default shoppingListRoute