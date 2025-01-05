import mongoose from "mongoose";

const doctorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    fees: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    degree: {
      type: String,
      required: false,
    },

    specialization: {
      type: String,
      required: false,
    },
    days: {
      type: String,
      required: false,
    },

    times: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
