let gamePattern = [];
let userClickedPattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let level = 0;
let sessionStarted = false;

$(document).keypress(function () {
    if (!sessionStarted) {
        $("#level-title").text(`Level ${level}`);
        sessionStarted = true;
        nextSequence();
    }
});

function nextSequence() {
    $("#level-title").text(`Level ${++level}`);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);

    $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

};

$(".btn").on("click", function () {
    userChosenColor = this.id;
    playSound(userChosenColor);
    userClickedPattern.push(userChosenColor);
    animationPressed(userChosenColor);
    checkAnswer(level - 1);
});

function animationPressed(userChosenColor) {
    $(`.${userChosenColor}`).addClass("pressed");
    setTimeout(function () {
        $(`.${userChosenColor}`).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    new Audio(`sounds/${name}.mp3`).play();
};

function checkAnswer(currentLevel) {
    let answer = userClickedPattern[currentLevel];
    let expected = gamePattern[currentLevel];
    if (answer === expected) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        };
    } else {
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
};

function startOver() {
    sessionStarted = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}