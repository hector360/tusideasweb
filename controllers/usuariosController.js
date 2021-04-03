const Usuarios = require('../database/models/Usuario');
// const TipoUsuario = require('../database/models/TipoUsuario');
const bcrypt = require('bcrypt');


const idEmpleadoTemporal = "2";

exports.getUsuarios = async(req,res)=>{
    try{
        const usuarios = await Usuarios.findAll();
        var data = [];
        for(var i = 0; i < usuarios.length; i++){
            const tipoUsuario = await TipoUsuario.findAll({
                where:{
                    id: usuarios[i].idTipoUsuario
                }
            });
            data.push({

                "email": usuarios[i].email,
                "nombre": usuarios[i].nombre,
                "password": usuarios[i].password,
                // "IdTipoUsuario": usuarios[i].IdTipoUsuario,
                "tipoUsuario": tipoUsuario[0].nombre
            });
        }
        res.json(data);
    }catch(err){
        console.log(err);
        next();
    }
}


exports.crearCuentaPrivada = async(req,res)=>{
    //leer los datos del usuario
    var idTipoUsuario;
    if(req.body.idTipoUsuario == "Empleado"){
        //id del administrador
        idTipoUsuario = idEmpleadoTemporal
    }else{
        //id del empleado
        idTipoUsuario = "1"
    }

    try{
        var nuevaPassword = await bcrypt.hash(req.body.password, 12);
        const usuario = await Usuarios.create({
        
            email: req.body.email,
            nombre: req.body.nombre,
            password: nuevaPassword,
            idTipoUsuario: idTipoUsuario
        });
        


        res.json({mensaje: usuario});

    }catch(error){
        console.log(error);
        res.json({mensaje: 'Hubo un error'});
    }
}

exports.crearTipoUsuario = async(req,res,next)=>{
    
    try{
        const tipoUsuario = await TipoUsuario.create(req.body);
        res.json({mensaje: "Se creo el tipo usuario correctamente", response: tipoUsuario})
    }catch(err){
        console.log(err);
        next();
    }
}

exports.getMaestros = async(req,res)=>{
    try{
        const usuarios = await Usuarios.findAll({
            where:{
                idTipoUsuario: idEmpleadoTemporal
            }
        });
        res.json(usuarios);
    }catch(err){
        console.log(err);
        next();
    }
}

exports.signup = async(req,res)=>{
    try{
        const usuarios = await Usuarios.findAll({
            where:{
                idTipoUsuario: idEmpleadoTemporal
            }
        });
        res.json(usuarios);
    }catch(err){
        console.log(err);
        next();
    }
}

