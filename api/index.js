const express = require("express");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const port = 8000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");


const User=require("./models/user")
const Order=require("./models/order")


mongoose.connect("mongodb+srv://urbanutopia:urbanutopia@cluster0.tbg46b5.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error ", err);
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
const sendVerificationEmail=async(email,verificationToken)=>{
    const transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"pateljay8886@gmail.com",
            pass:'nfig zizp homv kcel'
        }
    })
    const mailOptions={
        from:"amazon.com",
        to:email,
        subject:"Email Verification",
        text:`Please click the following link to verify your email: http://localhost:8000/verify/${verificationToken}`
    }

    try{
        
        await transporter.sendMail(mailOptions);
    }
    catch(err){
        console.log("Email ",err)
    }
}
app.post("/register",async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        console.log(req.body);
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"Email already registered."})
        }
    
        const newUser=new User({name,email,password});
        
        newUser.verificationToken=crypto.randomBytes(20).toString('hex');

        await newUser.save();
        console.log("User saved in db");
        sendVerificationEmail(newUser.email,newUser.verificationToken);
        res.status(200).json({message:"Registration successfull"});
    }
    catch(error){
        console.log("Error registering user ",error);
        res.status(500).json({message:"Registration failed"});
    }
})

app.get("/verify/:token",async(req,res)=>{
    try{
        const token=req.params.token;

        const user=await User.findOne({verificationToken:token});
        if(!user){
            return res.status(404).json({message:"Invalid Verification Token"});
        }

        user.verified=true;
        user.verificationToken=undefined;
        user.save()
        res.status(200).json({message:"Email verified successully"});
    }
    catch(err){
        res.status(500).json({message: "Email Verification Failed"})
    }
})