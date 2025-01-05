import asyncHandler from "express-async-handler";
import NursingPackage from "../models/nursingPackageModel.js";
import NursingPackageForm from "../models/nursingPackageFormModel.js";
// @desc    Fetch all Nursing Packages
// @route   GET /api/allnursingpackages
// @access  Private/Admin

const getNursingPackages = asyncHandler(async (req, res) => {
  const nursingpackages = await NursingPackage.find({});

  // findOne({}, { sort: { _id: -1 }, limit: 1 });
  // const nursingpackages = await NursingPackageForm.findOne({}).sort({
  //   _id: -1,
  //   limit: 1,
  // });

  res.json(nursingpackages);
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const nursingUserFormData = asyncHandler(async (req, res) => {
  const {
    name,
    nursingPackageId,
    phone,
    age,

    address,
    gender,
    bloodGroup,
    diagnosis,
    concernDoctor,
    addPrescription,
    paymentMethod,
    promoCode,
  } = req.body;
  console.log(req.body);

  const userExists = await NursingPackageForm.findOne({ phone });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const nursingForm = await NursingPackageForm.create({
    name,
    nursingPackageId,
    phone,
    age,
    address,
    gender,
    bloodGroup,
    diagnosis,
    concernDoctor,
    addPrescription,
    paymentMethod,
    promoCode,
  });

  if (nursingForm) {
    res.status(201).json({
      _id: nursingForm._id,
      name: nursingForm.name,
      nursingPackageId: nursingForm.nursingPackageId,
      phone: nursingForm.phone,
      age: nursingForm.age,
      address: nursingForm.address,
      gender: nursingForm.gender,
      bloodGroup: nursingForm.bloodGroup,
      diagnosis: nursingForm.diagnosis,
      concernDoctor: nursingForm.concernDoctor,
      addPrescription: nursingForm.addPrescription,
      paymentMethod: nursingForm.paymentMethod,
      promoCode: nursingForm.promoCode,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Fetch Tests By Category
// @route   GET /api/allnursingpackages/:id
// @access  Public
const getNursingPackagesByType = asyncHandler(async (req, res) => {
  const testsbycategory = await NursingPackage.find({
    package_type: req.params.id,
  });

  console.log(testsbycategory);
  if (testsbycategory) {
    res.json(testsbycategory);
  } else {
    res.status(404);
    throw new Error("Test not found");
  }
});

// @desc    Fetch all Tests by ID
// @route   GET /api/alltests/:id
// @access  Public
const getPackagesLists = asyncHandler(async (req, res) => {
  // const nursingpackagesbyid = await NursingPackageForm.findById(req.params.id);

  // findById(req.params.id).populate(
  //   "user",
  //   "name email"
  // );

  // const nursingpackagesbyid = await NursingPackageForm.aggregate([
  //   {
  //     $lookup: {
  //       from: "nursingpackages",
  //       localField: "5fe8319136c7d645189c16d9",
  //       foreignField: "nursingPackageId",
  //       as: "service_charge",
  //     },
  //   },
  // ]);

  const nursingpackagesbyid = await NursingPackageForm.findOne({}).sort({
    _id: -1,
    limit: 1,
  });

  // console.log(req.params.id);
  res.json(nursingpackagesbyid);
});

const getPackagesDataById = asyncHandler(async (req, res) => {
  const nursingpackagesdatabyid = await NursingPackage.findById(req.params.id);

  res.json(nursingpackagesdatabyid);
});

export {
  getNursingPackages,
  getNursingPackagesByType,
  nursingUserFormData,
  getPackagesLists,
  getPackagesDataById,
};
