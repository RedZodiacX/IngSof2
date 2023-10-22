import { Schema, model } from 'mongoose';
import { TYPE_OF_FILTERS } from '../commons/constans.mjs';

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
  },
  {
    timestamps: true,
  },
);

const ProcessModel = model('Process', processSchema);

export default ProcessModel;
