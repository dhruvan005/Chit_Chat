import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userModel = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profilePhoto: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender : {
        type : String ,
        enum : ["male" , "female"],
        required : true
    }
} ,{timestamps : true , collection: 'users'})

userModel.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userModel.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}


export const User = mongoose.model("User" , userModel)