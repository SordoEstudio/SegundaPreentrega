import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'
export const cartCollectionName = "carts";

const cartSchema = new Schema({
  products: [
    { 
    _id:false,
    quantity:{
      type : Number,
      default : 1
    },
    product:{
      type: Schema.Types.ObjectId, 
      ref: "products", 
    }
}],
});
cartSchema.plugin(mongoosePaginate)

export const CartModel = model(cartCollectionName, cartSchema);
