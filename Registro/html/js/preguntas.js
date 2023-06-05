var session = null;
var tts = null;
var background_movement = null;

timeValue =  30;
que_count = 0;
que_numb = 1;
userScore = 0;
score = 0;
puntuak = 0;
timeAnswer = 0;
counter = 0;
counterLine = 0;
widthValue = 0;
questions = [];
questions_length = 10;
var categories_list = [general, science_and_nature, sports]
var question_per_category = 50
valence = 0.0
showRules = true

QiSession(connected, disconnected, location.host);

function connected(s) {
    console.log("Session connected");
    session = s;

    
    // TODO: crear el servicio "ALBackgroundMovement" y guardarlo en la variable background movement

}

function disconnected(error) {
    console.log("Session disconnected");
}


function onClickStartButton(){
    background_movement.setEnabled(false);
    questions = loadQuestions(questions_length);

    showRules = true;
    $('.info_box').addClass('activeInfo');
    $('.start_btn').hide();

    // TODO: lanzar el evento empezarJuego

}

function onClickExitButton(){
    $('.info_box').removeClass('activeInfo');
    $('.start_btn').show();
}

function onClickQuitButton(){
    // Exit game

    // TODO: Lanzar la señal cambiarHTML
}


function onClickAcceptButton(){
    $('.ranking_box').removeClass('activeRanking');
    $('.result_box').addClass('activeResult');
}

function resetGame(){
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    score = 0;
    puntuak = 0;

    questions = loadQuestions(questions_length);
}

function onClickContinueButton(){

    // TODO: hacer que Pepper deje de decir las reglas. 


    resetGame();
    $('.button-back').hide();
    $('.info_box').removeClass('activeInfo');
    $('.result_box').removeClass('activeResult');
    $('.quiz_box').addClass('activeQuiz');

    
    showQuestions(0); //calling showQuestions function
    queCounter(1); //passing 1 parameter to queCounter
    startCountdown(timeValue); //calling startCountdown function
    startCountdownLine(0); //calling startCountdownLine function
    setCronometro("restart", 1000)
    setCronometro("start", 1000);
}

function onClickQuizButton(){
    window.location.reload(); //reload the current window    
}

function onClickNextButton(){

    if(que_count < questions.length - 1){ //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuestions(que_count); //calling showQuestions function
        queCounter(que_numb); //passing que_numb value to queCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        startCountdown(timeValue); //calling startCountdown function
        startCountdownLine(widthValue); //calling startCountdownLine function
        $('.countdown .time_left_txt').text("Tiempo");
        $('footer .next_btn').removeClass("show");
        setCronometro("start", 1000);
    }
    else{
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        setCronometro("stop", 300);
        //saveGameData();
        showResult(); //calling showResult function
        /*session.service("ALMemory").then(function (memory) {
            memory.raiseEvent("obtenerEstadoEmocional", gameUser);
        });*/
    }
}

// getting questions and options from array
function showQuestions(index){
    //creating a new span and div tag for question and option and passing the value using array index
    var que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    var option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    
    $('.title').html('Preguntas sobre ' + questions[index].category);
    $('.que_text').html(que_tag);
    $('.option_list').html(option_tag); //adding new div tag inside option_tag

    // set onclick attribute to all available options
    for(i=0; i < $('.option_list .option').length; i++){
        $($('.option_list .option').get(i)).attr("onclick", "optionSelected(this)");

    }
}
// // creating the new div tags which for icons
var tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
var crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

// if user clicked on option
function optionSelected(answer){
    answer = $(answer)
    console.log(answer);
    var timeAns = $('.countdown .timer_sec').text();
    timeAnswer = parseInt(timeAns);
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    var userAns = answer.text(); //getting user selected option
    var correcAns = questions[que_count].answer; //getting correct answer from array
    var allOptions = $('.option_list .option').length; //getting all option items
    

    // TODO: 

    // SI EL USUARIO ACIERTA LA PREGUNTA:
    // acierto = 1
    // Incrementar el valor de userScore en 1
    // answer.addClass("correct");
    // answer.append(tickIconTag);

    // lanzar la señal reaccionRespuesta para una respuesta positiva
    
    // SI EL USUARIO NO ACIERTA LA PREGUNTA
    // acierto = 0
    // answer.addClass("incorrect")
    // answer.append(crossIconTag)

    // lanzar la señal reaccionRespuesta para una respuesta negativa

    

    // for(i=0; i < allOptions; i++){
    //     opt = $($('.option_list .option').get(i))
        
        // Si es la respuesta correcta
        // opt.attr("class", "option correct"); 
        // opt.append(tickIconTag); //adding tick icon to matched option

    d = 30;
    
    puntuak = puntuak + (acierto*(d-(d-timeAnswer)));

    for(i=0; i < allOptions; i++){
        $($('.option_list .option').get(i)).addClass("disabled"); //once user select an option then disabled all options
    }
    $('footer .next_btn').addClass("show"); //show the next button if user selected any option
    setCronometro("stop", 300);
}

function showResult(){
    $('.info_box').removeClass("activeInfo");
    $('.quiz_box').removeClass("activeQuiz");
    $('.result_box').addClass("activeResult");
    var scoreText = $('.result_box').find(".score_text");
    duration = $('#timer').text()
    time = duration.split(':');
    duration_num = time[0] + (time[1]/100)

    score = puntuak*100/300;
    score_round = Math.round(score);

    $('.score .score_value').text(score_round);
    text = ""
    
    if (score_round >= 80){ // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        if (time[0] > 0){
            scoreTag = '<span>¡Sobresaliente! 🎉 Has respondido correctamente '+ userScore +' de '+ questions.length +' preguntas en ' + duration + ' minutos. </span>';
            scoreText.html(scoreTag);  //adding new span tag inside score_Text
            if(time[0]==1){
                text = '¡Sobresaliente! Has respondido correctamente '+ userScore +' de '+ questions.length +' preguntas en ' + time[0] + ' minuto y ' + time[1] + ' segundos. Por lo tanto has conseguido un total de ' + score_round + ' puntos';
            }else{
                text = '¡Sobresaliente! Has respondido correctamente '+ userScore +' de '+ questions.length +' preguntas en ' + time[0] + ' minutos y ' + time[1] + ' segundos. Por lo tanto has conseguido un total de ' + score_round + ' puntos';
            }
        }else{
            scoreTag = '<span>¡Sobresaliente! 🎉 Has respondido correctamente '+ userScore +' de '+ questions.length +' preguntas en ' + duration + ' segundos. </span>';
            scoreText.html(scoreTag);  //adding new span tag inside score_Text
            text = '¡Sobresaliente! Has respondido correctamente '+ userScore +' de '+ questions.length +' preguntas en ' + time[1] + ' segundos. Por lo tanto has conseguido un total de ' + score_round + ' puntos';
        }
    }
    else if (score_round >= 65){ // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        // scoreTag = '<span>and congrats! 🎉, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        if (time[0] > 0){
            scoreTag = '<span>¡Lo has hecho genial! 👏 Has respondido correctamente '+ userScore +' de '+ questions.length +' preguntas en ' + duration + ' minutos. </span>'; 
            scoreText.html(scoreTag);  //adding new span tag inside score_Text
            if(time[0]==1){
                text = '¡Lo has hecho genial! Has respondido correctamente '+ userScore +' de '+ questions.length +' preguntas en ' + time[0] + ' minuto y ' + time[1] + ' segundos. Por lo tanto has conseguido un total de ' + score_round + ' puntos';
            }else{
                text = '¡Lo has hecho genial! Has respondido correctamente '+ userScore +' de '+ questions.length +' preguntas en ' + time[0] + ' minutos y ' + time[1] + ' segundos. Por lo tanto has conseguido un total de ' + score_round + ' puntos';
            }
        }else{
            scoreTag = '<span>¡Lo has hecho genial! 👏 Has respondido correctamente '+ userScore +' de '+ questions.length +' preguntas en ' + duration + ' segundos. </span>'; 
            scoreText.html(scoreTag);  //adding new span tag inside score_Text
            text = '¡Lo has hecho genial! Has respondido correctamente '+ userScore +' de '+ questions.length +' preguntas en ' + time[1] + ' segundos. Por lo tanto has conseguido un total de ' + score_round + ' puntos';
        }
    }
    else if(score_round >= 40){ // if user scored more than 1
        // scoreTag = '<span>and nice 😎, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        if (time[0] > 0){
            scoreTag = '<span>¡No está nada mal! 😎 Has respondido correctamente '+ userScore +' de '+ questions.length +' preguntas en ' + duration + ' minutos. </span>'; 
            scoreText.html(scoreTag);
            if(time[0]==1){
                text = '¡No está nada mal! Has respondido correctamente '+ userScore +' de '+ questions.length +' preguntas en ' + time[0] + ' minuto y ' + time[1] + ' segundos. Por lo tanto has conseguido un total de ' + score_round + ' puntos';
            }else{
                text = '¡No está nada mal! Has respondido correctamente '+ userScore +' de '+ questions.length +' preguntas en ' + time[0] + ' minutos y ' + time[1] + ' segundos. Por lo tanto has conseguido un total de ' + score_round + ' puntos';
            }
        }else{
            scoreTag = '<span>¡No está nada mal! 😎 Has respondido correctamente '+ userScore +' de '+ questions.length +' preguntas en ' + duration + ' segundos. </span>'; 
            scoreText.html(scoreTag);
            text = '¡No está nada mal! Has respondido correctamente '+ userScore +' de '+ questions.length +' preguntas en ' + time[1] + ' segundos. Por lo tanto has conseguido un total de ' + score_round + ' puntos';
        }
    }
    else if(score_round >= 25){ // if user scored more than 1
        // scoreTag = '<span>and nice 😎, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        if(time[0] > 0){
            scoreTag = '<span>Te veo un poco floj@... 😔 Has respondido correctamente '+ userScore +' de '+ questions.length +' preguntas en ' + duration + ' minutos. </span>'; 
            scoreText.html(scoreTag);
            if(time[0]==1){
                text = 'Te veo un poco flojo. Has respondido correctamente '+ userScore +' de '+ questions.length +' preguntas en ' + time[0] + ' minuto y ' + time[1] + ' segundos. Por lo tanto has conseguido un total de ' + score_round + ' puntos';
            }else{
                text = 'Te veo un poco flojo. Has respondido correctamente '+ userScore +' de '+ questions.length +' preguntas en ' + time[0] + ' minutos y ' + time[1] + ' segundos. Por lo tanto has conseguido un total de ' + score_round + ' puntos';
            }
            
        }else{    
            scoreTag = '<span>Te veo un poco floj@... 😔 Has respondido correctamente '+ userScore +' de '+ questions.length +' preguntas en ' + duration + ' segundos. </span>'; 
            scoreText.html(scoreTag);
            text = 'Te veo un poco flojo. Has respondido correctamente '+ userScore +' de '+ questions.length +' preguntas en ' + time[1] + ' segundos. Por lo tanto has conseguido un total de ' + score_round + ' puntos';
        }
    }
    else{ // if user scored less than 1
        if(time[0] > 0){
            scoreTag = '<span>Hoy no es tu día... 😢 Solo has respondido correctamente '+ userScore +' de '+ questions.length +' preguntas en ' + duration + ' minutos. </span>';
            scoreText.html(scoreTag);
            if(time[0]==1){
                text = 'Hoy no es tu día. Solo has respondido correctamente '+ userScore +' de '+ questions.length +' preguntas en ' + time[0] + ' minuto y ' + time[1] + ' segundos. Por lo tanto has conseguido un total de ' + score_round + ' puntos';
            }else{
                text = 'Hoy no es tu día. Solo has respondido correctamente '+ userScore +' de '+ questions.length +' preguntas en ' + time[0] + ' minutos y ' + time[1] + ' segundos. Por lo tanto has conseguido un total de ' + score_round + ' puntos';
            }
        }else{
            scoreTag = '<span>Hoy no es tu día... 😢 Solo has respondido correctamente '+ userScore +' de '+ questions.length +' preguntas en ' + duration + ' segundos. </span>';
            scoreText.html(scoreTag);
            text = 'Hoy no es tu día. Solo has respondido correctamente '+ userScore +' de '+ questions.length +' preguntas en ' + time[1] + ' segundos. Por lo tanto has conseguido un total de ' + score_round + ' puntos';
        }
    }

    resultado = [text, score_round]
}

function startCountdown(time){
    
    counter = setInterval(timer, 1000);
    function timer(){
        $('.countdown .timer_sec').text(time); //changing the value of timeCount with time value
        time--; //decrement the time value
        if(time < 9){ //if timer is less than 9
            var addZero = $('.countdown .timer_sec').text(); 
            $('.countdown .timer_sec').text("0" + addZero); //add a 0 before time value
        }
        if(time < 0){ //if timer is less than 0
            timeAnswer = 30;
            
            clearInterval(counter); //clear counter
            $('.countdown .time_left_txt').text("Tiempo agotado"); //change the time text to time off
            var allOptions = $('.option_list .option').length; //getting all option items
            var correcAns = questions[que_count].answer; //getting correct answer from array
            for(i=0; i < allOptions; i++){
                opt = $($('.option_list .option').get(i))
                if(opt.text() == correcAns){ //if there is an option which is matched to an array answer  
                    opt.attr("class", "option correct"); //adding green color to matched option
                    opt.append(tickIconTag); //adding tick icon to matched option
                }
                else{
                    opt.attr("class", "option incorrect"); //adding green color to matched option
                    opt.append(crossIconTag);
                }
            }
            for(i=0; i < allOptions; i++){
                $($('.option_list .option').get(i)).addClass("disabled"); //once user select an option then disabled all options
            }
            $('footer .next_btn').addClass("show"); //show the next button if user selected any option
            setCronometro("stop", 300);

            // TODO: lanzar la senal reaccionRespuesta negativa. 

        }
    }
}

function startCountdownLine(time){
    counterLine = setInterval(timer, 58);
    function timer(){
        time += 1; //upgrading time value with 1
        $('header .time_line').css("width", time+"px"); //increasing width of time_line with px by time value
        if(time > 549){ //if time value is greater than 549    
            clearInterval(counterLine); //clear counterLine
        }
    }
}

function queCounter(index){
    //creating a new span tag and passing the question number and total question
    var totalQueCounTag = '<span>'+ index +' de '+ questions.length +' preguntas</span>';
    $("footer .total_que").html(totalQueCounTag);  //adding new span tag inside bottom_ques_counter
}

function setCronometro(palabra, tiempo) {
    CrearCookie('carga', 'false');
    time = setTimeout(function () {
        if (palabra === "start") startTimer();
        else if (palabra === "stop") stopTimer();
        else if (palabra === "restart") clearTimer();
    }, tiempo);
}

function CrearCookie(nombre, valor)
{
    Cookies.set(nombre, valor);
}

function loadQuestions()
{
    var keys = ["numb","category","question","answer", "options"];
    var arr = [];
    var questions_code = randomUniqueArray();
    console.debug("Questions code: ", questions_code)
    for(i=0; i < questions_length; i++){
        // Get random category of questions
        type_index = Math.floor(questions_code[i]/question_per_category)
        console.debug("Type index: ", type_index)
        que_type_list = categories_list[type_index];
        console.debug("Que Type List: ", que_type_list)
        // Complete questions array
        var q = questions_code[i] % question_per_category
        var obj = {};

        console.debug("Q: ", q)
        console.debug("List[q]: ", que_type_list[q])
        obj[keys[0]] = i + 1;
        obj[keys[1]] = escapeHtml(que_type_list[q].category);
        obj[keys[2]] = escapeHtml(que_type_list[q].question);
        obj[keys[3]] = escapeHtml(que_type_list[q].correct_answer);
        list = [escapeHtml(que_type_list[q].correct_answer), escapeHtml(que_type_list[q].incorrect_answers[0]), escapeHtml(que_type_list[q].incorrect_answers[1]), escapeHtml(que_type_list[q].incorrect_answers[2])];
        obj[keys[4]] = shuffle(list)
        arr.push(obj);
    }
    return arr;
}

function randomUniqueArray(){
    var arr = [];
    while(arr.length < questions_length){
        var r = Math.floor(Math.random() * categories_list.length * question_per_category);
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

function escapeHtml(text) {
    var map = {
        '&amp;': '&',
        '&#038;': "&",
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#039;': "'",
        '&#8217;': "’",
        '&#8216;': "‘",
        '&#8211;': "–",
        '&#8212;': "—",
        '&#8230;': "…",
        '&#8221;': '”'
    };
    
    return text.replace(/\&[\w\d\#]{2,5}\;/g, function(m) { return map[m]; });
  }


// TODO: crear la funcion raiseEvent como en el behavior de Registro, donde hay un tiempo
// de espera despues de lanzar la senal