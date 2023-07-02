import jwt from "jsonwebtoken"
import {config} from "dotenv"
config()   


export const authentifier = (req, res, next) =>{
    try{
        const token = req.headers.authorization.split('')[1]; 
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN); 
        const userId = decodedToken.userId; 
        if(req.body.userId && req.body.userId !== userId) throw new Error ('Identifiant invalide')
        else next();
    }
    catch{
res.status(401).json({error :('Requête invalide!')})
    }
}