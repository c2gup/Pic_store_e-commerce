const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../helpers/accessToken");
const { generateRefreshToken } = require("../helpers/refreshToken");
const transporter = require("../utils/transporter");

const crypto = require("crypto");
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert({
    type:process.env.FIREBASE_TYPE,
    project_id:process.env.FIREBASE_PROJECT_ID,
    private_key_id:process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key:process.env.FIREBASE_PRIVATE_KEY,
    client_email:process.env.FIREBASE_CLIENT_EMAIL,
    client_id:process.env.FIREBASE_CLIENT_ID,
    auth_uri:process.env.FIREBASE_AUTH_URI,
    token_uri:process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url:process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url:process.env.FIREBASE_CLIENT_X509_CERT_URL,
    universe_domain:process.env.FIREBASE_UNIVERSAL_DOMAIN,
  }),
});

// admin.initializeApp({
//   credential: admin.credential.cert({
//     "type": "service_account",
//     "project_id": "picwebsite-f72d2",
//     "private_key_id": "e1e04a54227f38b54b1819686899c7a9cfb7c7b9",
//     "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDILWhQW5u5UhiK\nss6xkwxvJYSu88icmoiXOHZQ6U009dVNbSseWJi7Xyh1ACNQK6zGczcpita+EKfJ\nfU1pa45xBLAG0VRcRdEbq1x2KER1YFuoP5xHKRJJi1WhWS8r4HVnZ+z2Bre9oSWl\nLrKF5B1wsPrL6j+TiDi+qM2MK+KL0z70eh4w1aqgnKBzwvp1E5N1XsAAUGFtDSjA\nTLV9PkSuP2/NOve9fMsC9TQI3E7c3lsiZZU8xikdtG8Y7yGW+w4TWDlQpv3uys3C\nXx/DdLpHBZaD6voFNZTa2IdxGMOGbFjYP/sQQhrEehYCy6FZjnL/5ot2z8eWVqDm\n/DmhnNNrAgMBAAECggEANirDXWtMmjsy1OVJtRd7d+AJJWZmVKokZ/cpXP+kmr4i\n+A6galfDDIDVa8Obyqfm2tR2itE9BrVvEcDMX8hxBPglwdKHJ2jlCr22CWsgCzsF\n0mNUIJVmk2wWwdBmSVM1scOXhYOP2Mpwa2BVgpGVvdbGJsO+bGeiI0V+SX3ekcMf\nXBoDXpdnG2RkzgMHvFhBg1q+FZn3+yGdwXzIkPk3N11M+hQpTSYypxZCgLbt4/v6\nQDC9XtxGZqgsVllHs/rzJQyfbtw+qWuhDMxpUsaSQYPI2ozajQzosrSoEIkABZSa\nJP5m1F7DeZ58svTOvzMR7WM27LDdSi4dciVd5xRNcQKBgQDre6yR++OU58INFSpC\n/G9sPzmpHvpLTDVOP8PxjSM/gZ5HeDeZIhAjseAMF1zE8n7AzRJJKyqHEoU+8ePb\nCVlko1sFaSFzVAd0Lm3dpg6R98xjsEmOA1/7uqhZyCkqWzfFjTJUUWOnmY5gi6UA\nQW1z+vy1Beh0/FlKGF9hmF6thwKBgQDZnkH+ENEW7FaS/QO+16f3WU5iFZ798oLJ\nVjOQ5bcQ1HMh0PC6T8oVU2/Yl223bprfMD2XqLlwSQv62VQd2w3piANfy8CW91k2\nhbAYLUeY0aIyiHu6rqofNWry49iyDBopi0//6tEOUL4PHkOP+T1NbS3pRC9xZFOr\nR7cWRpdD/QKBgGdtpalk+lufw5Kddjd/yqy/xGKs0YCbE1qwFS8WL6IoG04G1lyz\nImWbLe4BoOR8IgIq0FpE1GQJVW8FLXA6VgIm4capm2CdSrzT27ubwRCJx0MN3fC7\nOMBHBsSQbsxEzmU9lBqGuP+XKXrsOue21Q048x/LXYNshwdNVy91jjgnAoGAOCWh\n5zhVijGOILyRE9M2bhYnqBzl+aVxYxsPkOoD8p6t2eK7yYY+oIP3jo17bGFoKf+b\nVJ7ewX7HTYB3OIDFNSS3oibC2PCWnv+dMI+2MlKcI6edLMxV7lls76Ajz8RZl7Bv\nApuGNshUUThAvEvVKj3qI45JI1t8Tuvg7Cloa80CgYEAw+BORwBDkq3YBNB1nKsF\nDYfcUgUFurzht16pGOWg+YjN52x1YCmbbwa+WorCLIGuE6Kc/KEsp9cLdVYz/rCG\neQAeUF92g8VBOZrOc3TmouQ5a/Kfckdc2toufi3w/gCdOpT2876GOxXqhpD7gUkF\nzku7DMolGUgNoIfnMkutUeM=\n-----END PRIVATE KEY-----\n",
//     "client_email": "firebase-adminsdk-4xgs4@picwebsite-f72d2.iam.gserviceaccount.com",
//     "client_id": "103337786084546895503",
//     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//     "token_uri": "https://oauth2.googleapis.com/token",
//     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-4xgs4%40picwebsite-f72d2.iam.gserviceaccount.com",
//     "universe_domain": "googleapis.com"
//   }
//   )
// });


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





// const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     let user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ success: false, message: "Please signup" });
//     }
//     if (!user.verify) {
//       return res.status(400).json({ success: false, message: "Please verify your email" });
//     }
//     const comparePassword = await bcrypt.compare(password, user.password);
//     if (!comparePassword)
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid credentails" });

//     const data = {
//       id: user._id,
//       accountType: user.accountType,
//       author: user.username,
//     };

//     const accessToken = generateAccessToken(data);
//     const refreshToken = generateRefreshToken(data);

//     return res.status(200).json({
//       success: true,
//       message: "Login successful",
//       accessToken,
//       refreshToken,
//       role: user.accountType,
//       author: user.username,
//     });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };



const login = async (req, res) => {
  const { email, password, googleToken } = req.body;
 

  try {
    if (googleToken) {
      // Verify Google token
      const decodedToken = await admin.auth().verifyIdToken(googleToken);
      const userEmail = decodedToken.email;

      let user = await User.findOne({ email: userEmail });
     
      if (!user) {
        // Register new user for Google Login
        user = new User({
          username: decodedToken.name || "GoogleUser",
          email: userEmail,
          accountType: "buyer", // Default to buyer for Google logins
          verify: true, // Automatically verified for Google users
        });
        await user.save();
      }

      // Generate JWT tokens
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
        verify: true,
        verifyToken:null,
      });
    }

    // Fallback for traditional Email/Password login
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Please signup" });
    }
    if (!user.verify) {
      return res.status(400).json({ success: false, message: "Please verify your email" });
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

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
