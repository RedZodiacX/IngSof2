import mongoose from "mongoose"

export const starConnection = async () => {
    const url = encodeURI("mongodb+srv://andres:Contraseña123@bdprueba.552k2pn.mongodb.net/?retryWrites=true&w=majority")
    await mongoose.connect(url)
}