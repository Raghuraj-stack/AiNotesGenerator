import mongoose from "mongoose"

const connectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL)
        console.log("Db Connected..")
    } catch (error) {
        console.log("connectDb error")
    }
}


export default connectDb
