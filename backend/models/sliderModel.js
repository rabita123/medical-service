import mongoose from "mongoose";

const sliderSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Slider = mongoose.model("Slider", sliderSchema);

export default Slider;
