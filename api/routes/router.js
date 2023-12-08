import { Router } from "express";
import  Registro from '../models/schemaRegistro.js';
import Articulos from '../models/schemaArticulos.js'

const router = Router()



router.post('/registrar', async (req, res) =>{
    try{
        const {nombre, correo, password} = req.body
    
        const registroUsuarios = new Registro({
            nombre,
            correo,
            password
        })
        await registroUsuarios.save()
        res.status(200).json({ message: 'Usuario registrado correctamente' });
    }
    catch(error){
        res.status(500).json({error : 'Error al agregar un nuevo usuario'})
    }
})




router.post('/iniciar', async (req, res) =>{
    try{
        const {correo, password} = req.body;

        // buscamos el usuarios por medio del correo
        const usuario = await Registro.findOne({correo})
        
        //validamos las contraseñas
        if(password == usuario.password){
            let isLogin = true;
            res.json({verificar: isLogin})
        }
        else{
            res.json({ error: 'Correo o contraseña incorrectos' })
        }
    }
    catch(error){
        res.status(500).json({ error: 'Error al iniciar sesión'});
    }
})


router.post('/insert', async (req, res) =>{
    try{
        const {nombre, precio, fecha, stock} = req.body;

        const insertarArticulo = new Articulos ({
            nombre,
            precio,
            fecha,
            stock
        })
        await insertarArticulo.save()
        res.status(200).json({ message: 'Articulo registrado correctamente' });
    }   
    catch(error){
        res.status(500).json({error : 'Error al agregar un nuevo articulo'})
    }
})


router.get('/home', async (req, res) =>{
    const articulos = await Articulos.find()
    res.json({art: articulos})
})


router.delete('/eliminar', async (req, res) =>{
    try{
        const {id} = req.body;
        const eliminar = await Articulos.findByIdAndDelete(id)

        if(!eliminar){
            res.status(404).json({error: 'Articulo no encontrado'})
        }
        res.status(200).json({ message: 'Articulo eliminado correctamente' });
        
    }
    catch(error){
        res.status(500).json({error: 'Error al eliminar Articulo'})

    }
})


router.put('/actualizar', async (req, res) =>{
    try{
        const {id, nombre, precio, fecha, stock} = req.body;

        const actualizar = await Articulos.findByIdAndUpdate(
            id,
            {
                nombre,
                precio,
                fecha,
                stock
            },
            {new: true}
        );
        if(!actualizar) {
            return res.status(404).json({ error: 'Articulo no encontrado' });
        }

    }
    catch(error){
        res.status(500).json({ error: 'Error al actualizar el Articulo' });
    }
})


export default router;