import ProcessService from '../services/ProcessService.mjs';
import ProcessRepository from '../repositories/ProcessRepository.mjs';
import MinioService from '../services/MinioService.mjs';

const buildContainer = (req, _res, next) => {
  const container = {};
  const processRepository = new ProcessRepository();
  const minioService = new MinioService();
  const processService = new ProcessService({ processRepository, minioService });
  container.processService = processService;
  req.container = container;
  return next();
};

export default buildContainer;
