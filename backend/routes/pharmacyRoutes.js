import express from 'express';
import multer from 'multer';
import path from 'path';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  getMedications,
  getMedicationById,
  createMedication,
  updateMedication,
  deleteMedication,
  createPrescriptionOrder,
  getPrescriptionOrders,
  getPrescriptionOrderById,
  updatePrescriptionOrderStatus,
} from '../controllers/pharmacyController.js';

const router = express.Router();

// Configure multer for prescription image uploads
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/prescriptions/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// Medication routes
router.route('/medications')
  .get(getMedications)
  .post(protect, admin, createMedication);

router.route('/medications/:id')
  .get(getMedicationById)
  .put(protect, admin, updateMedication)
  .delete(protect, admin, deleteMedication);

// Prescription order routes
router.route('/prescriptions')
  .get(protect, admin, getPrescriptionOrders)
  .post(protect, upload.single('prescriptionImage'), createPrescriptionOrder);

router.route('/prescriptions/:id')
  .get(protect, getPrescriptionOrderById)
  .put(protect, admin, updatePrescriptionOrderStatus);

// Prescription Order Routes
router.route('/prescription-orders')
  .post(protect, createPrescriptionOrder)
  .get(protect, getPrescriptionOrders);

router.route('/prescription-orders/:id')
  .get(protect, getPrescriptionOrderById);

router.route('/prescription-orders/:id/status')
  .put(protect, admin, updatePrescriptionOrderStatus);

export default router; 