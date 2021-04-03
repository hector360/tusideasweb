const Contacto = require('../database/models/Contacto');

exports.mandarContacto = async(req,res)=>{
    
    

    try{
        
        const contacto = await Contacto.create({
 
            nombrescontacto: req.body.nombrescontacto,
            correo: req.body.correo,
            telefono: req.body.telefono,
            mensaje: req.body.mensaje,
        });

        res.json({mensaje: contacto});

    }catch(error){
        console.log(error);
        res.json({mensaje: 'Hubo un error'});
    }
}

exports.getContactos = async(req,res)=>{
    try{
        
        const contacto = await Contacto.findAll();

        res.json(contacto);

    }catch(error){
        console.log(error);
    }
}