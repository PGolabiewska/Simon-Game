var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

//tablica kolorów
var buttonColours = ["red", "blue", "green", "yellow"];

//Funkcja losuje kolor
function nextSequence() {

    userClickedPattern = [];
    level++;

    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    console.log(gamePattern);

    $("#"+randomChosenColour).fadeOut(300).fadeIn(300);
    playSound(randomChosenColour);
    
}

//dźwięki dla kolorów
function playSound(randomChosenColour) {

    switch(randomChosenColour) {
        case "green":
            var greenSound = new Audio("sounds/green.mp3")
            greenSound.play();
            break;

        case "red":
            var redSound = new Audio("sounds/red.mp3")
            redSound.play();
            break;

        case "yellow":
            var yellowSound = new Audio("sounds/yellow.mp3")
            yellowSound.play();
            break;

        case "blue":
            var blueSound = new Audio("sounds/blue.mp3")
            blueSound.play();
            break;

        default: console.log(randomChosenColour);
    }
}


//Kliknięcie przycisków

    $(".btn").on("click", function() {

        var userChosenColour = $(this).attr("id");
        playSound(userChosenColour);
        animatePress(userChosenColour);
        userClickedPattern.push(userChosenColour);

        console.log(userClickedPattern);

        checkAnswer(userClickedPattern.length-1);
        }
    )

//Start
    $(document).on("keydown", function() {

        start();
        started = true;
        }
    )

function start() {

    if (started===false) {
        
        nextSequence();
    }

    else {
    console.log(started);
    }
}
    


//Animacje

function animatePress(currentColour) {

    var activeButton = $("." + currentColour);

    activeButton.addClass("pressed");

    setTimeout(function() {
        activeButton.removeClass("pressed");
    }, 100);
}


//Sprawdzenie

function checkAnswer(currentLevel) {
    
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success");
        // jeśli użytkownik wykonał całą sekwencję poprawnie — przejdź do następnego poziomu
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        console.log("Wrong");

        var wrong = new Audio('sounds/wrong.mp3');
        wrong.play();

        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");

        
        startOver()
    }
}


function startOver() {

    gamePattern = [];
    started = false;
    level = 0; 
}