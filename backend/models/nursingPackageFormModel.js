import mongoose from "mongoose";

const nursingpackageFormSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    nursingPackageId: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      required: false,
    },
    bloodGroup: {
      type: String,
      required: false,
    },

    diagnosis: {
      type: String,
      required: true,
    },

    concernDoctor: {
      type: String,
      required: true,
    },

    addPrescription: {
      type: String,
      required: true,
    },

    paymentMethod: {
      type: String,
      required: true,
    },

    promoCode: {
      type: String,
      required: true,
    },

    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
const NursingPackageForm = mongoose.model(
  "NursingPackageForm",
  nursingpackageFormSchema
);

export default NursingPackageForm;
