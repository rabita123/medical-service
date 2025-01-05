import mongoose from "mongoose";

const nursingpackageSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    service_charge: {
      type: String,
      required: true,
    },
    working_hour: {
      type: String,
      required: true,
    },

    price: {
      type: String,
      required: true,
    },
    package_type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const NursingPackage = mongoose.model("NursingPackage", nursingpackageSchema);

export default NursingPackage;
