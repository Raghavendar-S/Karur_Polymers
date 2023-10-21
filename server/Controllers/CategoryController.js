const { default: slugify } = require("slugify");
const CategoryModel = require("../Models/CategoryModel");

const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }

    const existingCategory = await CategoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category Already exists",
      });
    }
    const category = await new CategoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "New category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while creating category",
      error,
    });
  }
};

const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await CategoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category successfully Updated",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating category",
      error,
    });
  }
};

const categoryController = async(req,res) => {
    try{
        const category = await CategoryModel.find({})
        res.status(200).send({
            success:true,
            message: 'All Category List',
            category
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting all category",
            error,
          });
    }
}

const singleCategoryController = async(req,res) => {
    try{
        const category = await CategoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message: 'Single Category List',
            category
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting single category",
            error,
          });
    }
}

const deleteCategoryController = async(req,res) => {
    try{
        const { id } = req.params;
        const category = await CategoryModel.findByIdAndDelete(id)
        if (!category) {
            return res.status(404).send({
                success: false,
                message: 'Category not found',
            });
        }
        res.status(200).send({
            success:true,
            message: 'Deleted Category successfully',
            category
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting deleting category",
            error,
          });
    }
}

module.exports = { createCategoryController, updateCategoryController, categoryController,singleCategoryController, deleteCategoryController };
