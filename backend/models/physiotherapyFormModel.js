import mongoose from "mongoose";

const physiotherapyFormSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    physiotherapyId: {
      type: String,
      required: true,
    },

    types: {
      type: String,
      required: true,
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
      required: false,
    },
    department: {
      type: String,
      required: false,
    },
    dateFrom: {
      type: String,
      required: false,
    },

    dateTo: {
      type: String,
      required: false,
    },

    timeFrom: {
      type: String,
      required: false,
    },

    timeTo: {
      type: String,
      required: false,
    },

    concernDoctor: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: false,
    },

    paymentMethod: {
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
const PhysiotherapyForm = mongoose.model(
  "PhysiotherapyForm",
  physiotherapyFormSchema
);

export default PhysiotherapyForm;
