import mongoose from "mongoose";

const testcategorySchema = mongoose.Schema(
  {
    category_name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const TestCategory = mongoose.model("TestCategory", testcategorySchema);

export default TestCategory;
