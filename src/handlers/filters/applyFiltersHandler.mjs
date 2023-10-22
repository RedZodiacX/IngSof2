import Boom from '@hapi/boom';
import HttpStatusCode from 'http-status-codes';
// import applyFilters from '../../controllers/filters/applyFilters.mjs';

const applyFiltersHandler = async (req, res, next) => {
  try {
    const { body } = req;
    const response = await req.container.processService
      .applyFilters({ ...body, images: req.files });
    return res.status(HttpStatusCode.OK).json(response);
  } catch (error) {
    const err = Boom.isBoom(error) ? error : Boom.internal(error);
    return next(err);
  }
};
export default applyFiltersHandler;
