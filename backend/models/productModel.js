import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    commercialName: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },

    productType: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },

    nursingPackageType: {
      type: String,
      required: false,
    },

    workHour: {
      type: String,
      required: false,
    },

    healthTestCategories: {
      type: String,
      required: false,
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    discount: {
      type: Number,
      required: false,
      default: 0,
    },

    // countInStock: {
    //   type: Number,
    //   required: true,
    //   default: 0,
    // },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);

export default Product;
