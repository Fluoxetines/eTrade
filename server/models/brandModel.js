import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter brand name."],
      trim: true,
      unique: [true, "This brand is exists."],
    },
    description: {
      type: String,
      required: [true, "Please enter brand description."],
    },
    addedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    discontinued: { Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Brand = mongoose.model("Brand", brandSchema);
export default Brand;
