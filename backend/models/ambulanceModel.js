import mongoose from "mongoose";

const ambulanceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
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

const Ambulance = mongoose.model("Ambulance", ambulanceSchema);

export default Ambulance;
