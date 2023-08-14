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

// UPDATE


// DELETE PRODUCT