import mongoose from "mongoose";



const userData = new mongoose.Schema({
    logins: [String],
});


export default userData;