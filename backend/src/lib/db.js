import mongoose from "mongoose"

export const connectDB = async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGODB_URI_ETHICAL_SIM)
        console.log(`MongoDB connected:${conn.connection.host}`)
    } catch (error) {
        
    }
}