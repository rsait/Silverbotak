var i = 0
var modified_user = null
/**
 * Cargamos en la variable modified_user la informacion del usuario que tiene iniciada la sesion. 
 * iremos modificando los datos en esa variable, y cuando el usuario haga click en "Modificar", los
 * actualizaremos en la base de datos. 
 * 
 */
$(function(){
    modified_user = localStorage.getItem("user");
    modified_user = modified_user.split(',');
    updateForm(modified_user);
});

function updateForm(user)
{
    $('#first-name').val(unescape(user[0]));
    $('#last-name').val(unescape(user[1]));
    $('#birthday').val(unescape(user[2]));
    if(user[3] == "Male"){
        $('#gender-male').prop('checked', true);
    }
    if(user[3] == "Female"){
        $('#gender-female').prop('checked', true);
    }
    if(user[3] == "Other"){
        $('#gender-other').prop('checked', true);
    }
    $('#email').val(unescape(user[4]));
    $('#city').val(unescape(user[5]));
    $('#postalcode').val(unescape(user[6]));
    filename = user[7].split('html/');
    $('#profile-img').attr('src', unescape(filename[1]));
}


function clickModificar(){
    var x = document.getElementById("form");
    // Get name value
    var nameValue = x.elements.namedItem("first-name").value;
    var lastNameValue = x.elements.namedItem("last-name").value;
    var birthDateValue = x.elements.namedItem("birthday").value;
    
    /* Pick gender value */
    var genderMaleValue = x.elements.namedItem("gender-male").checked;
    var genderFemaleValue = x.elements.namedItem("gender-female").checked;
    var genderOtherValue = x.elements.namedItem("gender-other").checked;

    if (genderMaleValue){
        var genderValue = "Male";
    }
    if (genderFemaleValue){
        var genderValue = "Female";
    }
    if (genderOtherValue){
        var genderValue = "Other";
    }

    var emailValue = x.elements.namedItem("email").value;
    var cityValue = x.elements.namedItem("city").value;
    var postalCodeValue = x.elements.namedItem("postalcode").value;


    // Every test needs individual patterns. 
    var namePatt = /(([A-Z]|[Á-Ú])([a-z]|[á-ú])+)(([\s]([A-Z]|[Á-Ú])([a-z]|[á-ú])+)|([\s][a-z]+))*/g;
    var lastNamePatt = /(([A-Z]|[Á-Ú])([a-z]|[á-ú])+)(([\s]([A-Z]|[Á-Ú])([a-z]|[á-ú])+)|([\s][a-z]+))*/g;
    var cityPatt = /(([A-Z]|[Á-Ú])([a-z]|[á-ú])+)(([\s]([A-Z]|[Á-Ú])([a-z]|[á-ú])+)|([\s][a-z]+))*/g;
    var datePatt = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
    var emailPatt = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;

    var nameResult = namePatt.test(nameValue);
    var lastNameResult = lastNamePatt.test(lastNameValue);
    var cityResult = cityPatt.test(cityValue);
    var dateResult = datePatt.test(birthDateValue);
    var emailResult = emailPatt.test(emailValue);
    
    var wrongValuesError = "";
    if(!nameResult){
        wrongValuesError += "Formato de nombre incorrecto.\n";
    }
    if(!lastNameResult){
        wrongValuesError += "Formato de apellido incorrecto.\n";
    }
    if(!dateResult){
        wrongValuesError += "Formato de fecha de nacimiento incorrecto.\n";
    }
    if(!emailResult){
        wrongValuesError += "Formato de correo incorrecto.\n";
    }
    if(!cityResult){
        wrongValuesError += "Formato de ciudad incorrecto.\n";
    }
    if(postalCodeValue==""){
        wrongValuesError += "Formato de código postal incorrecto."
    }

    if(wrongValuesError!=""){
        alert(wrongValuesError);
        return;
    }
    else{

        // TODO: Que el robot pida al usuario que espere un momento mientras se guardan sus datos y guardar los datos (tanto en la web,
        // actualizando el contenido de la variable "user" del localStorage como en la base de datos, lanzando una senal llamada 
        // 'modificarUsuario' con la informacion del usuario)
        
    }
}


/**
 * Funcion que se activa
 */

// TODO: crear una funcion llamada clickEliminar que asigne el valor null a la variable current_user,
// limpiae el localStorage y lance un evento llamado "eliminarUsuario"



function clickFoto(){
    var x = document.getElementById("form");
    // Get name value
    var nameValue = "tmp"
    var name = "users/profiles/" + nameValue + ".jpg";
    
    session.service("ALMemory").then(function (memory) {
        var n = nameValue;
        memory.raiseEvent("sacarFoto", n);
    });
        
    // Wait
    window.setTimeout(function () {
        //Update image
        i = i + 1;	
        document.getElementById("profile-img").src = name;
    }, 10000);
}
