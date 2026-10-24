import "dotenv/config";
import express from "express"
import dotenv from "dotenv"
import connectDb from "./utils/db.js"
import authRouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/user.route.js"
import notesRouter from "./routes/generate.route.js"
import pdfRouter from "./routes/pdf.route.js"
import creditRouter from "./routes/credit.route.js"
import { stripeWebhook } from "./controllers/credits.controller.js";
dotenv.config()
const app = express()

app.use(cors(
   { origin:"http://localhost:5173",
    credentials:true ,
    methods:["GET" , "POST" , "PUT" , "DELETE" ,"OPTIONS"]
   }

))


app.post(
  "/api/payment/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);


app.use(express.json())
app.use(cookieParser())
const port = process.env.PORT || 5000
app.use("/api/auth" , authRouter)
app.use("/api/user" , userRouter)
app.use("/api/notes" , notesRouter)
app.use("/api/pdf" , pdfRouter)
app.use("/api/credit" , creditRouter)

app.listen( port , ()=>{
    console.log("Server Started..")
    connectDb()
})