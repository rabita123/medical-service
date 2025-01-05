import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc    Fetch all Packages
// @route   GET /api/packagelists
// @access  Private/Admin

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Fetch all Medicines
// @route   GET /api/medicines
// @access  Private/Admin

const getAllMedicines = asyncHandler(async (req, res) => {
  const medicines = await Product.find({
    productType: "medicine",
  });

  res.json(medicines);
});

const updateValue = asyncHandler(async (req, res) => {
  const values = await Product.findById(req.params.id);

  if (values) {
    values.__v = 1;

    const updatedValue = await values.save();

    res.json(updatedValue);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Fetch all Health Tests
// @route   GET /api/alltests
// @access  Private/Admin

const getAllTests = asyncHandler(async (req, res) => {
  const tests = await Product.find({
    productType: "health-test",
  });

  res.json(tests);
});

// const getAllTestsById = asyncHandler(async (req, res) => {
//   const tests = await Product.find({
//     productType: "health-test",
//     _id: req.params._id,
//   });
//   console.log(req.params._id);
//   res.json(alltestsbyid);
// });

// @desc    Fetch all Tests by ID
// @route   GET /api/alltests/:id
// // @access  Public
// const getAllTestsById = asyncHandler(async (req, res) => {
//   const alltestsbyid = await Product.findById(req.params.id);
//   console.log(req.params._id);
//   res.json(alltestsbyid);
// });

const getAllTestsById = asyncHandler(async (req, res) => {
  const alltestsbyid = await Product.find({
    healthTestCategories: req.params.id,
  });
  console.log(req.params._id);
  res.json(alltestsbyid);
});

// @desc    Fetch all Health Packages
// @route   GET /api/alltests
// @access  Private/Admin

const getAllHealthPackages = asyncHandler(async (req, res) => {
  const healthpackages = await Product.find({
    productType: "health-package",
  });

  res.json(healthpackages);
});

// @desc    Fetch all Health Packages
// @route   GET /api/alltests
// @access  Private/Admin

const getAllNursingPackages = asyncHandler(async (req, res) => {
  const nursingpackages = await Product.find({
    productType: "nursing-package",
  });

  res.json(nursingpackages);
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    commercialName,

    image,
    productType,
    description,

    nursingPackageType,
    workHour,
    healthTestCategories,
    price,
    discount,
  } = req.body;

  // const packages = new Package({
  //   title: req.title,
  //   image: req.image,
  // });
  const createdProduct = await Product.create({
    name,
    commercialName,
    user: req.user._id,
    image,
    productType,
    description,

    nursingPackageType,
    workHour,
    healthTestCategories,
    price,
    discount,
  });

  // const createdPackage = await packages.save();
  res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    commercialName,
    price,
    discount,
    description,
    image,
    healthTestCategories,
  } = req.body;

  const products = await Product.findById(req.params.id);

  if (products) {
    products.name = name;
    products.commercialName = commercialName;
    products.price = price;
    products.discount = discount;
    products.description = description;
    products.image = image;
    products.healthTestCategories = healthTestCategories;

    const updatedProduct = await products.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Delete a package
// @route   DELETE /api/packagelists/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const productlist = await Product.findById(req.params.id);

  if (productlist) {
    await productlist.remove();
    res.json({ message: "Package removed" });
  } else {
    res.status(404);
    throw new Error("Package not found");
  }
});

export {
  getAllProducts,
  getAllMedicines,
  getAllTests,
  getAllTestsById,
  getAllHealthPackages,
  deleteProduct,
  createProduct,
  getProductById,
  getAllNursingPackages,
  updateProduct,
  updateValue,
};
