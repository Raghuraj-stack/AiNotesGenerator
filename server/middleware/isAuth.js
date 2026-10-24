import jwt from "jsonwebtoken"

export const isAuth = async (req ,res , next) =>{
    try {
        let {token} = req.cookies
        if(!token)
        {
            return res.status(400).json({message:`Token is not Found`})
        }
        let verifyToken = jwt.verify(token , process.env.JWT_SECRET)
        if(!verifyToken)
        {
            return res.status(400).json({message:`user does not have verified Token`})
        }

        req.userId = verifyToken.userId

        next()
    } catch (error) {
        return res.status(500).json({message:`isAuth error ${error}`})
    }
}


export default isAuth
