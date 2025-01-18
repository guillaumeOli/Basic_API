import { FastifyReply, FastifyRequest } from "fastify";
import { createProduct, deleteProduct, modifyProduct, getProducts, getProduct } from "../services/product.service";

export async function registerProductHandler(request: FastifyRequest, reply: FastifyReply) {
    const body = request.body
    try {
        const product = await createProduct(body)
        return reply.code(200).send(product)
    }catch(e){
        return reply.code(500).send(e)
    }
}

export async function getProductsHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
        const product = await getProducts()
        return reply.code(200).send(product)
    }catch(e){
        return reply.code(500).send(e)
    }
}

export async function getProductHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
        const product = await getProduct(request.params["name"])
        if (product.length == 0) 
            return reply.code(404).send("ressource not found")
        return reply.code(200).send(product)
    }catch(e){
        return reply.code(500).send(e)
    }
}

export async function modifyProductHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
        const product = await modifyProduct(request.params["name"])
        return reply.code(200).send(product)
    }catch(e){
        return reply.code(500).send(e)
    }
}

export async function deleteProductHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
        const product = await deleteProduct(request.params["name"])
        if (!product) 
            return reply.code(404).send("ressource not found")
        return reply.code(200).send("ressource deleted")
    }catch(e){
        return reply.code(500).send(e)
    }
}