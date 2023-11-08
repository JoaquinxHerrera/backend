import express from "express";
import fs from 'fs/promises'
import { ProductManager } from "./productManager.js";

const pm = new ProductManager('./db/products.json')


const app = express()

app.get('/products', async(req,res) =>{
    const {limit} = req.query
    res.json(await pm.getProducts({limit}))
    
})

app.get('/products/:id', async(req,res) =>{
    const id = Number(req.params.id)
    try{
        const buscado = await pm.getProductById(id)
        res.json(buscado)
    } catch(error){
        res.status(404).json({
            message: error.message
        })
    } 
})




app.listen(8080)