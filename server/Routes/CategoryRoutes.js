const express = require('express');
const {createCategoryController, updateCategoryController, categoryController, singleCategoryController, deleteCategoryController} = require('../Controllers/CategoryController');
const router = express.Router()
const {requireSignIn, isAdmin} = require('../Middlewares/authMiddleware')

//routes
//create category
router.post('/create-category', requireSignIn, isAdmin, createCategoryController)

//update category
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController)

//getAll category
router.get('/get-category', categoryController)

//single category
router.get('/single-category/:slug',singleCategoryController);

//delete category
router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController);

module.exports = router