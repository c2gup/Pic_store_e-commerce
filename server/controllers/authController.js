const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {generateAccessToken} = require("../helpers/accessToken");

const signUp = async (req,res) =>{

      const {username ,email, password ,accountType} = req.body;
       try {

            let user = await User.findOne({username});
            if(user){
                  return res
                  .status(400)
                  .json({success:false,message:"User already exists"});
            }

            const securePassword = await bcrypt.hash(password,10);

            user = new User({
                  username,
                  email,
                  password:securePassword,
                  accountType,
            });

            await user.save();

            return res
            .status(201)
            .json({success:true, message:"User created successfully"})
            
       } catch (error) {

            return res.status(500).json({success:false,message:"erroe.message"});
            
       }
};

const login = async (req,res) =>{
      const {email,password} = req.body;

      try {

            let user = await User.findOne({email});

            if(!user){
                  return res
                  .status(404)
                  .json({success:false,message:"user not found"});
            }

            let comparepassword = await bcrypt.compare(password,user.password);

            if(!comparepassword){
                  return res
                  .status(404)
                  .json({success:false,message:"password mismatch"});
            }

            const data = {
                  id: user._id,
                  accountType: user.accountType,
                  author: user.username,
                };


                const accessToken = generateAccessToken(data);
            //     const refreshToken = generateRefreshToken(data);

            return res
            .status(200)
            .json({
                  success:true,
                  message:"access token",
                  accessToken,
                  role: user.accountType,
                  author: user.username,
            });
            
      } catch (error) {
            return res
            .status(404)
            .json({
                  success:false,
                  message: error.message,
            })
      }
}



module.exports = {  signUp , login };