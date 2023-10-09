const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("./Modals/UserSchema")

const SECRET_KEY = 'secretkey'

const app = express()

const dbURL = "mongodb+srv://raghav:raghav3322@cluster0.wwiwhgq.mongodb.net/UserDB?retryWrites=true&w=majority"
mongoose.connect(
    dbURL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>{
        app.listen(3001, ()=>{
            console.log("Server is connected to port 3001 and connected to MongoDB")
        })
    })
    .catch(()=>{
        console.log("Unable to connect to the server and/or mongodb ")
    })

app.use(bodyParser.json())
app.use(cors())

app.post('/register', async (req,res)=>{
    try{
        const {name,email,phone,password} = req.body
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = new User({name,email,phone,password: hashedPassword})
        await newUser.save()
        res.status(201).json({message: 'User created successfully'})
    } catch (error){
        res.status(500).json({error:'Error signing up'})
    }
})

app.get('/register', async(req,res)=>{
    try{
        const users = await User.find()
        res.status(201).json({users})
    }catch(error){
        res.status(500).json({error:'Unable to get users'})
    }
})

app.post('/login',async(req,res)=>{
    try{
        const {email,password} = req.body
        const user = await User.findOne({email})
        if(!email){
            return res.status(401).json({error:"Invalid Credentials"})
        }
        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            return res.status(401).json({error:"Invalid Credentials"})
        }
        const token = jwt.sign({userId:user._id},SECRET_KEY,{expiresIn:'1hr'})
        res.json({message:'Login successful'})
    } catch(error){
        res.status(500).json({error:'Error logging in'})
    }
})