import UserModel from "../models/user.model.js"
import generateToken from "../utils/token.js"

export const googleAuth = async (req , res)=>{
    try {
        const {email , name } = req.body

        let user = await UserModel.findOne({email})
        if(!user)
        {
            user = await UserModel.create({
                name , email 
            })
        }

        let token = await generateToken(user._id)
        res.cookie("token" , token , {
            httpOnly:true ,
            secure:true,
            sameSite:"none",
            maxAge:7*24*60*60*1000
        })

        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({message:"googleAuth error"})
    }
}


export const logOut = async(req , res)=>{
    try {
        await res.clearCookie("token")
        return res.status(200).json({message:'Logout Successfull'})
    } catch (error) {
        return res.status(500).json({message:`LogOut error ${error}`})
    }
}

