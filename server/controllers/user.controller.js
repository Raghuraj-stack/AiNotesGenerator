import UserModel from "../models/user.model.js"

export const getCurrentUser = async(req , res)=>{
    try {
        const userId = req.userId
        let user = await UserModel.findById(userId)
        if(!user)
        {
            return res.status(400).json({message:`Current User not found ${error}`})
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({message:`getCurrentUser error ${error}`})
    }
}
