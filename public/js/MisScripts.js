function MisScripts() {
    this.recarga = function () {
        NuestraPagina.MisScripts.RespuestaGuardado();
    }
    this.seccionSelect = function() {
        let selector = document.getElementById('selectorServicio');
        let DatoSelector = selector.value;
        $('.paginacion').addClass('esconder');
        $('#paginacion-' + DatoSelector).removeClass('esconder');
        if (DatoSelector =='dw') {
            NuestraPagina.MisScripts.RespuestaGuardado();
        }
    }
    this.ActividadesActivas = function () {
        html = '';
        html += '<div>actividad: ' + actividad + '</div>' +
            '<div>IdUsuario: ' + IdUsuario + '</div>' +
            '<div>descripcion: ' + descripcion + '</div>';
        $('#seccionMostrar').html(html);
        
    }
    this.AgregarActividad = function (event) {
        event.preventDefault();
       
        
        var actividad = $('#actividad').val();
        var IdUsuario = $('#IdUsuario').val();
        var descripcion = $('#descripcion').val();

        //console.log(actividad);
        //html = '';
        //html += '<div>actividad: ' + actividad + '</div>' +
        //    '<div>IdUsuario: ' + IdUsuario+'</div>' +
        //    '<div>descripcion: ' + descripcion+'</div>';
        //$('#seccionMostrar').html(html);
        NuestraPagina.MisScripts.GuardarActividadCliente(actividad, IdUsuario, descripcion);
    }

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
            async: false,
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
    this.GuardarActividadCliente = function (actividad, IdUsuario, descripcion) {
        var data = {
            NombreActividad: actividad,
            Descripcion: descripcion,
            IdUsuario: IdUsuario
        };
        try {
            var data = {
                url: '/ActividadClientes/GuardarActividadCliente',
                type: 'GET',
                data: data,
                callback: NuestraPagina.MisScripts.RespuestaGuardado
            }
            NuestraPagina.MisScripts.CargaDatosCors(data);
        } catch (e) {
            console.log(e);
        }
    }
    this.RespuestaGuardado = function (response) {
        console.log(response);
        var IdUsuario = $('#IdUsuario').val();

        try {
            var data = {
                url: '/ActividadClientes/MostrarActividadClientes?IdUsuario=' + IdUsuario,
                type: 'GET',
                data: '',
                callback: NuestraPagina.MisScripts.RespuestaMostrandoActividades
            }
            NuestraPagina.MisScripts.CargaDatosCors(data);
        } catch (e) {
            console.log(e);
        }
    }
    this.RespuestaMostrandoActividades = function (response) {
        console.log(response.jsonResultados);
        html = '';
        //for (var i = 0; i <= response.jsonResultados.length; i++) {
        //    //console.log("misActividades: " + response.jsonResultados[i].NombreActividad);
        //    html += '<div>' + response.jsonResultados[i].NombreActividad + '</div>' +
        //        '<div>' + response.jsonResultados[i].Descripcion + '</div>';
        //}
        response.jsonResultados.forEach(function (item,index) {
            //console.log(index);
            html +=
                '<div class="cont-Activity">'+
            '<div id="nombre-' + index + '" class="cont-nombre" onClick="NuestraPagina.MisScripts.EditorActividad(' + index + ')"><div class="texto"><i class="fa fa-plus-circle" aria-hidden="true"></i> ' + item.NombreActividad + '</div><div class="cont-eliminar" onclick="NuestraPagina.MisScripts.Eliminar(' + item.IdActividadCliente +')"><span>Eliminar</span></div></div>' +
                    '<div id="descripcion-'+index+'" class="cont-descripcion esconder">' + item.Descripcion + '</div>' +
                '</div>';
        });
        //html = '';
        //response.jsonResultados.forEach(element =>
        //    console.log(element);
        //    //html +=
        //    //'<div>' + element.NombreActividad + '</div>' +
        //    //'<div>' + element.Descripcion + '</div>';
        //);
        
        
        $('#seccionMostrar').html(html);
    }
    this.EditorActividad = function (index) {
        $('.cont-descripcion').addClass('esconder');
        $('#descripcion-' + index).removeClass('esconder');
    }
    this.NoLogged = function () {
        //var noLogeado = $('#noLogeado').val();
        var estalogged = $('#estalogged').val();
        if (estalogged == '') {
            html = '';
            html += '<div class="contenedorLogin">' +
                        '<div class="conttitle"><h2>Para poder Cotizar una Pagina debes de Iniciar Sesion</h2></div>' +
                            '<div class="centradorLog">' +
                                '<form action="/VistaCliente/ValidarCliente">'+
                                    '<div class="continput">' +
                                         '<input type="text" id="usuarioL" name="usuario" placeholder="Email" />'+
                                    '</div>' +
                                    '<div class="continput">' +
                                        '<input type="text" id="passwordL" name="password" placeholder="Contraseña" />'+
                                    '</div>' +
                                    '<input type="hidden" id="usuarioL" name="cotizador" value="activo" />' +
                                    '<div class="continput">' +
                                        '<input class="botonLog" type="submit" type="Iniciar Sesion" />' +
                                    '</div>' +
                                '</form>'+
                                '<div class="continput">' +
                                    '<div>' +
                                        '<p>¿No tienes cuenta? Registrate <a href="">aqui</a></p>'
                                    '</div>'+
                                '</div>' +
                            '</div>'+
                    '</div>';
            $('#noLogeado').html(html);
        }
    }
    this.Eliminar = function (IdActividad) {
        console.log(IdActividad);
        try {
            var data = {
                url: '/ActividadClientes/EliminarActividadClientes?IdActividad=' + IdActividad,
                type: 'GET',
                data: '',
                callback: NuestraPagina.MisScripts.RespuestaEliminar
            }
            NuestraPagina.MisScripts.CargaDatosCors(data);
        } catch (e) {
            console.log(e);
        }
    }
    this.RespuestaEliminar = function (response) {
        console.log(response);
        NuestraPagina.MisScripts.RespuestaGuardado();
    }
    this.ServicioInteres = function (servicio) {
        
        var params = { servicio }
        const form = document.createElement('form');
        form.method = 'post';
        form.action = 'VistaCliente/ServicioDeInteres';

        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                const hiddenField = document.createElement('input');
                hiddenField.type = 'hidden';
                hiddenField.name = key;
                hiddenField.value = params[key];

                form.appendChild(hiddenField);
            }
        }

        document.body.appendChild(form);
        form.submit();
    }
    this.RedireccionarPlan = function (paquete) {
        
        var params = { paquete }
        const form = document.createElement('form');
        form.method = 'post';
        form.action = 'VistaCliente/Paquetes/:idPaquete';

        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                const hiddenField = document.createElement('input');
                hiddenField.type = 'hidden';
                hiddenField.name = key;
                hiddenField.value = params[key];

                form.appendChild(hiddenField);
            }
        }

        document.body.appendChild(form);
        form.submit();
    }
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
                '<li class="subtitulo">Google Negocio</li>'+
                '<li class="subtitulo">Adaptable a dispositivos moviles</li>'+
                    '<p>Una página adaptable a dispositivos Moviles quiere decir que tu página web sé podra visualizar correctamente en todos los dispositivos ya sea móvil, tablet o computadora.  </p > '+
                '<li class="subtitulo">Certificado SSL</li>'+
                '<li class="subtitulo">Contacto</li>'+
                '<p></p>';
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
}