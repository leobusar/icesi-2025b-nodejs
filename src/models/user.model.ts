import mongoose from "mongoose";
import { UserInput } from "../interfaces";

export interface UserDocument extends UserInput, mongoose.Document{
    createdAt: Date, 
    updatedAt: Date, 
    deletedAt: Date
}

const userSchema = new mongoose.Schema({
    name: {type: String, required: true}, 
    email: {type: String, required: true, unique: true, index: true}, 
    password: {type: String, required: true, select: false}
}, {timestamps: true, collection: 'users'})

export const UserModel = mongoose.model<UserDocument>("User", userSchema); 