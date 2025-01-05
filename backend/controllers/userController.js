import asyncHandler from "express-async-handler";
import nodemailer from "nodemailer";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import _ from "lodash";
// import { getAmbulanceDetails } from "../../frontend/src/actions/ambulanceActions.js";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      isAdmin: user.isAdmin,
      isDoctor: user.isDoctor,
      name: user.name,
      email: user.email,
      phone: user.phone,

      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    // throw new Error("Invalid email or password");
  } else {
    const token = generateToken(user._id);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: "tasmin.saira@gmail.com",
        pass: "qwdexgkkieqonlil",
      },
    });

    return user.updateOne({ resetLink: token }, function (err, success) {
      if (err) {
        return res.status(400).json({ error: "reset password error" });
      } else {
        return transporter.sendMail({
          from: "tasmin.saira@gmail.com",
          to: "tasmin.saira@gmail.com",
          subject: "Test Email Subject",
          html: `<h2>Please click on given link to reset your password</h2>
         <p>${process.env.CLIENT_URL}/reset-password-link/${token}</p>
        `,
        });
      }
    });
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const email = "john@example.com";
  const user = await User.findOne({ email });

  if (req.params.token) {
    jwt.verify(
      req.params.token,
      process.env.JWT_SECRET,
      function (error, decodedData) {
        if (error) {
          return res.status(401).json({
            error: "Incorrect token it is expired",
          });
        }

        User.findOne({ resetLink: req.params.token }, (err, user) => {
          if (err || !user) {
            return res.status(400).json({ error: "test" });
          }
          const obj = {
            password: password,
            resetLink: "",
          };
          user = _.extend(user, obj);
          user.save((err, result) => {
            if (err) {
              return res.status(400).json({ error: "reset password error" });
            } else {
              return res.status(200).json({ message: "changes" });
            }
          });
        });
      }
    );
  } else {
    return res.status(401).json({ error: "Authentication error" });
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;
  // console.log(req.body);

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    phone,

    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      // userType: user.userType,
      isAdmin: user.isAdmin,
      // isDoctor: user.isDoctor,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  forgetPassword,
  resetPassword,
};
