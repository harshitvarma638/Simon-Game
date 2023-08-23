var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];//the game sequence
var userClickedPattern = [];//The pattern which User clicked

var started = false;

var level = 0;

$(document).keypress(function() {
    if(!started)
    {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){

        if(gamePattern.length == userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        playSound("wrong");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function nextSequence()
{
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(4*Math.random());
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    playSound(randomChosenColour);
    onClick(randomChosenColour);
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    playSound(userChosenColour);
    onClick(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function onClick(color)
{
    $("#" + color).fadeIn(100).fadeOut(100).fadeIn(100);
    $("#" + color).addClass("pressed");
    setTimeout(function(){
        $("#" + color).removeClass("pressed");
    }, 100);
}