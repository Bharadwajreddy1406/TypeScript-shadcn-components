import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();



export const connectDB = async () => {

    try{
        const connection = await mongoose.connect(process.env.MONGO_URL);
        if(connection) console.log("connected to db");
    }catch(error){
        console.log(error);
        throw new Error("failed to connect to db");
    }
}


export const disconnectDB = async () => {
    try{
        await mongoose.disconnect();
    }catch(error){  
        console.log(error); 
    }
}