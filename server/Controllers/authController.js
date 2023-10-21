const {hashPassword, comparePassword} = require("../Utils/authUtils")
const UserModel = require("../Models/UserSchema")
const jwt = require("jsonwebtoken")

const registerController = async(req,res) => {
    try{
        const { name, email, phone, password, role, answer } = req.body;
        if(!name){
            return res.send({error:"Name is required"});
        }
        if(!email){
            return res.send({error:"Email is required"});
        }
        if(!phone){
            return res.send({error:"Phone is required"});
        }
        if(!password){
            return res.send({error:"Password is required"});
        }
        if(!answer){
            return res.send({error:"Answer is required"});
        }
        const existingUser = await UserModel.findOne({email})

        if(existingUser)
        {
            return res.status(201).send({
                success:false,
                message:"The email is already registered.Please login with another email"})
        }

        const hashedPassword = await hashPassword(password)
        const newUser = new UserModel({ name, email, phone, password: hashedPassword, role, answer });
        await newUser.save()
        res.status(201).send({success:true,message: 'Registration is done successfully',newUser})

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Registration",
            error
        })
    }
}

//Login || Method POST
const loginController = async (req,res)=>{
    try{
        const {email,password} = req.body
        const user = await UserModel.findOne({email})
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:"Invalid email or password"})
        }
        if(!user){
            return res.status(201).send({
                success:false,
                message:"Email is not registered"})
        }
        const isPasswordValid = await comparePassword(password,user.password)
        if(!isPasswordValid){
            return res.status(201).send({
                success:false,
                message:"Password mismatch"})
        }
        const token = await jwt.sign({userId:user._id},process.env.SECRET_KEY,{expiresIn:'3hr'})
        res.status(200).send({
            success:true,
            message:'Login successful',
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                role: user.role
            },
            token})
    } catch(error){
        res.status(500).send({success:false,message:'Error logging in',error})
    }
}

const testController = (req,res) =>{
    res.send("Admin Route");
    console.log("Admin Route");
}

const forgotPasswordController = async (req,res) => {
    try{
        const {email,newPassword,answer} = req.body;
        if(!email){
            return res.send({error:"Email is required"});
        }
        if(!answer){
            return res.send({error:"Answer is required"});
        }
        if(!newPassword){
            return res.send({error:"New Password is required"});
        }
        
        //check
        const user = await UserModel.findOne({email,answer})

        //validation
        if(!user)
        {
            return res.status(201).send({
                success:false,
                message: 'Wrong email or answer'
            })
        }

        const hashedPassword = await hashPassword(newPassword)
        await UserModel.findByIdAndUpdate(user._id,{password:hashedPassword});
        res.status(200).send({
            success:true,
            message: "Password reset successfully"
        })
    }catch(error)
    {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}

module.exports = {
    loginController,
    registerController,
    testController,
    forgotPasswordController
};