import ProcessModel from '../models/process.mjs';

class ProcessRepository {
  // eslint-disable-next-line class-methods-use-this
  async save(process) {
    const newProcess = new ProcessModel();
    newProcess.filters = process.filters;
    await newProcess.save();
    return newProcess;
  }
}
export default ProcessRepository;
