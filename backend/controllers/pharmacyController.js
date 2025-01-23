import asyncHandler from 'express-async-handler';
import { Medication, PrescriptionOrder } from '../models/pharmacyModel.js';
import path from 'path';
import fs from 'fs';

// @desc    Get all medications
// @route   GET /api/pharmacy/medications
// @access  Public
const getMedications = asyncHandler(async (req, res) => {
  try {
    const medications = await Medication.find({});
    res.json(medications);
  } catch (error) {
    console.error('Error in getMedications:', error);
    res.status(500).json({
      message: 'Error fetching medications',
      error: error.message
    });
  }
});

// @desc    Get medication by ID
// @route   GET /api/pharmacy/medications/:id
// @access  Public
const getMedicationById = asyncHandler(async (req, res) => {
  try {
    const medication = await Medication.findById(req.params.id);
    if (medication) {
      res.json(medication);
    } else {
      res.status(404);
      throw new Error('Medication not found');
    }
  } catch (error) {
    console.error('Error in getMedicationById:', error);
    res.status(404).json({
      message: 'Medication not found',
      error: error.message
    });
  }
});

// @desc    Create a medication
// @route   POST /api/pharmacy/medications
// @access  Private/Admin
const createMedication = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      price,
      requiresPrescription,
      stockQuantity,
      manufacturer,
      dosageForm,
      strength,
      image,
    } = req.body;

    // Validate required fields
    if (!name || !description || !category || !price || !manufacturer || !dosageForm || !strength) {
      res.status(400);
      throw new Error('Please fill in all required fields');
    }

    // Check if medication already exists
    const medicationExists = await Medication.findOne({ name });
    if (medicationExists) {
      res.status(400);
      throw new Error('Medication already exists');
    }

    // Create medication
    const medication = new Medication({
      name,
      description,
      category,
      price,
      requiresPrescription: requiresPrescription || false,
      inStock: stockQuantity > 0,
      stockQuantity: stockQuantity || 0,
      manufacturer,
      dosageForm,
      strength,
      image: image || '/images/default-medication.jpg',
    });

    const createdMedication = await medication.save();
    res.status(201).json(createdMedication);
  } catch (error) {
    console.error('Error in createMedication:', error);
    res.status(400).json({
      message: 'Error creating medication',
      error: error.message
    });
  }
});

// @desc    Update a medication
// @route   PUT /api/pharmacy/medications/:id
// @access  Private/Admin
const updateMedication = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      price,
      requiresPrescription,
      stockQuantity,
      manufacturer,
      dosageForm,
      strength,
      image,
    } = req.body;

    const medication = await Medication.findById(req.params.id);

    if (medication) {
      medication.name = name || medication.name;
      medication.description = description || medication.description;
      medication.category = category || medication.category;
      medication.price = price || medication.price;
      medication.requiresPrescription = requiresPrescription ?? medication.requiresPrescription;
      medication.stockQuantity = stockQuantity ?? medication.stockQuantity;
      medication.inStock = stockQuantity > 0;
      medication.manufacturer = manufacturer || medication.manufacturer;
      medication.dosageForm = dosageForm || medication.dosageForm;
      medication.strength = strength || medication.strength;
      medication.image = image || medication.image;

      const updatedMedication = await medication.save();
      res.json(updatedMedication);
    } else {
      res.status(404);
      throw new Error('Medication not found');
    }
  } catch (error) {
    console.error('Error in updateMedication:', error);
    res.status(404).json({
      message: 'Error updating medication',
      error: error.message
    });
  }
});

// @desc    Delete a medication
// @route   DELETE /api/pharmacy/medications/:id
// @access  Private/Admin
const deleteMedication = asyncHandler(async (req, res) => {
  try {
    const medication = await Medication.findById(req.params.id);

    if (medication) {
      await medication.remove();
      res.json({ message: 'Medication removed' });
    } else {
      res.status(404);
      throw new Error('Medication not found');
    }
  } catch (error) {
    console.error('Error in deleteMedication:', error);
    res.status(404).json({
      message: 'Error deleting medication',
      error: error.message
    });
  }
});

// @desc    Create a new prescription order
// @route   POST /api/pharmacy/prescription-orders
// @access  Private
const createPrescriptionOrder = asyncHandler(async (req, res) => {
  const {
    medication,
    quantity,
    shippingAddress,
  } = req.body;

  // Handle prescription image upload
  if (!req.files || !req.files.prescriptionImage) {
    res.status(400);
    throw new Error('Prescription image is required');
  }

  const prescriptionImage = req.files.prescriptionImage;
  const uploadPath = path.join(__dirname, '../../uploads/prescriptions');

  // Create directory if it doesn't exist
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const fileName = `${Date.now()}-${prescriptionImage.name}`;
  await prescriptionImage.mv(path.join(uploadPath, fileName));

  const order = new PrescriptionOrder({
    user: req.user._id,
    medication,
    quantity,
    prescriptionImage: fileName,
    shippingAddress: JSON.parse(shippingAddress),
    status: 'pending',
  });

  const createdOrder = await order.save();

  res.status(201).json(createdOrder);
});

// @desc    Get all prescription orders
// @route   GET /api/pharmacy/prescription-orders
// @access  Private
const getPrescriptionOrders = asyncHandler(async (req, res) => {
  const orders = await PrescriptionOrder.find({})
    .populate('user', 'id name')
    .populate('medication', 'name price');
  res.json(orders);
});

// @desc    Get prescription order by ID
// @route   GET /api/pharmacy/prescription-orders/:id
// @access  Private
const getPrescriptionOrderById = asyncHandler(async (req, res) => {
  const order = await PrescriptionOrder.findById(req.params.id)
    .populate('user', 'name email')
    .populate('medication', 'name price');

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update prescription order status
// @route   PUT /api/pharmacy/prescription-orders/:id/status
// @access  Private/Admin
const updatePrescriptionOrderStatus = asyncHandler(async (req, res) => {
  const order = await PrescriptionOrder.findById(req.params.id);

  if (order) {
    order.status = req.body.status || order.status;
    order.note = req.body.note || order.note;

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

export {
  getMedications,
  getMedicationById,
  createMedication,
  updateMedication,
  deleteMedication,
  createPrescriptionOrder,
  getPrescriptionOrders,
  getPrescriptionOrderById,
  updatePrescriptionOrderStatus,
}; 