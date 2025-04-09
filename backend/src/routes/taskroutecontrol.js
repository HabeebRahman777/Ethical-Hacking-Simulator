import express from "express"
import User from "../model/user.js";
import {exec} from "child_process"
import multer from "multer" 
import path from "path"
import { fileURLToPath } from 'url';
import VulnerableUser from "../model/vulnerableUser.js"

const taskRouter = express.Router()

let comments=[]

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); 
  },
});

const upload = multer({ storage: storage });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '..', '..', 'uploads');

taskRouter.post("/nosql/login", async (req, res) => {
    const { username, password } = req.body;
    console.log(username);
    
    try {
      
      const user = await User.findOne({ username:username,password:password});
  
      if (user) {
        console.log(user);
        
        res.send({ message: 'Login successful!' });
        res.status(201).json({
            _id:user._id,
            username:user.username,
            email:user.email
        })
      } else {
        res.send({ message: 'Invalid credentials!' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Server error' });
    }
  });

taskRouter.post("/SXSS/comments",async(req,res)=>{
    const { name, comment } = req.body
    comments.push({ name, comment })
    res.status(201).json({ message: "Comment saved!" })
})

taskRouter.get("/SXSS/comments",(req,res)=>{
    res.json(comments)
})

taskRouter.post("/command-injection",(req,res)=>{
    const{ip}=req.body
    
    exec(ip, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${error.message}`);
        return res.status(500).json({ result: `Error: ${error.message}` });
      }
      if (stderr) {
        return res.status(400).json({ result: `Stderr: ${stderr}` });
      }
      res.json({ result: stdout });
    });
})



taskRouter.post('/upload', upload.single('file'), (req, res) => {

  try {
    if (req.file) {
      res.status(200).json({
        message: "File uploaded successfully",
        fileUrl: `/uploads/${req.file.filename}`,
      });
    } else {
      res.status(400).json({ message: "No file provided" });
    }
  } catch (err) {
    res.status(500).json({ message: "File upload failed", error: err.message });
  }
});


taskRouter.get('/csrf', async (req, res) => {
  try {
    const users = await VulnerableUser.find(); 
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


taskRouter.post('/csrf', async (req, res) => {

  const { userId,currentPassword, newPassword } = req.body;
  
  
  const user = await VulnerableUser.findOneAndUpdate(
    { id: userId, password: currentPassword }, 
    { password: newPassword }, 
    { new: true } 
  );

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.json({ message: 'Password changed successfully!' });
 
  
});

taskRouter.get("/idor/:id", async (req, res) => {
  
  const userId = req.params.id
  const user = await VulnerableUser.findOne({id:userId})

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.json(user);

});

taskRouter.post("/idor-login", async(req, res) => {
  const { username, password } = req.body;
  const user = await VulnerableUser.findOne({username,password})
  if (user) {
    res.json({ success: true,userId:user.id});
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});



taskRouter.post("/open-redirect", async(req, res) => {
  const { username, password } = req.body;
  const user = await VulnerableUser.findOne({username,password})
  if (user) {
    res.json({ success: true,userId:user.id});
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});



export default taskRouter
