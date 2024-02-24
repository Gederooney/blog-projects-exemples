import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';
import BrandsModel from './Brands.mjs';

const ProductsListByBrandSchema = new Schema({
  brandName: {
    type: String,
    required: true,
  },
  brandId: {
    type: mongoose.Schema.ObjectId,
    ref: BrandsModel,
    required: true,
  },
  products: {
    type: Array,
    required: true,
    default: [],
  },
});

const ProductsListByBrandModel =
  mongoose.models.ProductsListByBrand ||
  model('ProductsListByBrand', ProductsListByBrandSchema);

export default ProductsListByBrandModel;
