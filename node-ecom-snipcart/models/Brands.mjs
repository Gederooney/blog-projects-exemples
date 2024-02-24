import mongoose, { Schema, model } from 'mongoose';

const BrandsSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  mainColor: {
    type: String,
    required: true,
  },
  textColor: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  configs: {
    type: String,
    required: true,
  },
  backend: {
    isClassAvailable: {
      type: Boolean,
      required: true,
    },
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastUpdate: {
    type: Date,
    default: Date.now,
  },
});

const BrandsModel = mongoose.models.Brands || model('Brands', BrandsSchema);

export default BrandsModel;
