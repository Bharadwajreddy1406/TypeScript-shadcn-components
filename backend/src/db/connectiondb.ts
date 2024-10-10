import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();



export const connectDB = async () => {

    try{
        const connection = await mongoose.connect("mongodb+srv://bharadwajreddy1463:reddy1406@cluster0.3w1xb.mongodb.net/sksageauth");
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