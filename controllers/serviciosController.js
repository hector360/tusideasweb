const ParrafosServicios = require('../database/models/ParrafosServicios');
const Servicios = require('../database/models/Servicios');

exports.crearServicio = async(req,res)=>{
    
    await Servicios.create({
        nombreServicio: req.body.nombreServicio,
        imagenServicio: req.body.imagenServicio
    }).then(async servicio => {
        // console.log(servicio)
        // res.json(servicio)
        await ParrafosServicios.create({
            texto: req.body.texto,
            idServicio: servicio.id
        }).then(parrafo =>{
            console.log(parrafo);
            let arrayResponse = {
                id: servicio.id,
                nombreServicio: servicio.nombreServicio,
                imagenServicio: servicio.imagenServicio,
                texto: parrafo.texto
            };
            res.json(arrayResponse);
        }).catch(error => res.json(error));
    }).catch(error => res.json(error));
}