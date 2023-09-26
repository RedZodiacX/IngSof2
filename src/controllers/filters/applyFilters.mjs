import Joi from 'joi';
import Boom from '@hapi/boom';
import HttpStatusCode from 'http-status-codes';
import process from '../../models/process.mjs';

const payloadValidation = Joi.object({
  filters: Joi.array().min(1).items(Joi.string().valid(NEGATIVE_FILTER, GREYSCALE_FILTER, BLUR_FILTER)),
});

const applyFilters = async (payload) => {
  try {
    await payloadValidation.validateAsync(payload);
  } catch (error) {
    throw Boom.badData(error.message, { error });
  }
  const newProcess = new process();
  newProcess.filters = payload.filters;
  await newProcess.save();
  return newProcess;
};

export default applyFilters;
