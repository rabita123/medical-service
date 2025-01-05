import mongoose from "mongoose";

const testSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "TestCategory",
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    preparation: {
      type: String,
      required: false,
    },
    duration: {
      type: Number, // in minutes
      required: true,
      default: 30,
    },
    report_time: {
      type: Number, // in hours
      required: true,
      default: 24,
    },
    is_available: {
      type: Boolean,
      required: true,
      default: true,
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

const Test = mongoose.model("Test", testSchema);

export default Test;
