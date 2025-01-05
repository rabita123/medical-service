import mongoose from "mongoose";

const medicineSchema = mongoose.Schema(
  {
    medicineNameCommercial: {
      type: String,
      required: true,
    },

    medicineNameGeneric: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      default: 0.0,
    },

    discountedPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },

    deliveryCost: {
      type: Number,
      required: true,
      default: 0.0,
    },
  },
  {
    timestamps: true,
  }
);

const Medicine = mongoose.model("Medicine", medicineSchema);

export default Medicine;
