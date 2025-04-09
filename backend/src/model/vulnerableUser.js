import mongoose from "mongoose";

const userSchema=new mongoose.Schema(
    {   id:{
            type:String,
            required:true,
        },
        username:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
            minlength:6,
        }
    },
    {timestamps:true}
);

const VulnerableUser = mongoose.model("VulnerableUser",userSchema)

export default VulnerableUser