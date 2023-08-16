import Product from '../models/product.js';

// CREATE PRODUCT

export const createProduct = async (req, res, next) => {
        const newProduct = new Product({...req.body});
    try{
         const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    }catch(err){
        next(err);
    };
};

// GET SINGLE PRODUCT

export const getSingleProduct = async (req, res, next) => {
    try{
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    }catch(err){next(err);};
};

// GET ALL PRODUCTS
export const getAllProduct = async (req, res, next) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

// UPDATE
export const updateProduct = async (req, res, next)=>{
    try{
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {$set:req.body}, {new:true});
    res.status(200).json(updatedProduct);
}catch(error){
    next(error)
}
}


// DELETE PRODUCT
export const deleteProduct = async (req, res,next)=>{
    try{
       await  Product.findByIdAndDelete(req.params.id);
        res.status(200).json("product has been deleted")
    }catch(error){
        next(error);
    }
}