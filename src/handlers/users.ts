import express,{Response,Request} from "express"
import { Users,User } from "../models/users"
import  jwt  from "jsonwebtoken"
import { authMiddleware } from "../middlewares/auth"
const userStore = new Users

const index = async (req:Request,res:Response) =>{
    const users = await userStore.index()
    res.json(users)
}
const create = async (req:Request,res:Response) =>{
    const {firstName,lastName,password} = req.body
    const user:User ={
        firstName,lastName,password
    }
    const userResponse = await userStore.create(user)
    const token = jwt.sign({ userResponse }, "secret");
    res.json({token})
    /* console.log(res.json()) */
}

const show = async (req:Request,res:Response) =>{
    const {id} = req.params
    const user = await userStore.show(Number(id))
    res.json(user)
}

/* const login = async (req:Request,res:Response) =>{
const {firstName,lastName,password} =  req.body
const user:User ={
    firstName,
    lastName,
    password
}
const result = await userStore.login(user)
const token = jwt.sign({result},'secret')
res.json({...result,token})
} */


const userRoutes = (app:express.Application) => {
    app.get('/users',authMiddleware,index)
    app.post('/user',create)
    app.get("/user/:id",authMiddleware,show)
  /*   app.post('/login',login) */
    
}

export default userRoutes