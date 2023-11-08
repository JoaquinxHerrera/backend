import fs from 'fs/promises'
import {Product} from './Product.js'

let id = 1
function generateId(){
    return id ++
}

export class ProductManager {
    #path
    constructor(path) {
        this.#path=path
    }

    
    async addProduct(dataProduct){
        const products = await this.getProducts()
        const originalProduct = products.find(p=> p.code === dataProduct.code)
        if(originalProduct) {throw new Error (`Product with code ${dataProduct.code} already exsists`)}
        dataProduct.id = generateId()
        
        const product = new Product(dataProduct)
        const productPOJO = product.toPOJO();
    
        products.push(productPOJO)
        await fs.writeFile(this.#path, JSON.stringify(products, null, 2))
        return product
        
    }   

    async getProducts({limit}){
        const products = JSON.parse(await fs.readFile(this.#path, 'utf-8'))
        if (limit){
            return products.slice(0, limit)
        } else {
            return products;
        }
    }

    async getProductById(id){
        const products = JSON.parse(await fs.readFile(this.#path, 'utf-8'))
        const pojo =  products.find(p => p.id === id)
        if (!pojo) {
            throw new Error(`Product with ID ${id} does not exist`);
        }
        return pojo;
    }


    async updateProduct (id, updatedFields){
        try{
            const products = await this.getProducts();
            const productIndex =  products.findIndex(p => p.id === id)
    
            if (productIndex === -1) {
                throw new Error(`Product with id ${id} not found`);
            }
    
            const existingProduct = products[productIndex];
    
            const updatedProduct = {
                ...existingProduct,
                ...updatedFields
            };
    
            products[productIndex] = updatedProduct;
    
            await fs.writeFile(this.#path, JSON.stringify(products, null, 2));
    
            return updatedProduct;
        } catch(error) {
            console.log('Error updating the product', error);
            throw error
        }
        
    };

    async deleteProduct(id){
        const products = await this.getProducts();
        const productIndex = products.findIndex(p => p.id === id);
        if (productIndex === -1) {
            throw new Error(`Product with id ${id} not found`);
        }

        products.splice(productIndex, 1);
        await fs.writeFile(this.#path, JSON.stringify(products, null, 2));
        return `Product with id ${id} deleted successfully`
    }

    async reset() {
        await fs.writeFile(this.#path, '[]')
    }
}

const pm = new ProductManager('./db/products.json')
await pm.reset()


// async function getProducts() {
//     const getAllProducts = await pm.getProducts();
//     console.log(getAllProducts);
// }

// async function getProductById (id){
//     const searchedProduct = await pm.getProductById(id)
//     console.log(searchedProduct)
// }

// async function updateProduct(id, updatedFields){
//     const updatedProduct = await pm.updateProduct(id, updatedFields)
//     console.log(updatedProduct)
// }

// async function deleteProduct(id){
//     const deletedProduct = await pm.deleteProduct(id)
//     console.log(deletedProduct)
// }

// const product = await pm.addProduct({
//     title: 'computadora',
//     description: 'computadora dell',
//     price: 11,
//     thumbnail: 'no img',
//     code: 11,
//     stock: 2,
// })

// const product1 = await pm.addProduct({
//     title: 'golf',
//     description: 'golf volkswagen',
//     price: 150,
//     thumbnail: 'no img',
//     code: 13,
//     stock: 30,
// })

// const product2 = await pm.addProduct({
//     title: 'Protein GoldStandard',
//     description: '3kg Protein',
//     price: 50,
//     thumbnail: 'no img',
//     code: 14,
//     stock: 25,
// })

// const product3 = await pm.addProduct({
//     title: 'Jordans classic',
//     description: 'Best OG sneakers',
//     price: 120,
//     thumbnail: 'no img',
//     code: 15,
//     stock: 21,
// })

// getProducts()
// getProductById(2)

// updateProduct(1,{price:244})
// updateProduct(2,{stock:244})