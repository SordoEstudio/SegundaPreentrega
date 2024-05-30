import { Schema, model } from "mongoose";

export const productCollectionName = "products";

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String },
  code: { type: String, required: true },
  stock: { type: Number, required: true },
});

export const ProductModel = model(productCollectionName, productSchema);
