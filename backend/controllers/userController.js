
import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

export const register = async (req, res) => {
  try {
    const { fullName, username, email, password, conformPassword, gender } =
      req.body;

    // console.log(req.body);

    if (
      !fullName ||
      !email ||
      !username ||
      !password ||
      !conformPassword ||
      !gender
    ) {
      return res.status(500).json({ message: "Some field Is messing" });
    }
    if (email) {
      const isValid = validator.isEmail(email);
      if (!isValid)
        return res.status(500).json({ message: "Email is invalid" });
    }

    if (password !== conformPassword) {
      return res.status(500).json({ message: "password did't match" });
    }
    const existedUser = await User.findOne({
      $or: [{ username }, { email }], // check any one if found it will throw error
    });

    if (existedUser) {
      return res
        .status(409)
        .json({ message: "User with email or username already exists" });
    }

    // password hashing is done before user creation useing pre function

    const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = await User.create({
      fullName,
      username,
      email,
      gender,
      password,
      profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
    });

    // console.log("newUser", newUser);
    const tokenData = {
      userId: newUser._id,
      email: newUser.email,
    };

    const token = newUser.generateAccessToken();
    // console.log(token);

    // for checking in postman pass as raw json
    return res.cookie("token", token).status(200).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email , password } = req.body;
    if (!email || !password) {
      return res.status(500).json({ message: "Some field Is messing" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Password is incorrect" });
    }
    const tokenData = {
      userId: user._id,
      email: user.email,
    };

    const token = user.generateAccessToken();

    // console.log(token);

    return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({ 
        message : "Logged In Successfully" ,
        _id: user._id,
        username: user.username,
        fullName: user.fullName,
        profilePhoto: user.profilePhoto ,
        token
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    
    res.clearCookie("token");
    // console.log("user logged out successfully");
    console.log("User logged out successfully");
    return res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getOtherUsers = async (req, res) => {
  try {
    const loggedInUserId = req?.id;
    const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );
    // console.log( "req.id " ,req.id);
    return res.status(200).json({
      message: "Other users fetched successfully",
      otherUsers,
    });
  } catch (error) {
    console.log("Error in getOtherUsers", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
