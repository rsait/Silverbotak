var session = null
QiSession(connected, disconnected, location.host);
var tts = null;
var audioDevice = null;
var animationplayer = null;
var volumen = null;

var current_user = null;

/**
 * Abreviatura de jquery para la funcion de JS $(document).ready(function(){...}); 
 * Se ejecuta cuando todos los elementos de la pagina se han cargado
 */
$(function(){
    current_user = localStorage.getItem("user");
    if (current_user == null){
        current_user = "None, None";
    }
    current_user = current_user.split(',');
    

    /**
     * Si en la sesión actual en JavaScript tenemos un usuario, mostraremos las opciones de cerrar sesión y de modificar 
     * datos en lugar de registrarse y apagar el robot. Además, mostraremos el nombre del usuario en pantalla
     */

    if (current_user.length == 8){
        texto = "Hola " + current_user[0] + ":<br>dime qué te gustaría hacer o seleciónalo en mi tablet"
        $('#textoCentral p').html(unescape(texto));
        
        $('#contenedorLogin').addClass("contenedorLoginHide")
        $('#contenedorLogin').removeClass("contenedorLoginShow")

        $('#contenedorLogout').addClass("contenedorLoginShow")
        $('#contenedorLogout').removeClass("contenedorLoginHide")

        $('#contenedorRegistro').addClass("contenedorRegistroHide");
        $('#contenedorRegistro').removeClass("contenedorRegistroShow");
        
        $('#contenedorModificar').addClass("contenedorRegistroShow");
        $('#contenedorModificar').removeClass("contenedorRegistroHide");

    }
    // En caso contrario mostraremos los botones por defecto
    else{
        texto = "Hola, soy Pepper:<br>dime qué te gustaría hacer o seleciónalo en mi tablet"
        $('#button-user img').attr("src", "icons/menu/button-user-add.png");

        $('#contenedorLogin').addClass("contenedorLoginShow")
        $('#contenedorLogin').removeClass("contenedorLoginHide")

        $('#contenedorLogout').addClass("contenedorLoginHide")
        $('#contenedorLogout').removeClass("contenedorLoginShow")

        $('#contenedorRegistro').addClass("contenedorRegistroShow");
        $('#contenedorRegistro').removeClass("contenedorRegistroHide");
        
        $('#contenedorModificar').addClass("contenedorRegistroHide");
        $('#contenedorModificar').removeClass("contenedorRegistroShow");

    }
    $('#textoCentral p').html(unescape(texto));
});

var google = false;

function connected(s) {
    console.log("Session connected");
    session = s;

    // TODO: subscribirse a señales


    // TODO: iniciar el servicio ALTextToSpeech para poder hacer hablar al robot desde JavaScript
    // No es necesario, pero puede ahorrarnos algunos raiseEvent en momentos en los que solo queremos
    // que el robot hable, simplificando el programa de Choregraphe. 

    
    session.service("ALTextToSpeech").then(function (t) {
        tts = t;
    });

    session.service("ALAnimatedSpeech").then(function (t) {
        tts_animated = t;
    });
    
}

function disconnected(error) {
    console.log("Session disconnected");
}

/**
 * Esta funcion se subscirbe a la senal 'user', y es la encargada de actualizar los datos del usuario en la interfaz
 * y de gestionar la sesion del usuario. Cuando un usuario inicia sesion, se muestran los botones de modificar datos y 
 * cerrar sesion, mientras que si no hay ningun usuario logueado, muestra las opciones de registrar usuario y cerrar
 * sesion. Ademas, guarda en la memoria del navegador la informacion del usuario que le mandamos desde Choregraphe
 * y la elimina si no le mandamos ningun usuario. Por ultimo, modifica el texto central, donde si el usuario
 * esta logueado mostrara su nombre en el mensaje de bienvenida y por el contrario un mensaje generico si no lo esta.
 */
function startSubscribe() {
    // TODO: subscribirse a la señal user. Además, cuando le llegue la senal debera modificar la interfaz y actualizar
    // la informacion del usuario. Para ello, fijate en la funcion que se ejecuta cuando se carga la pagina, el contenido
    // es muy parecido. 

}

/**
 * Esta funcion esta pensada para funcionar tanto por comandos por voz como por navegacion mediante la pantalla tactil
 * de Pepper. Recoge una palabra como argumento que determina la accion que debe realizar. Si no quisieramos hacer uso
 * del comando por voz, lo ideal seria declarar una funcion para cada accion en lugar de una sola con varios if/else
 * 
 * @param {*} palabra Argumento de entrada que determina que accion se debe realizar 
 */
function procesarVoz(palabra) {
    var path = window.location.pathname;
    var page = path.split("/").pop();

    tts.stopAll();

    console.log(palabra)

    // Comandos generales del menú
    if(palabra === "volver")
    {
        window.history.back();
    }
    else if(palabra === "inicio")
    {
        raiseEvent("cambiarHTML", "index", 0);
    }

    // Comandos por pagina
    // Pagina: index.html 
    if(page === "index.html")
    {
        /** TODO: controlar las acciones que se deben realizar para las siguientes palabras
         * añadirusuario
         * editarusuario
         * loguearse
         * cerrarSesion
         * */ 
        
    }
    
    else if(page === "user-register.html" || page === "user-info.html") 
    {
        
    } 
}

/**
 * Funcion que llama a raiseEvent pero con un retraso de waitTime ms. 
 * @param {str} eventName Nombre del evento que queremos lanzar
 * @param {*} eventParam Valor que deseamos enviar junto al evento. Si no deseamos mandar nada, pondremos null
 * @param {float} waitTime Tiempo de espera en ms desde la llamada a esta función hasta que se envía el evento
 */
function raiseEvent(eventName, eventParam, waitTime){



    window.setTimeout(function () {
        // TODO: llamar a la utildad raiseEvent de la API para que lanze un evento con el nombre
        // contenido en la variable eventName con los parametros eventParam
    }, waitTime);
}
