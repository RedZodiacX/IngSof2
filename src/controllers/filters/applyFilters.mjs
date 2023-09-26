import Joi from 'joi';
import Boom from '@hapi/boom';
// eslint-disable-next-line
import HttpStatusCode from 'http-status-codes';
import Process from '../../models/process.mjs';
import { GREYSCALE_FILTER, BLUR_FILTER, NEGATIVE_FILTER } from '../../commons/constans.mjs';

const payloadValidation = Joi.object({
  filters: Joi.array()
    .min(1)
    .items(Joi.string().valid(NEGATIVE_FILTER, GREYSCALE_FILTER, BLUR_FILTER)),
});

const applyFilters = async (payload) => {
  try {
    await payloadValidation.validateAsync(payload);
  } catch (error) {
    throw Boom.badData(error.message, { error });
  }
  const newProcess = new Process();
  newProcess.filters = payload.filters;
  await newProcess.save();
  return newProcess;
};

export default applyFilters;
