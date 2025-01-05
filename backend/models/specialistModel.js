import mongoose from "mongoose";

const specialistSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // image: {
    //   type: String,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);
const Specialist = mongoose.model("Specialist", specialistSchema);

export default Specialist;
