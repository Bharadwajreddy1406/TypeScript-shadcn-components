import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
    rollnumber: string;
    password: string;
    role: string;
    // loginTimestamps: Date[];
}


const UserSchema: Schema<IUser> = new mongoose.Schema({
    rollnumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'student',
    },
//     loginTimestamps: {
//         type: [Date],
//         default: [],
//     }
// }, { timestamps: true }

});

// Create and export the User model
const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;