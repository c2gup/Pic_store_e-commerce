const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../helpers/accessToken");
const { generateRefreshToken } = require("../helpers/refreshToken");
const transporter = require("../utils/transporter");

const crypto = require("crypto");

// const signup = async (req, res) => {
//   const { username, email, password, accountType } = req.body;

//   try {
//     let user = await User.findOne({ username });
//     if (user) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Username already in use" });
//     }
//     const securePassword = await bcrypt.hash(password, 10);

//     user = new User({
//       username,
//       email,
//       password: securePassword,
//       accountType,
//     });



//     const data = {
//       id: user._id,
//       accountType: user.accountType,
//       author: user.username,
//     };


//     await user.save();

//     return res
//       .status(201)
//       .json({ success: true, message: "Please Check Your email" });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };



const signup = async (req, res) => {
  const { username, email, password, accountType } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "Email already in use" });
    }

    const securePassword = await bcrypt.hash(password, 10);

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    user = new User({
      username,
      email,
      password: securePassword,
      accountType,
      isVerified: false, // New users are not verified
      
      verifyToken:verificationToken,
    });

    await user.save();

    // Send verification email
    const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Verify Your Email",
      html: `<p>Hello ${username},</p>
             <p>Please verify your email by clicking the link below:</p>
             <a href="${verificationUrl}">Verify Email</a>`,
    });

    return res.status(201).json({
      success: true,
      message: "Signup successful! Please check your email to verify your account.",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const verifyEmail = async (req, res) => {
  const token = req.query.token;


  if (!token) {
    return res.status(400).json({ message: 'Token is missing' });
  }

  try {
    const user = await User.findOne({verifyToken:token });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid token" });
    }

    // Mark user as verified
    user.verify = true;
    user.verifyToken = null;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully! You can now log in.",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};





const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Please signup" });
    }
    if (!user.verify) {
      return res.status(400).json({ success: false, message: "Please verify your email" });
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentails" });

    const data = {
      id: user._id,
      accountType: user.accountType,
      author: user.username,
    };

    const accessToken = generateAccessToken(data);
    const refreshToken = generateRefreshToken(data);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      refreshToken,
      role: user.accountType,
      author: user.username,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const refresh = async (req, res) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({ success: false, message: "Please login" });

  try {
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err)
        return res.status(403).json({ success: false, message: err.message });

      const accessToken = generateAccessToken({
        id: user.id,
        accountType: user.accountType,
        author: user.author,
      });
      const refreshToken = generateRefreshToken({
        id: user.id,
        accountType: user.accountType,
        author: user.author,
      });

      return res.status(200).json({
        success: true,
        message: "Token refreshed successfully",
        accessToken,
        refreshToken,
        role: user.accountType,
        author: user.author,
      });
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const switchProfile = async (req, res) => {
  const authorId = req.id;
  const authorAccountType = req.accountType;
  try {
    const user = await User.findByIdAndUpdate(authorId, {
      accountType: authorAccountType === "buyer" ? "seller" : "buyer",
    });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const data = {
      id: user._id,
      accountType: user.accountType,
      author: user.username,
    };

    const accessToken = generateAccessToken(data);
    const refreshToken = generateRefreshToken(data);

    return res.status(200).json({
      success: true,
      message: `Switched to ${user.accountType}`,
      accessToken,
      refreshToken,
      role: user.accountType,
      author: user.username,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { login, signup, refresh, switchProfile ,verifyEmail };
