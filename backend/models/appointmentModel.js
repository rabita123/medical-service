import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    doctor_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Doctor",
    },

    appointmentDate: {
      type: String,
      required: false,
    },
    appointmentTime: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
