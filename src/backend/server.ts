import Fastify from "fastify";
import fastifymysql from "@fastify/mysql"
import {drizzle} from "drizzle-orm/mysql2"
import * as dotenv from "dotenv"

import itemRoute from "./routes/item.route";
import shoppingListRoute from "./routes/shopping_list.route";
import productRoute from "./routes/product.route";
import { products } from "./db/schemas/products.schemas";


dotenv.config()
export const db = drizzle(process.env.DATABASE_URL)


function init_server() {
    
    const server = Fastify({
      })     
    server.get('/healthcheck', async () => {
      return {status: "OK"}
    })

    server.register(fastifymysql, {
        connectionString: `${process.env.DATABASE_URL}`
    })
    server.register(shoppingListRoute, {prefix: 'api/shopping_list'})
    server.register(productRoute, {prefix: 'api/product'})
    server.register(itemRoute, {prefix: 'api/item'})

    return server
}

export default init_server