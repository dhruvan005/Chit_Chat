import { User } from "../models/userModel.js"
import { ApiError } from "../utils/ApiError.js"


export const register = async (req, res) => {
    try {
        const { fullName, username, email, password, conformPassword, gender } = req.body;
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

        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy/username=${username}`
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl/username=${username}`

        const newUser = await User.create({
            fullName,
            username,
            email,
            gender,
            password,
            profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto

        })
        return res.status(200).json({
            message: "User created successfully", 
    })

    } catch (error) {
        console.log(error);
    }
}
