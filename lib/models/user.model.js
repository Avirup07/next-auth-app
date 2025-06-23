import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkId: {
        type: string,
        required: true,
        unique: true,
    },
    email: {
        type: string,
        required: true,
    },
    firstName: {
        type: string,
        required: true,
    },
    lastName: {
        type: string,
        required: true,
    },
    username: {
        type: string,
        required: true
    },
    avatar: {
        type: string,
        required: true
    },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;