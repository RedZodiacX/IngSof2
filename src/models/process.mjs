import { Schema, model } from 'mongoose';
import { TYPE_OF_FILTERS, STATUS_TYPES } from '../commons/constans.mjs';

const filterSchema = new Schema(
  {
    name: String,
    status: {
      type: String,
      enum: STATUS_TYPES,
      default: 'in-progress',
      required: true,
    },
    imageUrl: String,
    message: String,
  },
);
const imageSchema = new Schema(
  {
    imageUrl: String,
    filters: [filterSchema],
  },
);
const processSchema = new Schema(
  {
    filters: {
      type: [
        {
          type: String,
          enum: TYPE_OF_FILTERS,
          required: true,
        },
      ],
    },
    images: [imageSchema],
  },
  {
    timestamps: true,
  },
);
const ProcessModel = model('Process', processSchema);
export default ProcessModel;
