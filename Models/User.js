import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator"
import { config } from "dotenv";
config()


const  UserSchema = new mongoose.Schema({
nom:{
    type:String,
    required:true
},

telephone:{
    type:String,
    required:true
},
adresse:{
    type:String,
    required:true
},
email:{
    type:String, 
    required:true,
    unique:true
},
passw:{
    type:String,
    required:true
},
role:{
    type:String,
    enum:["admin","user"],
    default:"user",
    required: true
}

}, {
    timestamps: { currentTime: () => Date.now() },versionKey: false })


UserSchema.plugin(uniqueValidator)

let User = mongoose.model('user',UserSchema);

export default User;