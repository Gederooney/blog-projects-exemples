import mongoose, { Schema, model } from 'mongoose';
import BrandsModel from './Brands.mjs';

const ProductsDetailListByBrandSchema = new Schema({
  brandName: {
    type: String,
    required: true,
    unique: true,
  },
  brandId: {
    type: Schema.Types.ObjectId,
    ref: BrandsModel,
    required: true,
  },
  productsDetails: {
    type: Array,
    required: true,
    default: [],
  },
});

const ProductsDetailListByBrandModel =
  mongoose.models.ProductsDetailListByBrand ||
  model('ProductsDetailListByBrand', ProductsDetailListByBrandSchema);

export default ProductsDetailListByBrandModel;
