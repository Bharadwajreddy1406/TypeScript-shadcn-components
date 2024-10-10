import mongoose, { Document, Schema } from "mongoose";

// Define the TypeScript interface for the User schema
interface IUser extends Document {
    username: string;
    password: string;
    // role?: string;
    loginTimestamps: Date[];
}

// Define the Mongoose schema based on the IUser interface
const UserSchema: Schema<IUser> = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    // role: {
    //     type: String,
    //     default: 'user',
    // },
    loginTimestamps: {
        type: [Date],
        default: [],
    }
}, { timestamps: true });

// Create and export the User model
const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;
