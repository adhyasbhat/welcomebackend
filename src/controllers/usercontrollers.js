const User = require("../modules/usermodules");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretKey = "test"
console.log(secretKey)
const usercontroller = {}

usercontroller.loginUser = async (req,res)=>{
    console.log("login")
    try{
        const user = await User.findOne({name:req.body.name})
        console.log(user)
        if(!user){
            return res.status(404).json({error:"user does not exist"})
        }
        const decryptPassword = await bcrypt.compare(req.body.password,user.password)
        console.log(decryptPassword)
        if(!decryptPassword){
            return res.status(400).json({error:"password doesnt match"})
        }
        const idData = user.id;
        console.log(idData)
        console.log(secretKey,"secc")
        const token = await jwt.sign({id:idData},secretKey)
        console.log(secretKey,"sec")
        console.log(token)
        const success = true
        console.log(success)
        return res.status(200).json({success,token,user})
    }
    catch(error){
        console.log(error,"error")
        return res.status(500).json({error:"internal server error:",error})
    }
}
usercontroller.registerUser = async (req,res) =>{
    try{
        console.log("backend")
        const {name,email,dob,phone,password,confirmpassword} = req.body
        if(!name || !email || !phone || !dob || !password || !confirmpassword){
            return res.status(400).send("name, email, dob, phone, password and confirm password are mandatory")
        }
        if(password != confirmpassword){
            return res.status(400).json({error:"password and confirm password doesnt match"})
        }
        const findEmail = await User.findOne({email})
        if(findEmail){
            return res.status(400).json({error:"email already exist"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password,salt)

        const newUser = new User({name:name,email:email,dob:dob,phone:phone,password:hashPass})
        await newUser.save();
        return res.status(200).json({success:"Successfully registered"})
    }
    catch(error){
        return res.status(500).json({ error: "internal server error", details: error.message });
    }
}
module.exports = usercontroller