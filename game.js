var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var current = 0;
var start = false;

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  level++;
  $("#level-title").text("Level " + level);
  userClickedPattern = [];
  current = 0;
}

function animatePress(currentColor) {
  $("."+currentColor).addClass("pressed");
  setTimeout(function () {
    $("."+currentColor).removeClass("pressed");
  }, 100);
}

$(document).on("keydown", function(e) {
  if(e.key===" ")
    if(current===0 && level===0) {
      nextSequence();
      start = true;
    }
});


$(".btn").on("click", function (e) {
  if(start){
    var userChosenColor = e.target.id;
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);

    if(userChosenColor===gamePattern[current]) {
      playSound(userChosenColor);
      current++;
      if(current===gamePattern.length){
        var audio = new Audio("http://commondatastorage.googleapis.com/codeskulptor-assets/week7-brrring.m4a");
        audio.play();
        setTimeout(nextSequence, 1000);
      }
    } else {
      $("#level-title").html("Game Over!<br>Your Score: Level " + (level-1) + "<br>Press Space to restart.");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function (){
        $("body").removeClass("game-over");
      },100);
      current = 0;
      level = 0;
      start = false;
      gamePattern = [];
      userClickedPattern = [];
    }
  }
});
