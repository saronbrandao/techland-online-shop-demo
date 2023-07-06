import express from 'express';
// import products from '../data/products.js';
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    // we use the method .find() to populate the empty object we just passed ({}).
    // Empty object means that you want them all. If that was not the case
    // you could pass certain options inside this object.
    const products = await Product.find({});
    res.json(products);
  })
);
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    // getting a product locally
    // const product = products.find((p) => p._id === req.params.id);
// 
    // This is how you get a single product now.
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    }

    res.status(404).json({
      message: 'Product not found',
    });
  })
);

export default router;
