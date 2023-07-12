import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// @des       Fetch all products
// @route     Get /api/products
// @access    Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @des       Fetch a product
// @route     Get /api/products/:id
// @access    Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    // we are going to throw a new error that will be captured in the server by
    //
    res.status(404);
    throw new Error('Resource not found');
  }
});

export {getProducts , getProductById}
