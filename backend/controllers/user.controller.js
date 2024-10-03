import {User} from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
      const { fullname, email, phoneNumber, password, role } = req.body;
       
      if (!fullname || !email || !phoneNumber || !password || !role) {
          return res.status(400).json({
              message: "Something is missing",
              success: false
          });
      };
      const file = req.file;
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

      const user = await User.findOne({ email });
      if (user) {
          return res.status(400).json({
              message: 'User already exist with this email.',
              success: false,
          })
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({
          fullName: fullname,
          email,
          phoneNumber,
          password: hashedPassword,
          role,
          profile:{
              profilePhoto:cloudResponse.secure_url,
          }
      });

      return res.status(201).json({
          message: "Account created successfully.",
          success: true
      });
  } catch (error) {
      console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "check all fields correctly",
        success: false,
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "incorrect email or password",
        success: false,
      });
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(400).json({
        message: "incorrect email or password",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "Account does not exist with this role",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `welcome back ${user.fullName}`,
        success: true,
        user,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ message: "logged out successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;


    const fileUri = getDataUri(file)
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content)

    

    let skillsArray;
    if(skills){
        skillsArray = skills.split(",");
    }
    const userId = req.id;

    let user = await User.findById(userId);

    if (!user) {
      return res
        .status(400)
        .json({ message: "user not found", success: false });
    }
    

      if(fullName) user.fullName = fullName
      if(email) user.email = email
      if(phoneNumber) user.phoneNumber = phoneNumber
      if(bio) user.profile.bio = bio
      if(skills) user.profile.skills = skillsArray


      if(cloudResponse){
        user.profile.resume = cloudResponse.secure_url
        user.profile.resumeOriginalName = file.originalname
      }

    await user.save();

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(201)
      .json({ message: "profile updated", user, success: true });
  } catch (error) {
    console.log(error);
  }
};
