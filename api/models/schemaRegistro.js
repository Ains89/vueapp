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


const registroSchema = new mongoose.Schema({
    nombre: String,
    correo: {
        type: String,
        unique: true
    },
    password: String
})
const Registro = mongoose.model('registroUsuarios', registroSchema)

export default Registro


