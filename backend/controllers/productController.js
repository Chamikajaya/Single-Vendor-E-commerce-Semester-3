import query from "../config/db.js";
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
// completed
const getProducts = asyncHandler(async (req, res) => {
  // set the pagination
  const pageSize = 8; // * feel free to increase this val
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword ? req.query.keyword : ""; // this is to search for a product by name (case insensitive) needed to use regular expression

  const count = (
    await query(
      "SELECT COUNT(variant_id) as count FROM Product JOIN variant USING(product_id)",
      []
    )
  )[0].count; // get the all the product count
  // const products = await Product.find({ ...keyword })
  // .limit(pageSize)
  // .skip(pageSize * (page - 1));
  const products = await query(
    "SELECT * FROM Product JOIN variant USING(product_id) WHERE title LIKE ? ",
    [`%${keyword}%`]
  );
  const start = (page - 1) * pageSize;
  const end = pageSize * page;
  const pagedProducts = products.slice(start, end);
  res.json({ pagedProducts, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
// completed
const getProductById = asyncHandler(async (req, res) => {
  // todo : use sql query to get product by id
  const product = (
    await query(
      "SELECT * FROM Product JOIN Variant v USING(product_id) WHERE variant_id = ?",
      [req.params.id]
    )
  )[0];
  if (product) {
    return res.json(product);
  }
  res.status(404);
  throw new Error("Resource not found");
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
// completed
const getProductAttrById = asyncHandler(async (req, res) => {
  // todo : use sql query to get product by id
  const attrs = (
    await query("CALL get_attr_by_product_id(?)", [req.params.id])
  )[0];
  if (attrs) {
    return res.json(attrs);
  }
  res.status(404);
  throw new Error("Resource not found");
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
// TODO:
const createProduct = asyncHandler(async (req, res) => {
  // todo : modify the following fields if necessary (if it does not match with the ER diagram)
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });
  // const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
// TODO:
const updateProduct = asyncHandler(async (req, res) => {
  // TODO : USE SQL QUERY TO GET PRODUCT BY ID (Also get the appopriate data fields )
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  // const product = await Product.findById(req.params.id);

  // if (product) {
  //   product.name = name;
  //   product.price = price;
  //   product.description = description;
  //   product.image = image;
  //   product.brand = brand;
  //   product.category = category;
  //   product.countInStock = countInStock;

  //   // const updatedProduct = await product.save();
  //   res.json({});
  // } else {
  //   res.status(404);
  //   throw new Error("Product not found");
  // }
  res.json({});
});

// @desc    delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
// TODO:
const deleteProduct = asyncHandler(async (req, res) => {
  // TODO : USE SQL QUERY TO GET PRODUCT BY ID ( )
  // const product = await Product.findById(req.params.id);
  // if (product) {
  //   // todo : use sql query to delete product by id
  //   await Product.deleteOne({ _id: product._id });
  //   res.status(200).json({ message: "Product deleted successfully" });
  // } else {
  //   res.status(404);
  //   throw new Error("Product not found");
  // }

  res.json({});
});

// @desc    Get top rated products (to display in the carousel)
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  // todo : use sql query to get top rated products
  const products = await query(
    "SELECT * FROM Product JOIN Variant USING(product_id) ORDER BY product_id DESC LIMIT 10",
    []
  );

  res.json(products);
});

export {
  getProducts,
  getProductById,
  getProductAttrById,
  createProduct,
  updateProduct,
  deleteProduct,
  getTopProducts,
};
