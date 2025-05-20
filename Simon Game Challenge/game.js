gamePattern = [];
userClickedPattern = [];

buttonColours = ["red", "blue", "green", "yellow"];

var start = false

level = 0; 
$(document).on("keydown", function () {
    
    if(!start) {
        $("h1").text("Level 0");
        nextSequence();
        start = true;
    }

})


function nextSequence() {
    userClickedPattern = [];
    level ++;
    $("h1").text("Level" + level);
    random_number = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColours[random_number];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}

$(".btn").click(function () {
    userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    animatePress(userChosenColor);
    playSound(userChosenColor);

    checkAnswer((userClickedPattern.length-1));
})

function checkAnswer(click) {
    if(userClickedPattern[click] != gamePattern[click]) {
        // game over 
        audio_wrong = new Audio ("./sounds/wrong.mp3");
        $("h1").text("Game over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setInterval(() => {
            $("body").removeClass("game-over");
        }, 200);
        restart();
    }

    // if pattern matches,  go to next level
    else if(userClickedPattern.length == gamePattern.length) {
        setTimeout(() => {
            nextSequence();
        }, 1000);
    }
    
}

function restart() {
    start = false;
    level = 0;
    gamePattern = [];
}

function playSound(name) {
    audio = new Audio ("../sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("."+currentColour).addClass("pressed");
    setTimeout(() => {
        $("."+currentColour).removeClass("pressed");
    }, 100);
}