import express from "express";
import { isAdmin, isAuth } from "../helpers/auth.js";
import Product from "../models/productModel.js";
import cloudinary from "../utils/cloudinary.js";

const productController = express.Router();

productController.get("/", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

productController.post("/", isAuth, isAdmin, async (req, res) => {
  const {
    name,
    description,
    image,
    rating,
    price,
    brand,
    category,
    countInStock,
  } = req.body;
  try {
    if (image) {
      const uploadedResponse = await cloudinary.uploader.upload(image, {
        folder: "eTrade/product",
      });
      if (uploadedResponse) {
        const product = new Product({
          name,
          description,
          rating,
          price,
          brand,
          category,
          countInStock,
          image: uploadedResponse,
        });
        const saveProduct = await product.save();
        res.status(200).send(saveProduct);
      }
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

productController.put("/:id", async (req, res) => {
  const { image } = req.body;
  const productId = req.params.id;
  const product = await Product.findById(productId);
  const uploadedResponse = await cloudinary.uploader.upload(image, {
    folder: "eTrade/product",
  });
  if (product) {
    product.name = req.body.name;
    product.description = req.body.description;
    product.rating = req.body.rating;
    product.price = req.body.price;
    product.image = uploadedResponse;
    product.brand = req.body.brand;
    product.category = req.body.category;
    product.countInStock = req.body.countInStock;

    await product.save();
    res.status(200).send({ message: "Product updated successfully" });
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

productController.delete("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.send({ message: "Product Deleted" });
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

productController.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.status(200).send(product);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});
