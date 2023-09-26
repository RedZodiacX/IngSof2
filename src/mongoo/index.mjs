import mongoose from 'mongoose';

export const starConnection = async () => {
  const url = encodeURI('mongodb+srv://andres:Contraseña1234@bdprueba.552k2pn.mongodb.net/?retryWrites=true&w=majority');
  await mongoose.connect(url);
};

export default starConnection;
