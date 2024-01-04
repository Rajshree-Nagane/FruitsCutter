//jquery.js
var playing = false;//for currently game in progres
var score;
var trialsLeft;//for tracking remaining trials
var step;//represent step for falling fruits
var action; //used for setInterval
var fruits = ['apple', 'banana', 'cherries', 'grapes', 'mango', 'orange', 'peach', 'pear', 'watermelon'];

$(function(){
//click on start reset button
$("#startreset").click(function(){
    //we are playing
    if(playing == true){
        location.reload();
    }else{
        //we are not playing
        playing = true; 
        score = 0; //set score to 0
        $("#scorevalue").html(score);
        $("#trialsLeft").show();
        trialsLeft = 3;
        addHearts();
        $("#gameOver").hide();
        $("#startreset").html("Reset Game");
        startAction();
    }
});

    
//slice a fruit
$("#fruit1").mouseover(function(){
    score++;
    $("#scorevalue").html(score); //update score
    $("#slicesound")[0].play();//play sound
    clearInterval(action);
    $("#fruit1").hide("explode", 500); //slice fruit
    setTimeout(startAction, 800);
});
 
//functions

//fill trialLeft box with hearts
function addHearts(){
    $("#trialsLeft").empty();
    for(i = 0; i < trialsLeft; i++){
        $("#trialsLeft").append('<img src="images/heart.png" class="life">');
    }
}

//start sending fruits
function startAction(){
    $("#fruit1").show();
    chooseFruit(); //choose a random fruit
    $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50}); //random position
    step = 1+ Math.round(5*Math.random()); // change step   
    action = setInterval(function(){  
        $("#fruit1").css('top', $("#fruit1").position().top + step);                                  
        if($("#fruit1").position().top > $("#fruitsContainer").height()){
            if(trialsLeft > 1 ){
                $("#fruit1").show();
                chooseFruit(); //choose a random fruit
                $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50}); //random position
                step = 1+ Math.round(5*Math.random()); // change step
                trialsLeft --;
                addHearts();
            }else{ // game over
                playing = false; //we are not playing anymore
                $("#startreset").html("Start Game"); // change button to Start Game
                $("#gameOver").show();
                $("#gameOver").html('<p>Game Over!</p><p>Your score is '+ score +'</p>');
                $("#trialsLeft").hide();
                stopAction();
            }
        }
    }, 10);
}

// generate a random fruit
function chooseFruit(){
    $("#fruit1").attr('src' , 'images/' + fruits[Math.round(8*Math.random())] +'.png');   
}
//Stop dropping fruits
function stopAction(){
    clearInterval(action);
    $("#fruit1").hide();
}
});