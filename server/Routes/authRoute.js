const express = require('express')
const { loginController, registerController,testController, forgotPasswordController } = require('../Controllers/authController');
const {requireSignIn, isAdmin} = require('../Middlewares/authMiddleware')

//router object
const router = express.Router()

//routing
//Login || Method POST
router.post('/login',loginController);

//Register || Method POST
router.post('/register',registerController)

//test route
router.get("/test",requireSignIn, isAdmin, testController);

//Forgot Password
router.post('/forgot-password', forgotPasswordController);

//protected user route 
router.get('/user-auth',requireSignIn, (req,res) => {
    res.status(200).send({ok:true});
})

//protected admin route 
router.get('/admin-auth',requireSignIn, isAdmin, (req,res) => {
    res.status(200).send({ok:true});
})

module.exports = router;