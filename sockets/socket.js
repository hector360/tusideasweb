// const { io } = require('../index');


// io.on('connection', (client) => {

//     console.log('Usuario conectado');

//     client.emit('enviarMensaje', {
//         usuario: 'Administrador',
//         mensaje: 'Bienvenido a esta aplicación'
//     });



//     client.on('disconnect', () => {
//         console.log('Usuario desconectado');
//     });

//     // Escuchar el cliente
//     client.on('enviarMensaje', (data, callback) => {

//         console.log(data);

//         client.broadcast.emit('enviarMensaje', data);


//         // if (mensaje.usuario) {
//         //     callback({
//         //         resp: 'TODO SALIO BIEN!'
//         //     });

//         // } else {
//         //     callback({
//         //         resp: 'TODO SALIO MAL!!!!!!!!'
//         //     });
//         // }



//     });

// });

const {io} = require('../index');
const {Usuarios} = require('../classes/usuarios');
const Mensajes = require('../database/models/Mensajes');
const usuarios = new Usuarios();

io.on('connection', (client)=>{ 
    client.on('mensajechat',(data)=>{
        
        console.log(data);
    })
    client.on('entrarChat', (data, callback)=>{
        console.log("aqui van los datos: ")
        console.log(data)
        if(! data.nombre){
            return callback({
                error: true,
                mensaje: 'El nombre es necesario'
            })
        }
        client.join(data.sala);
        
        usuarios.agregarPersona(client.id, data.nombre, data.sala);

        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasPorSala(data.sala));
        callback(usuarios.getPersonasPorSala(data.sala));
    })
    client.on('crearMensaje', async(data, callback)=>{
        let persona = usuarios.getPersonasPorSala(data.sala);
        let mensaje = crearMensaje( data.nombre, data.mensaje, data.sala);
        // console.log("mensaje: ",mensaje);
        
        try{
            console.log(mensaje)
            await Mensajes.create(mensaje)  
        
        }catch(err){
            console.log(err)
        }
        console.log(data)
        console.log(data.sala)
        client.broadcast.to(data.sala).emit('crearMensaje', mensaje);
        
        callback(mensaje);
    });
    client.on('mensajeSala',(data)=>{
        console.log(data)
        client.emit('mensajeSala', data);
    })
    client.on('disconnect', ()=>{
        let personaBorrada = usuarios.borrarPersona(client.id);
        // client.broadcast.emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} abandono el chat`));
        // client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSala(personaBorrada.sala));
    })

    client.on('mensajePrivado', (data)=>{
        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(data.nombre, data.mensaje))
    })
});


const crearMensaje = (Email, Mensaje, Sala)=>{
    return {
        email: Email,
        mensaje: Mensaje,
        sala: Sala,
        fechaCreacion: new Date().getTime()
    };
}