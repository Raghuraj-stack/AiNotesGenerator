import express from "express"
import isAuth from "../middleware/isAuth.js"
import { createCreditOrder } from "../controllers/credits.controller.js"

const creditRouter = express.Router()

creditRouter.post("/order" , isAuth , createCreditOrder )


export default creditRouter