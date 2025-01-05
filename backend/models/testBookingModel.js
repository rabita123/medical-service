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
    status: {
      type: String,
      required: true,
      default: "Pending",
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
    },
    paymentStatus: {
      type: String,
      required: true,
      default: "Pending",
      enum: ["Pending", "Completed", "Failed"],
    },
    price: {
      type: Number,
      required: true,
    },
    patientName: {
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
      enum: ["Male", "Female", "Other"],
    },
    patientPhone: {
      type: String,
      required: true,
    },
    patientEmail: {
      type: String,
      required: true,
    },
    reportUrl: {
      type: String,
      required: false,
    },
    notes: {
      type: String,
      required: false,
    },
    cancellationReason: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const TestBooking = mongoose.model("TestBooking", testBookingSchema);

export default TestBooking; 