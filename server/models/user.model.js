import mongoose, { Mongoose } from "mongoose";

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    credit:{
        type:Number,
        default:500,
        min:0
    },
    isCreditAvailable:{
        type:Boolean,
        default:true
    },
    notes:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Notes",
        default:[]
    }

},{timestamps:true})

const UserModel = mongoose.model("User" , userSchema)
export default UserModel