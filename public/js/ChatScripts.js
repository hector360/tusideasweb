function ChatScripts(){
    this.traerPrincipal = function(){
        
        let socket = io('http://localhost');  
        
        var params = new URLSearchParams(window.location.search);
        var displayData = '';
        
        var usuario = {
            nombre: params.get('nombre')
        };
        
        socket.on('connect', ()=>{
           
            socket.emit('entrarChat', {nombre: localStorage.getItem("Usuario"), sala: sala}, function(resp){
                console.log('Usuarios conectados:', resp);
            });
        });
        
        socket.on('crearMensaje', (data)=>{
            console.log('Servidor: ',data);
            
           if(data.Email != localStorage.getItem("Usuario")){
            displayData +=
                '<div class="cont-mensaje animated fadeIn">'+
                    '<div class="box bg-light-inverse" id="display-data">'+data.Mensaje+'</div>'+
                '</div>';
           }
           
           $('#display-data-Container').html(displayData);
            
            var contchat = document.getElementById("display-data-Container");
            
            contchat.scrollTo(0, contchat.scrollHeight)
        });
        socket.on('mensajeSala', function(mensaje){
            
        });
        

        
        socket.on('listaPersona', function(personas){
            console.log(personas);
        });

        socket.on('mensajePrivado', function(mensaje){
            console.log("Mensaje privado: ",mensaje);
        })

        document.getElementById("botonEnvio").disabled = true;


        var data = {
        'sala': sala
        };

        var settings = {
            url: '/getMensajes',
            "method": "POST",
            "timeout": 0,
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded', 
                
            },
            data : data
          };
          
          $.ajax(settings).done(function (response) {
                console.log(response);
            if(response.length == 0){
                displayData += '';
            }else{
                response.data.map((mensajes)=>{
                    if(mensajes.Email == localStorage.getItem('Usuario')){
                        displayData +=
                            '<div class="cont-mensaje animated fadeIn">'+
                                '<div class="box bg-light-info" id="display-data">'+mensajes.Mensaje+'</div>'+
                            '</div>';
                        
                    }else{
                        displayData +=
                            '<div class="cont-mensaje animated fadeIn">'+
                                '<div class="box bg-light-inverse" id="display-data" >'+mensajes.Mensaje+'</div>'+
                            '</div>';
                        
                    }
                    
                });
            }
                

                $('#display-data-Container').html(displayData);

                 var contchat = document.getElementById("display-data-Container");
                 
                 contchat.scrollTo(0, contchat.scrollHeight)

                //  console.log("sala: ", this.state.sala);
                // console.log("usuario: ", localStorage.getItem("Usuario"))
            })
        
            
            
    }
    this.submitHandler = function(e){
        let socket = io(); 
        var params = new URLSearchParams(window.location.search);
        var usuario = localStorage.getItem('usuario');
        var sala = params.get('sala');
        
       
        // alert(this.state.elMensaje)
        // socket.emit('crearMensaje', {nombre: localStorage.getItem("Usuario") , mensaje: this.state.elMensaje})
        // socket.emit('mensajePrivado', {nombre: localStorage.getItem("Usuario") , mensaje: this.state.elMensaje, para: 'FT65I0SR-6XBaDrGAAAD'})
        // console.log(this.state.sala);
        var displayData = '';
        e.preventDefault();
        const botonEnvio = document.getElementById("botonEnvio");
        socket.emit('crearMensaje', {
            nombre: usuario, 
            mensaje: document.getElementById("elMensaje").value, 
            sala: sala
        },(resp)=>{
            // console.log('respuesta server: ',resp);
            displayData +=
                '<div class="cont-mensaje animated fadeIn">'+
                    '<div class="box bg-light-info" id="display-data" >'+resp.mensaje+'</div>'+
                '</div>';
            
            $('#display-data-Container').append(displayData);
            document.getElementById("elMensaje").value = '';
            botonEnvio.classList.add("desactivado");
            document.getElementById("botonEnvio").disabled = true;
            document.getElementById("elMensaje").focus();
            var contchat = document.getElementById("display-data-Container");
            
            contchat.scrollTo(0, contchat.scrollHeight)
            e.preventDefault();
            
        });

    }
    this.changeHandler = function(){
       
        var valorInput = document.getElementById("elMensaje").value;
        const botonEnvio = document.getElementById("botonEnvio");
        valorInput = valorInput.trim()
        if(valorInput != ""){
            // this.state.
            botonEnvio.classList.remove("desactivado");
            document.getElementById("botonEnvio").disabled = false;
        }else{
            botonEnvio.classList.add("desactivado");
            document.getElementById("botonEnvio").disabled = true;
        }
    }
    // this.redirigirChat = function(){
    //     alert("hola chavos")
    // }

    this.getListaSalas = function(){
        var settings = {
            url: '/getSalas',
            "method": "GET",
            "timeout": 0,
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded', 
                
            },
            data : ''
          };
          
          $.ajax(settings).done(function (response) {
                console.log(response);
                let html = '';
                response.map(function(chat){
                    html += 
                    '<div class="contChat">'+
                        '<div class="usuario">'+chat.usuario+'</div>'+
                        '<div class="fecha">'+chat.createdAt+'</div>'+
                        '<div class="status" id="status"></div>'+
                        '<div class="contBoton"><div class="boton" onclick="NuestraPagina.ChatScripts.AdminAbreChat(`'+chat.sala+'`)">Ir a Chat</div></div>'+
                    '</div>';
                })
            $('#contenedorAdministrarChat').html(html);
          });
    }
    this.AdminAbreChat = function(sala){
        alert(sala)
        localStorage.setItem('usuario', "Admin");
        window.location.href = "/chatMain?sala="+sala;
    }

}