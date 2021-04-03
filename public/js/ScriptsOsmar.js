
function ScriptsOsmar() {
    this.CargaDatosCors = function (Op) {
        var _url = (Op.url) ? Op.url : '';
        var _data = (Op.data) ? Op.data : '';
        var _callback = (Op.callback) ? Op.callback : '';

        $.ajax({
            url: _url,
            async: false,
            crossDomain: true,
            data: _data,
            type: "GET",
            jsonp: false,
            success: function (response) {
                console.info(response, 'CargaDatos');
                if (_callback) {
                    console.info("Hay Callback");
                    _callback(response);
                }
            }
        });
    }

    this.SaveContact = function () {

        

        var Telefono = $('#telefono').val();
        var Mensaje = $('#mensaje').val();
       
        var Correo = $('#correo').val();
        var NombresContacto = $('#nombrescontacto').val();
        alert("alto ahi")
        if (Telefono === '' || NombresContacto === '' || Mensaje === '' || Correo === ''  ) {
            var html = '';
            html += '<div class="alert alert-danger" role="alert">' +
                '¡Oops! Algunos campos no pueden estar incompletos, No pasa nada, aún podemos revisarlo' +
                '</div>';
            $('#pop').html(html);
            setTimeout(function () {
                $('#pop').html('');
            }, 4000);

        } else {

            try {
                var dataall = {
                    Correo: Correo,
                    NombresContacto: NombresContacto,
                    Telefono: Telefono,
                    Mensaje: Mensaje
                }
                var data = {
                    url: '/Contactos/SaveContact',
                    type: 'get',
                    data: dataall ,
                    callback: Blog.ScriptsOsmar.Respuesta
                }
                Blog.ScriptsOsmar.CargaDatosCors(data);
            } catch (e) {
                console.log(e);
            }
        }
        
        
       
        //console.log(Telefono);
        //console.log(Mensaje);
        //console.log(Correo);
        //console.log(NombresContacto);

    }

    this.Respuesta = function (response) {
        console.log(response);
        



        var html = '';
        html += '<div class="alert alert-success" role="alert">'+
                '¡Gracias por tus comentarios!, en breve un asesor se comunicara contigo'+
                '</div>';
        $('#pop').html(html);
        setTimeout(function () {
            $('#pop').html('');
        }, 4000);
        $('#telefono').innerHTML = "";
        $('#correo').innerHTML = "";
        $('#mensaje').innerHTML = "";
        $('#nombrescontacto').innerHTML = "";

    }
    

}

