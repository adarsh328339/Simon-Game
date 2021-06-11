var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "green", "blue", "yellow"];
var level = 0;

function nextSequence() {
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  userClickedPattern.length = 0;

}
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);
  checkAnswer(userClickedPattern.length -1);
  playSound(userChosenColor);

});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("button").removeClass("pressed");
  }, 100);
}

$(document).one("keypress", function() {
  nextSequence();
  $("h1").text("Level " + level);

});

function checkAnswer(currentLevel) {
  if(currentLevel < gamePattern.length){
     if ((userClickedPattern[currentLevel]) == (gamePattern[currentLevel])) {
      console.log("Success!");
    } else {
       wrongCase();
    }
  }
  if((currentLevel+1) == gamePattern.length){
     if (JSON.stringify(userClickedPattern) == JSON.stringify(gamePattern)){
      setTimeout(nextSequence, 1000);
    }
    else {
      wrongCase();
    }
  }
}

function wrongCase() {
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  $("h1").text("Game-Over, Honey! Press any key to start");
  startOver();
}

function startOver() {
  level = 0;
  gamePattern.length = 0;
  userClickedPattern.length = 0;
  $(document).one("keypress", function() {
    nextSequence();
    $("h1").text("Level " + level);})
}
