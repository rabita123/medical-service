import mongoose from "mongoose";

const emergencyDoctorSchema = mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    textdetails: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const EmergencyDoctor = mongoose.model(
  "EmergencyDoctor",
  emergencyDoctorSchema
);

export default EmergencyDoctor;
