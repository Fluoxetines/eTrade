import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name."],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Please enter product description."],
    },
    price: { type: Number, required: [true, "Please enter product price."] },
    stock: {
      type: Number,
      required: [true, "Please enter product stock."],
      default: 1,
    },
    image: [
      {
        id: { type: String },
        url: { type: String },
      },
    ],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Please select a category."],
    },
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
      required: [true, "Please select a brand."],
    },
    store: {
      type: mongoose.Schema.ObjectId,
      ref: "Store",
      required: [true, "Please select a store."],
    },
    ratings: { type: Number, default: 0 },
    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
      },
    ],
    addedBy: {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    },
    updatedBy: {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);
export default Product;
