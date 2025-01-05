import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import PhysiotherapyForm from "../models/physiotherapyFormModel.js";
import Product from "../models/productModel.js";

// @desc    Fetch all Health Packages
// @route   GET /api/alltests
// @access  Private/Admin

const getAllPhysiotherapyPackages = asyncHandler(async (req, res) => {
  const physiotherapypackages = await Product.find({
    productType: "physiotherapy-package",
  });

  res.json(physiotherapypackages);
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const createPhysiotherapyUser = asyncHandler(async (req, res) => {
  const {
    name,
    user_id,
    phone,
    physiotherapyId,
    types,
    age,

    address,
    gender,
    bloodGroup,
    image,
    diagnosis,
    department,
    dateFrom,
    dateTo,
    timeFrom,
    timeTo,
    concernDoctor,
    addPrescription,
    paymentMethod,
  } = req.body;
  console.log(req.body);

  // const userExists = await PhysiotherapyForm.findOne({ phone });

  // if (userExists) {
  //   res.status(400);
  //   throw new Error("User already exists");
  // }

  const physiotherapyForm = await PhysiotherapyForm.create({
    name,
    user_id,

    phone,
    physiotherapyId,
    types,
    age,

    address,
    gender,
    bloodGroup,
    image,
    diagnosis,
    department,
    dateFrom,
    dateTo,
    timeFrom,
    timeTo,
    concernDoctor,
    addPrescription,
    paymentMethod,
  });

  if (physiotherapyForm) {
    res.status(201).json({
      _id: physiotherapyForm._id,
      name: physiotherapyForm.name,
      user_id: physiotherapyForm.user_id,
      phone: physiotherapyForm.phone,

      types: physiotherapyForm.types,
      physiotherapyId: physiotherapyForm.physiotherapyId,
      age: physiotherapyForm.age,

      address: physiotherapyForm.address,
      gender: physiotherapyForm.gender,
      bloodGroup: physiotherapyForm.bloodGroup,
      image: physiotherapyForm.image,
      diagnosis: physiotherapyForm.diagnosis,
      department: physiotherapyForm.department,
      dateFrom: physiotherapyForm.dateFrom,
      dateTo: physiotherapyForm.dateTo,
      timeFrom: physiotherapyForm.timeFrom,
      timeTo: physiotherapyForm.timeTo,

      concernDoctor: physiotherapyForm.concernDoctor,
      addPrescription: physiotherapyForm.addPrescription,
      paymentMethod: physiotherapyForm.paymentMethod,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getPackageOrdersById = asyncHandler(async (req, res) => {
  const user = await PhysiotherapyForm.findById(
    "60031f5c5b54aa0eacac42b2"
  ).populate("user", "name  email");

  // const doctorsData = await PhysiotherapyForm.findOne({
  //   user_id: req.user._id,
  // }).populate("user_id", "email");

  // const testcategories = await PhysiotherapyForm.find({});
  res.json(user);
});

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateFormToPaid = asyncHandler(async (req, res) => {
  const physiotherapypayment = await Order.findById(req.params.id);
  console.log(physiotherapypayment);

  if (physiotherapypayment) {
    physiotherapypayment.isPaid = true;
    physiotherapypayment.paidAt = Date.now();

    const updatedPayment = await physiotherapypayment.save();

    res.json(updatedPayment);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export {
  createPhysiotherapyUser,
  getAllPhysiotherapyPackages,
  getPackageOrdersById,
  updateFormToPaid,
};
