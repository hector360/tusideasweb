const Mensajes = require('../database/models/Mensajes');
const SalasChat = require('../database/models/SalasChat');

exports.getMensajes = async(req,res,next)=>{
    try{
        const mensajes = await Mensajes.findAll({
            where:{sala: req.body.sala}
        });
        res.json(mensajes);
    }catch(err){
        console.log(err);
        next();
    }
}

exports.createSala = async(req,res,next)=>{
    function windowGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : r & 0x3 | 0x8;
            return v.toString(16);
        });
    }

    try{

    //     sala: DataTypes.STRING,
    // idAdministrador: DataTypes.INTEGER,
    // usuario: DataTypes.STRING,
        
        const sala = await SalasChat.findAll({
            where:{usuario: req.body.usuario}
        });
        // console.log(sala)
        if(sala.length == 0){
            var nuevaSala = await SalasChat.create({
                sala: windowGuid(),
                idAdministrador: 1,
                usuario: req.body.usuario
            });
            console.log(sala)
            console.log("se creo la sala")
            var mensaje = "creoSala";
            
        }else{
            console.log("ya hay sala")
            var mensaje = "yahaySala";
            var nuevaSala = sala[0];
        }
        res.json({mensaje: mensaje, sala: nuevaSala});
    }catch(err){
        console.log(err);
        next();
    }
}
exports.getSalas = async(req,res,next)=>{
    try{
        const sala = await SalasChat.findAll();
        res.json(sala);
    }catch(err){
        console.log(err);
        next();
    }
}



