import { Schema, model } from "mongoose";

export const cartCollectionName = "carts";

const cartSchema = new Schema({
  products: [{ 
    type: Schema.Types.ObjectId, 
    ref: "products", 
    default: [] 
}],
});

export const CartModel = model(cartCollectionName, cartSchema);
