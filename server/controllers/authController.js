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
    // Handle Google login if accessToken is present
    if (req.body.accessToken) {
      const { accessToken } = req.body; // Access token is declared here
    
      const decodedToken = await admin.auth().verifyIdToken(accessToken);
      const userEmail = decodedToken.email;

      let user = await User.findOne({ email: userEmail });

      if (!user) {
        user = new User({
          username: decodedToken.name || "GoogleUser",
          email: userEmail,
          accountType: "buyer", // Default to buyer for Google logins
          verify: true, // Automatically verified for Google users
        });
        await user.save();
      }

      const data = {
        id: user._id,
        accountType: user.accountType,
        author: user.username,
      };
      const newaccessToken = generateAccessToken(data);
      const refreshToken = generateRefreshToken(data);

      return res.status(200).json({
        success: true,
        message: "Login successful",
        newaccessToken,
        refreshToken,
        role: user.accountType,
        author: user.username,
        verify: true,
        verifyToken: null,
      });
    }

    // Traditional Email/Password login
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
    const newaccessToken = generateAccessToken(data);
    const refreshToken = generateRefreshToken(data);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      newaccessToken,
      refreshToken,
      role: user.accountType,
      author: user.username,
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



// const login = async (req, res) => {
//   const { email, password, accessToken} = req.body;
 

//   try {
//     if (accessToken){
//       // Verify Google token
//       console.log("Received accessToken:", accessToken);
//       const decodedToken = await admin.auth().verifyIdToken(accessToken);
//       const userEmail = decodedToken.email;

//       let user = await User.findOne({ email: userEmail });
     
//       if (!user) {
//         // Register new user for Google Login
//         user = new User({
//           username: decodedToken.name || "GoogleUser",
//           email: userEmail,
//           accountType: "buyer", // Default to buyer for Google logins
//           verify: true, // Automatically verified for Google users
//         });
//         await user.save();
//       }

//       // Generate JWT tokens
//       const data = {
//         id: user._id,
//         accountType: user.accountType,
//         author: user.username,
//       };
//       const accessToken = generateAccessToken(data);
//       const refreshToken = generateRefreshToken(data);

//       return res.status(200).json({
//         success: true,
//         message: "Login successful",
//         accessToken,
//         refreshToken,
//         role: user.accountType,
//         author: user.username,
//         verify: true,
//         verifyToken:null,
//       });
//     }

//     // Fallback for traditional Email/Password login
//     let user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ success: false, message: "Please signup" });
//     }
//     if (!user.verify) {
//       return res.status(400).json({ success: false, message: "Please verify your email" });
//     }
//     const comparePassword = await bcrypt.compare(password, user.password);
//     if (!comparePassword) {
//       return res.status(400).json({ success: false, message: "Invalid credentials" });
//     }

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
