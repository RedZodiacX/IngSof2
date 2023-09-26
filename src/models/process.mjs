import { Schema, model } from 'mongoose';
import { TRYPE_OF_FILTERS } from '../commons/constans.mjs';

const processSchema = new Schema(
  {
    filters: {
      type: [
        {
          type: String,
          enum: TRYPE_OF_FILTERS,
          required: true,
        },
      ],
    },
  },
  {
    timestamps: true,
  },
);

const processModel = model('process', processSchema);

export default processModel;
