const start_btn = document.querySelector(".start_btn button");

const quiz_box = document.querySelector(".quiz_box");
const option_list = document.querySelector(".option_list");
const timeCount = quiz_box.querySelector(".timer .timer_sec");


start_btn.onclick = ()=>{
    quiz_box.classList.add("activeQuiz");
    MostrarPreguntas(0);
 //   queCounter(1);
    startTimer(20);
}

let que_count = 0;
let que_numb = 1; 
let counter;  
let timeValue = 20;
let userScore = 0;

const next_btn = quiz_box.querySelector("footer .next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

quit_quiz.onclick = ()=>{
    window.location.reload();
}

next_btn.onclick = ()=>{
    if(que_count < preguntas.length - 1){
        que_count++;
        que_numb++;
        MostrarPreguntas(que_count);
       // queCounter(que_numb);
       clearInterval(counter);
        startTimer(timeValue);
        next_btn.style.display = "none";
    }else{
        console.log("Completado");
        showResultBox();
    }
}

function MostrarPreguntas(index){
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>'+ preguntas[index].numb + ". " + preguntas[index].pregunta +'</span>';
    let option_tag = '<div class="option">' + preguntas[index].opciones[0] + '<span></span></div>'
                    + '<div class="option">' + preguntas[index].opciones[1] + '<span></span></div>'
                    + '<div class="option">' + preguntas[index].opciones[2] + '<span></span></div>'
                    + '<div class="option">' + preguntas[index].opciones[3] + '<span></span></div>';
                    
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    
    const option  = option_list.querySelectorAll(".option");
    for(let i = 0; i < option.length; i++){
        option[i].setAttribute("onclick","optionSelected(this)");
    }

}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon ='<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(respuesta){
    clearInterval(counter);
    let userAns = respuesta.textContent;
    let correctAns  = preguntas[que_count].respuesta;
    let allOptions = option_list.children.length;

    if(userAns == correctAns){
        respuesta.classList.add("correct");
        respuesta.insertAdjacentHTML("beforeend",tickIcon);
        userScore += 1;
    }else{
        respuesta.classList.add("incorrect");
        respuesta.insertAdjacentHTML("beforeend",crossIcon);

        // si la respuesta es incorrecta, mostrar automaticamente la correcta
        for(let i = 0; i < allOptions; i++){
            if(option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute("class","option correct");
                option_list.children[i].insertAdjacentHTML("beforeend",tickIcon);
            }
        }

        
    }

    //desabilitar todas las opciones
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
        
    }

    next_btn.style.display = "block";

    

}

function showResultBox(){
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score_text");
    if(scoreText > 3){
        let scoreTag = '<span>Felicidades, tuviste <p>' + userScore + '</p> respuestas correctas de <p>'+ preguntas.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 1){
        let scoreTag = '<span>OK, tuviste <p>' + userScore + '</p> respuestas correctas de <p>'+ preguntas.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = '<span>Lo siento, tuviste <p>' + userScore + '</p> respuestas correctas de <p>'+ preguntas.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer,1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 0){
            clearInterval(counter);
            timeCount.textContent = "00";
        }
    }
}

/*
function queCounter(index){
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag = '<span><p>' + index + '</p>of<p>' + preguntas.length + '</p>Preguntas</span>';
    bottom_ques_counter.innerHTML = totalQuesCountTag;    
}*/