import { FastifyInstance } from "fastify";
import { registerItemHandler, getItemsHandler, deleteItemHandler } from "../controller/items.controller";


async function itemRoute(server: FastifyInstance) {
    server.post('/', async (request, reply) => {
        try {
        const result = await registerItemHandler(request, reply)
        return result
        }catch(e) {
            request.log.error(e);
            return reply.send(500);
        }
    }),
    server.get('/items', async (request, reply) => {
        try {
        const result = await getItemsHandler(request, reply)
        return result
        }catch(e) {
            request.log.error(e);
            return reply.send(500);
        }
    }),
    server.delete('/:name', async (request, reply) => {
        try {
        const result = await deleteItemHandler(request, reply)
        return result
        }catch(e) {
            request.log.error(e);
            return reply.send(500);
        }
    })
}


export default itemRoute