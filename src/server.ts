import express, { NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import productsRoutes from './handlers/products'
import userRoutes from './handlers/users'
import ordersRoutes from './handlers/orders'
export const app: express.Application = express()
const address: string = "0.0.0.0:3000"
const corsOption ={
    origin:"",
    optionsSuccessStatus :200
}
app.use(cors(corsOption))
app.use(bodyParser.json())


app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})
app.get("/test-cors",cors(),function(_req:Request,res:Response){
    res.json({msg:"This is CORS-enabled with a middle ware"})
})


productsRoutes(app)
userRoutes(app)
ordersRoutes(app)


app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
