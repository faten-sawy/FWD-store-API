import express,{Request,Response}  from "express";
import { Products,Product } from "../models/products";

const store = new Products

const index = async (req:Request,res:Response)=>{
    const productsResult = await store.index()
    res.json(productsResult)
}
const show = async (req:Request,res:Response) => {
    const { id } = req.body
    const productResult = await store.show(id)
    res.json(productResult)
}
const create = async (req:Request,res:Response) => {
    const {name,price} = req.body
    const product:Product = {
        name,
        price
    }
    const newProduct = await store.create(product)
    res.json(newProduct)
}

const productsRoutes = (app:express.Application) =>{
    app.get("/products",index)
    app.get("/products/:id",show)
    app.post("/product",create)
}

export default productsRoutes