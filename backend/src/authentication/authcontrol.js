import bcrypt from "bcryptjs"
import User from "../model/user.js"
import { generateToken } from "../lib/utils.js"

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email is already taken.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    if(newUser){
      generateToken(newUser._id,res)
      await newUser.save();

      res.status(201).json({
          _id:newUser._id,
          username:newUser.username,
          email:newUser.email
      })

    }else{
        res.status(400).json({message:"invalid user credentials"})
    }
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' });
  }
}

export const logout = async(req,res)=>{
  try {
    res.cookie("ehs","",{maxAge:0})
    res.status(200).json({message:"Logged Out successfully"})

  } catch (error) {
    console.log("Error in logout controller",error.message)
    res.status(500).json({message:"Internal Server Error"})
  }
}

export const login= async (req,res)=>{
  const{email,password}=req.body
  try {
    const user = await User.findOne({email})

    if(!user){
      return res.status(400).json({message:"Invalid credentials"})
    }

    const isPasswordCorrect = await bcrypt.compare(password,user.password)
    if(!isPasswordCorrect){
        return res.status(400).json({message:"Invalid Credentials"})
    }
    generateToken(user._id,res)

    res.status(201).json({
      _id:user._id,
      username:user.username,
      email:user.email
  })

  } catch (error) {
    console.log("Error in login controller",error.message)
    res.status(500).json({message:"Inernal Server Error"})
  }
}
