const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

//sign-up................................................
router.post("/signUp",async (req,res)=>{
    try{
        const{name,email,password,address} = req.body;
        if(name.length <=2){
            return res.status(400).json({message:"name length should be greater than 2"});
        }
        const existingusername = await User.findOne({name:name});
        if(existingusername){
            return res.status(400).json({message:"username already exist"});
        }
        const existEmail = await User.findOne({email:email});
        if(existEmail){
            return res.status(400).json({message:"email is already exist"});
        }
        if(password.length<=5){
            return res.status(400).json({message:"password length should be grt than equal to 8"});
        }
        const hashPassword = await bcrypt.hash(password,10);
        const newuser = await new User({
            name:name,
            email:email,
            password:hashPassword,
            address:address,
        })
       await  newuser.save();
        return res.status(200).json({message:"SignUp successfully"});
    }
    catch(err){
        return res.status(500).json({message:err});
    }
});

//sign-In..............................................

router.post("/sign-In",async(req,res)=>{
    try{
        const{name,password} = req.body;
        const existinguser = await User.findOne({name});
        if(!existinguser){
            return res.status(400).json({message:"invalid credential"});
        }
       await bcrypt.compare(password,existPassword.password,(err,data)=>{
            if(data){
                return res.status(200).json({message:"Sign-In successfully"});
            }
            if(err){
                return res.status(400).json({message:err});
            }
       });
    }catch(err){
        return res.status(500).json({message:"Internal Server Error"});
    }
})
module.exports = router;