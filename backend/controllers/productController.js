
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  // set the pagination
  const pageSize = 8;  // * feel free to increase this val
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword ? {
    name: {$regex: req.query.keyword, $options: 'i'}
  }:{};    // this is to search for a product by name (case insensitive) needed to use regular expression

  const count = await Product.countDocuments({...keyword});  // todo : use sql query to get the count of all products

  // TODO : USE SQL QUERY TO GET ALL PRODUCTS  - change apporiately according to pagination
  const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1));
  res.json({products, page, pages: Math.ceil(count / pageSize)})
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  // todo : use sql query to get product by id
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  }
  res.status(404);
  throw new Error('Resource not found');
});


// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
   // todo : modify the following fields if necessary (if it does not match with the ER diagram)
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',

  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);

});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  // TODO : USE SQL QUERY TO GET PRODUCT BY ID (Also get the appopriate data fields )
 const { name, price, description, image, brand, category, countInStock } =
      req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }



});


// @desc    delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  // TODO : USE SQL QUERY TO GET PRODUCT BY ID ( )

  const product = await Product.findById(req.params.id);

  if (product) {
      // todo : use sql query to delete product by id
       await Product.deleteOne({_id: product._id});
       res.status(200).json({message: "Product deleted successfully"});
  } else {
    res.status(404);
    throw new Error('Product not found');
  }



});


// @desc    Get top rated products (to display in the carousel)
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {

  // todo : use sql query to get top rated products
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});

export { getProducts, getProductById , createProduct, updateProduct, deleteProduct, getTopProducts};


