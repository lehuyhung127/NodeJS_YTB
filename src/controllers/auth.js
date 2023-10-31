import { signInValidator, signUpValidator } from "../validation/user.js";
import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const { SECRET_CODE } = process.env;
export const signUp = async (req, res) => {
  try {
    const { error } = signUpValidator.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const useExists = await User.findOne({ email: req.body.email });
    if (useExists) {
      return res.status(400).json({
        message: "Email da ton tai",
      });
    }

    const hashedPassword = await bcryptjs.hash(req.body.password, 10);

    const user = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    user.password = undefined;
    return res.status(200).json({
      message: "Done",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const { error } = signInValidator.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        message: "email khong ton tai",
      });
    }

    const isMatch = await bcryptjs.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Sai mat khau",
      });
    }

    const accessToken = jwt.sign({ _id: user._id }, SECRET_CODE);

    user.password = undefined;
    return res.status(200).json({
      message: "Done",
      user,
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({ name: error.name, message: error.message });
  }
};
