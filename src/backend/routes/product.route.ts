import { MySql2Database } from "drizzle-orm/mysql2";
import { FastifyInstance } from "fastify";
import {getProductsHandler, getProductHandler, registerProductHandler, modifyProductHandler, deleteProductHandler} from '../controller/product.controller'

async function productRoute(server: FastifyInstance) {
    server.post('/', async (request, reply) => {
        try {
        const result = await registerProductHandler(request, reply)
        return result
        }catch(e) {
            request.log.error(e);
            return reply.send(500);
        }
    })
    server.get('/', async (request, reply) => {
        try {
        const result = await getProductsHandler(request, reply)
        return result
        }catch(e) {
            request.log.error(e);
            return reply.send(500);
        }
    })
    server.get('/:name', async (request, reply) => {
        try {
        const result = await getProductHandler(request, reply)
        return result
        }catch(e) {
            request.log.error(e);
            return reply.send(500);
        }
    })
    server.patch('/:name', async (request, reply) => {
        try {
        const result = await modifyProductHandler(request, reply)
        return result
        }catch(e) {
            request.log.error(e);
            return reply.send(500);
        }
    })
    server.delete('/:name', async (request, reply) => {
        try {
        const result = await deleteProductHandler(request, reply)
        return result
        }catch(e) {
            request.log.error(e);
            return reply.send(500);
        }
    })

}

export default productRoute