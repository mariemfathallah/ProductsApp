import User from './Models/User.js'
import bcryptjs from "bcryptjs"
import {connectDB} from './ConfigurationDB/Mongoose.js'
import {confirmCompteAdmin} from "./middlewares/nodemailer.js"
import data from './admin.json'  assert  {type: "json"}

connectDB()

const charactersPass = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let generatePassword = '';
    for (let i= 0; i < 6; i++) {
        generatePassword += charactersPass.charAt(Math.floor(Math.random() * charactersPass.length))
    }
const plainPassword = generatePassword;
const query = User.findOne({"role ": "admin"})
query.select('role')
query.exec((err,res ,next)=>{
    if(err){
        res.status(500).json({err})
    }
    else{
        if(res){
            console.log('admin est déjà exist')
            return process.exit()
        }else{
            bcryptjs.hash(plainPassword,10).then(
                (hashPassword)=>{
                    const user = new User({...data ,passw: hashPassword})
                    user.save()
                    confirmCompteAdmin(user.email, plainPassword)
                    console.log("admin est creér ")
                    console.log(plainPassword)
                }
            )
            .catch((err)=>console.log(err))
        }
    }
})