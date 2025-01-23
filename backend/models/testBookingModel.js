import mongoose from "mongoose";

const testBookingSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    test: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Test",
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    patientName: {
      type: String,
      required: true,
    },
    patientEmail: {
      type: String,
      required: true,
    },
    patientPhone: {
      type: String,
      required: true,
    },
    patientAge: {
      type: Number,
      required: true,
    },
    patientGender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"],
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const TestBooking = mongoose.model("TestBooking", testBookingSchema);

export default TestBooking; 