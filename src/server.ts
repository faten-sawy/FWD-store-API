import express, { NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import productsRoutes from './handlers/products'
export const app: express.Application = express()
const address: string = "0.0.0.0:3000"
const corsOption ={
    origin:"",
    optionsSuccessStatus :200
}
app.use(cors(corsOption))
app.use(bodyParser.json())

/* db.connect().then((client)=>{
    return client.query("SELECT NOW()").then(res=>{
        client.release();
        console.log(res.rows)
    }).catch(err=>{
        client.release()
        console.log(err.stack)
    })
}) */
app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})
app.get("/test-cors",cors(),function(_req:Request,res:Response){
    res.json({msg:"This is CORS-enabled with a middle ware"})
})

/* app.get("/products",(req:Request,res:Response)=>{
    res.send("Index")
}) */
productsRoutes(app)
/* app.get("/product/:id",(req:Request,res:Response)=>{
    res.send("Show")
}) */

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
