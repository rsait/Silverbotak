var i = 0

function clickRegistrar(){
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
    if(!nameResult || nameValue=="Nombre"){
        wrongValuesError += "Formato de nombre incorrecto.\n";
    }
    if(!lastNameResult || lastNameValue=="Apellidos"){
        wrongValuesError += "Formato de apellido incorrecto.\n";
    }
    if(!dateResult){
        wrongValuesError += "Formato de fecha de nacimiento incorrecto.\n";
    }
    if(!emailResult || emailValue=="nombre@ejemplo.com"){
        wrongValuesError += "Formato de email incorrecto.\n";
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
        // TODO: Lanzar la senal registrarUsuario

    }
}

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
        // alert(name)
        document.getElementById("profile-img").src = name;
    }, 10000);
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
