import asyncHandler from 'express-async-handler'; // Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.
import Product from '../models/product.model.js';

// @desc     Fetch all products
// @route    GET /api/products
// @access   Public
export const getProducts = asyncHandler(async (req, res) => {
  // Search keyword with name
  const keyword =req.query.keyword ? {
    name : {
      $regex : req.query.keyword, // pattern matching strings in queries
      $options : 'i' // case-insensitive match
    }
  } : {}

  // pagination 
  const pageSize = 4;
  const page = Number(req.query.pageNumber) || 1;

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword }).limit( pageSize ).skip( pageSize * ( page - 1 ));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc     Fetch single product
// @route    GET /api/products/:id
// @access   Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found..!');
  }
});

// @desc     Delete a product
// @route    DELETE /api/products/:id
// @access   Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();

    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found..!');
  }
});

// @desc     Create a product
// @route    POST /api/products
// @access   Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Smaple name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Smaple brand',
    category: 'Smaple category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createProduct = await product.save();
  res.status(201).json(createProduct);
});

// @desc     Update a product
// @route    PUT /api/products/:id
// @access   Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, brand, category, countInStock } = req.body;

  const image = req.file.path;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updateProduct = await product.save();
    res.json(updateProduct);
  } else {
    res.status(404);

    throw new Error('Product not found');
  }
});

// @desc     Create new review
// @route    POST /api/products/:id/reviews
// @access   Private
export const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    // check user id in reviews for specific product
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);

      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    // push review to product review array
    product.reviews.push(review);

    // update review length to number of review count
    product.numReviews = product.reviews.length;

    // update product rating
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);

    throw new Error('Product not found');
  }
});

// @desc     Get top rated product
// @route    GET /api/products/top
// @access   Public
export const getTopProducts = asyncHandler(async (req, res) => {
  
  const products = await Product.find({}).sort({ rating: -1 }).limit(3) // order by rating assending order -1

  res.json(products)
});
