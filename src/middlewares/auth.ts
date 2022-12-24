import { Response,Request,NextFunction } from "express";
import jwt from "jsonwebtoken"
export const authMiddleware = (
    req:Request,
    res:Response,
    next:NextFunction
):void =>{
    const authHeader = req.get("Authorization")
    if(authHeader){
        const barrier = authHeader.split(" ")[0].toLowerCase()
        const token = authHeader.split(" ")[1]

        if(token && barrier === 'bearer'){
           const decodeString = jwt.verify(token,'secret')
           console.log(decodeString)

           if(decodeString) next()
            
        }
        else{
            res.json("Error")
        }
        
    }
}