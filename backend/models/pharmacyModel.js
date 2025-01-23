import mongoose from 'mongoose';

const medicationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    requiresPrescription: {
      type: Boolean,
      required: true,
      default: false,
    },
    inStock: {
      type: Boolean,
      required: true,
      default: true,
    },
    stockQuantity: {
      type: Number,
      required: true,
      default: 0,
    },
    manufacturer: {
      type: String,
      required: true,
    },
    dosageForm: {
      type: String,
      required: true,
    },
    strength: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const prescriptionOrderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    medication: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Medication',
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    prescriptionImage: {
      type: String,
      required: function() {
        return this.medication && this.medication.requiresPrescription;
      },
    },
    prescriptionStatus: {
      type: String,
      required: true,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Medication = mongoose.model('Medication', medicationSchema);
const PrescriptionOrder = mongoose.model('PrescriptionOrder', prescriptionOrderSchema);

export { Medication, PrescriptionOrder }; 