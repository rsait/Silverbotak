var session = null
QiSession(connected, disconnected, location.host);

$(function(){
    info = localStorage.getItem("weather").split(',');
    //alert(info)
    if(info[0] === "None"){
        $('#location-input').val("No se ha encontrado esa ciudad");
    }
    else{
        $('#weather-icon').attr("src", "icons/weather/" + info[0] + ".png");
        $('#weather-temp').html(unescape(info[1] + "°<span>C</span>"));
        $('#weather-desc').html(unescape(info[2]));
        $('#date-dayname').html(unescape(info[3]));    

        $('#day-icon-1').attr("src", "icons/weather/" + info[4] + ".png");
        $('#day-temp-1').html(unescape(info[5] + "°<span>C</span>"));
        $('#day-name-1').html(unescape(info[7]));

        $('#day-icon-2').attr("src", "icons/weather/" + info[8] + ".png");
        $('#day-temp-2').html(unescape(info[9] + "°<span>C</span>"));
        $('#day-name-2').html(unescape(info[11]));
        
        $('#day-icon-3').attr("src", "icons/weather/" + info[12] + ".png");
        $('#day-temp-3').html(unescape(info[13] + "°<span>C</span>"));
        $('#day-name-3').html(unescape(info[15]));

        $('#day-icon-4').attr("src", "icons/weather/" + info[16] + ".png");
        $('#day-temp-4').html(unescape(info[17] + "°<span>C</span>"));
        $('#day-name-4').html(unescape(info[19]));

        $('#location').html(unescape(info[21] + ", " + info[20]));
        $('#date-day').html(unescape(info[22]));

        $('#precipitation').html(unescape(info[23] + "%"));
        $('#humidity').html(unescape(info[24] + "%"));
        $('#wind').html(unescape(info[25] + " km/h"));
        $('#max-temp').html(unescape(info[26] + " °<span>C</span>" ));
        $('#min-temp').html(unescape(info[27] + " °<span>C</span>" ));
    }
    
});


function connected(s) {
    console.log("Session connected");
    session = s;
}

function disconnected(error) {
    console.log("Session disconnected");
}

function cambiarUbicacion(){
    session.service("ALMemory").then(function (memory) {
        // city = "Bilbao";
        city = $('#location-input').val();
        if(city === "San Sebastian"){
            city = "Donosti";
        }
        memory.raiseEvent("pedirDatosTiempo", city);
    });
    // Wait
    window.setTimeout(function refreshPage(){
        location.reload();
    }, 1000);
}




