function IdeasWebScripts() {
    
    this.paqueteScripts = function () {
        var url = window.location.pathname;
        var IdPaquete = url.substring(url.lastIndexOf('/') + 1);
        // var IdPaquete = url.split("paquetes/");
        
        let html = '';
        let html2 = '';
        let html3 = '';
        let html4 = '';
        if (IdPaquete == 1) {
            html += '<h2>Paquete Basico</h2>';
            html2 += '<p>El paquete básico es una página web tipo landing page, que contendrá los siguientes  elementos:</p>'; 
            html3 +=
                '<li class="subtitulo">5 secciones</li>'+
                    '<p>Tu página web podra tener 5 secciones en el tabulador inicial, de los cuales se llenaran con información correspondiente a tus productos o el tema que quieras tener en tu página web </p >'+
                '<li class="subtitulo">Adaptable a dispositivos moviles</li>'+
                    '<p>Una página adaptable a dispositivos Moviles quiere decir que tu página web sé podra visualizar correctamente en todos los dispositivos ya sea móvil, tablet o computadora.  </p > '+
                '<li class="subtitulo">Certificado SSL</li>'+
                    '<p>Tu página web tendrá un certificado SSL que es un estándar de seguridad global que permite la transferencia de datos cifrados entre un navegador y un servidor web</p>'+
                '<li class="subtitulo">Contacto</li>'+
                    '<p>Le añadiremos la sección de contacto que es el pequeño formulario que se encuentra en la parte de abajo de esta página, que servirá para que tus clientes dejen sus datos</p>';
            html4 += '<img src="/img/paquetebasico.jpg" />';

        } else if (IdPaquete == 2) {
            html += '<h2>Paquete Avanzado</h2>';
            html2 += '<p>El paquete avanzado es una página web con un CRM que te permitira administrar tu pagina web, el paquete contendrá los siguientes  elementos:</p>'; 
            html3 +=
                '<li class="subtitulo">El paquete básico</li>' +
                '<p></p >' +
                '<li class="subtitulo">Soporte 6/5</li>' +
                '<li class="subtitulo">2 videos publicitarios de facebook</li>' +
                '<p></p > ' +
                '<li class="subtitulo">Landing de Facebook</li>' +
                '<p></p>';

            html4 += '<img src="/img/paqueteavanzado.jpg" />';
        } else if (IdPaquete == 3) {
            html += '<h2>Paquete Especial</h2>';
            html2 += '<p>El paquete especial es una pagina web avanzada que puede incluir los elementos que necesites para tu pagina, algunos ejemplos son:</p>'; 
            html4 += '<img src="/img/paqueteEspecial.jpg" />';
        }
        $('#cont-titulo').html(html);
        $('#cont-descripcion').html(html2);
        $('#cont-lista').html(html3);
        $('#cont-imagenP').html(html4);
    }
    this.mandarContacto = function(event){
        let nombrescontacto = document.getElementById("nombrescontacto").value;
        let correo = document.getElementById("correo").value;
        let telefono = document.getElementById("telefono").value;
        let mensaje = document.getElementById("mensaje").value;
        let enviar;
        let arrayDatos = [];
        if(nombrescontacto.trim() == ""){
            arrayDatos.push("nombrescontacto")
        }
        if(correo.trim() == ""){
            arrayDatos.push("correo")
        }
        if(telefono.trim() == ""){
            arrayDatos.push("telefono")
        }
        if(mensaje.trim() == ""){
            arrayDatos.push("mensaje")
        }
        console.log(arrayDatos[0]);
        if(arrayDatos.length > 0){
            NuestraPagina.IdeasWebScripts.detectarVacio(arrayDatos)
            if(arrayDatos.length == 1){
                if(arrayDatos[0] == "correo" || arrayDatos[0] == "telefono"){
                    enviar = true;
                }else{
                    return;
                }
            }
        }else{
            enviar = true;
        }     
        
        if(enviar == true){
            let data = {
                "nombrescontacto": nombrescontacto,
                "correo": correo,
                "telefono": telefono,
                "mensaje": mensaje
            }      
                            
            var settings = {
                "url": "/mandarContacto/",
                "method": "POST",
                "timeout": 0,
                "headers": {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  "data": data
              };
              
              $.ajax(settings).done(function (response) {
                console.log(response);
                // window.location.href = "/cursos-talleres";
                let html = '';                                            
                                  
                
    
                html +=
                '<div class="contMensajeContacto w3-animate-opacity">'+
                    '<div class="mensajeContacto">Tu mensaje se ha enviado</div>'+
                '</div>';
               
    
                $('#pop').html(html);
    
                $('#nombrescontacto').val('');
                $('#correo').val('');
                $('#telefono').val('');
                $('#mensaje').val('');
    
              
                setTimeout(function(){ 
                    $('#pop').html('');
                }, 5000);
    
              }); 
        }
 
    }
    this.detectarVacio = function(arrayDatos){
        let contenedor = ''; 
        let mensajeTexto = '';
        arrayDatos.map(function(inputVacio){
            if(inputVacio == "nombrescontacto"){
                contenedor = "mensajeNombre";
                mensajeTexto = "Falta tu nombre";
                NuestraPagina.IdeasWebScripts.MostrarMensajeError(contenedor, mensajeTexto);
            }
            console.log()
            if(inputVacio == "correo"){
                if(arrayDatos.indexOf("telefono") < 0){

                }else{
                    contenedor = "mensajeCorreo";
                    mensajeTexto = "Falta el Contacto";
                    NuestraPagina.IdeasWebScripts.MostrarMensajeError(contenedor, mensajeTexto);
                    
                }
            }
            if(inputVacio == "telefono"){
                if(arrayDatos.indexOf("correo") < 0){

                }else{
                    contenedor = "mensajeNumero";
                    mensajeTexto = "Falta el Contacto";
                    NuestraPagina.IdeasWebScripts.MostrarMensajeError(contenedor, mensajeTexto);
                }
                
            }
            if(inputVacio  =="mensaje"){
                contenedor = "mensajeTexto";
                mensajeTexto = "Falta el mensaje";
                NuestraPagina.IdeasWebScripts.MostrarMensajeError(contenedor, mensajeTexto);
            }
        })
        
    }
    this.MostrarMensajeError = function(contenedor, mensaje){
        let mensajeTexto = '';
        mensajeTexto +=
        '<div class="contMensajeError">'+
            '<div class="mensajeError">'+mensaje+'</div>'+
        '</div>'; 

        $('#'+contenedor).html(mensajeTexto);
    }
    this.quitarError = function(contenedor){
        
        if(contenedor == "mensajeNumero" || contenedor == "mensajeCorreo"){
            $('#mensajeNumero').html('');
            $('#mensajeCorreo').html('');
        }else{
            $('#'+contenedor).html('');
        }
        
    }
    this.mostrarMensajes = function(){
        var settings = {
            "url": "/getContactos",
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              "data": ''
          };
          
          $.ajax(settings).done(function (response) {
            console.log(response);
            let html = '';
            response.map(function(contacto, index){
                var tipo = (index % 2)? "Par" : "Impar";
                html +=
                    '<tr class="fila '+tipo+'">'+
                        '<td>'+contacto.nombrescontacto+'</td>'+
                        '<td>'+contacto.telefono+'</td>'+
                        '<td>'+contacto.correo+'</td>'+
                        '<td>'+contacto.mensaje+'</td>'+
                        '<td>'+contacto.createdAt+'</td>'+
                        '<td>aqui va el status</td>'+
                        '<td><button>Detalle</button></td>'+
                    '</tr>';
                });
                $('#losmensajes').html(html);
          });
           
        
    }
    this.redirigirChat = function(){

        function windowGuid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c === 'x' ? r : r & 0x3 | 0x8;
                return v.toString(16);
            });
        }
        
        var usuario = localStorage.getItem('usuario');
        if(usuario == null){
            var codigoUnico = windowGuid(); 
            localStorage.setItem('usuario', codigoUnico);
            
        }
       
        
        // function windowGuid() {
        //     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        //         var r = Math.random() * 16 | 0, v = c === 'x' ? r : r & 0x3 | 0x8;
        //         return v.toString(16);
        //     });
        // }

        // var codigoUnico = windowGuid();
        // localStorage.setItem('sala', codigoUnico);

        // var sala = localStorage.getItem('sala');
        var usuario = localStorage.getItem('usuario');
        var settings = {
            "url": "/createSala",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              "data": {
                  usuario: usuario
              }
          };
          
          $.ajax(settings).done(function (response) {
            console.log(response);
            console.log(response.sala.sala)
            // localStorage.setItem('sala', response.sala[0].sala);
            window.location.href = "/chatMain?sala="+response.sala.sala;
          });
    }
    this.ServicioInteres = function(servicio){
        alert(servicio);
        //ssl correo dispositivoMovil googleAnalytic servidor proteccion
        window.location.href = "/servicios?servicio="+servicio;
    }
}