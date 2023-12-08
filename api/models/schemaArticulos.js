import mongoose from 'mongoose'

// Creamos la funcion conectar
async function conectarBD() {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/local');
        console.log('Se conecto a MongoDB');
    }
    catch (error){
        console.error('No se conectó a MongoDB', error)
    }
}
// Llamada a la funcion conectar
conectarBD()


const articulosSchema = new mongoose.Schema({
    nombre: String,
    precio: String,
    fecha: String,
    stock: String

})
const Articulo = mongoose.model('articulos', articulosSchema)

export default Articulo;
