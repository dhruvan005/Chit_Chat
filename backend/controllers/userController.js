import { User } from "../models/userModel.js"
import { ApiError } from "../utils/ApiError.js"

export const register = async (req, res) => {
    try {
        const { fullName, username, email, password, conformPassword, gender } = req.body;
        console.log(req.body);
        if (!fullName || !email || !username || !password || !conformPassword || !gender) {
            throw new ApiError(500, "Some field Is messing");
        }
        if (password !== conformPassword) {
            throw new ApiError(500, "password did't match")
        }
        const existedUser = await User.findOne({
            $or: [{ username }, { email }] // check any one if found it will throw error
        })

        if (existedUser) {
            throw new ApiError(409, "User with email or username already exists")
        }

        // password hashing is done before user creation

        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = await User.create({
            fullName,
            username,
            email,
            gender,
            password,
            profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto 

        })
        // for checking in postman pass as raw json
        return res.status(200).json({
            message: "User created successfully",
        })

    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new ApiError(500, "Some field Is messing");
        }
        const user = await User.findOne({ email })
        if (!user) {
            throw new ApiError(404, "User not found")
        }

        // we created a method in userModel to check if password is correct or not

        const isPasswordCorrect = await user.isPasswordCorrect(password)
        if (!isPasswordCorrect) {
            throw new ApiError(401, "Password is incorrect")
        }
        const tokenData = {
            userId: user._id,
            email: user.email
        }

        const token = user.generateAccessToken()

        // console.log(token);

        return res.cookie("token", token).status(200).json({
            message: "User logged in successfully",
            id: user._id,
            email: user.email,
            username: user.username,
            profilePhoto: user.profilePhoto
        })

    } catch (error) {
        console.log(error);
    }
}

export const logout = (req, res) => {
    try {
        res.clearCookie("token")
        // console.log("user logged out successfully");
        // console.log(req.cookies);
        console.log("User logged out successfully");
        return res.status(200).json({
            message: "User logged out successfully"
        })
    } catch (error) {
        console.log(error);
    }
}   

export const getOtherUsers = async (req, res) => { 
try {
    const loggedInUserId = req.id
    const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")
    // console.log( "req.id " ,req.id);
    return res.status(200).json({
        message: "Other users fetched successfully",
        otherUsers
    })
} catch (error) {
    console.log( "Error in getOtherUsers" , error);
}
}
