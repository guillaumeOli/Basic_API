import { db } from '../server';
import { productInsertSchema } from '../db/schemas/products.schemas';
import { products } from '../db/schemas/products.schemas';
import { eq } from 'drizzle-orm';

export async function createProduct(body: any) {
    try {
        const parsedBody: any = productInsertSchema.parse(body);
        const product = await db.insert(products).values({
          name: parsedBody.name,
          price: parsedBody.price,
          description: parsedBody.description
        })
        return product
    }catch(e) {
        return e;
    }
}

export async function getProducts() {
  try {
      const product = await db.select().from(products)
      return product
  }catch(e) {
      return;
  }
}

export async function getProduct(specifier: string) {
  try {
      const product = await db.select().from(products).where(eq(products.name, specifier))
      return product
  }catch(e) {
      return;
  }
}

export async function modifyProduct(specifier: string) {
  try {
    const parsedBody: any = productInsertSchema.parse(specifier);
    const product = await db.update(products).set({
      name: parsedBody.name,
      price: parsedBody.price,
      description: parsedBody.description
    })
    return product
}catch(e) {
    return;
}
}

export async function deleteProduct(specifier: string) {
  try {
      const product = await db.delete(products).where(eq(products.name, specifier))
      return true
  }catch(e) {
      return false
  }
}