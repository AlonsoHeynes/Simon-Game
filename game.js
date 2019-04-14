// *** *** *** *** ***

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

function nextSequence() {

  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random()*4);
  console.log(randomNumber);

  var randomChosenColour = buttonColours[randomNumber];
  console.log(randomChosenColour);

  gamePattern.push(randomChosenColour);
  console.log(gamePattern);

  $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

  level++;
  $('h1').text('Level ' + level);
}

$('.btn').click(function(event){
  var userChosenColour = $(this).attr('id');

  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);

  playSound(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $('#' + currentColor).addClass('pressed');

    setTimeout(function() {
      $('#' + currentColor).removeClass('pressed');
    }, 100);
}

$(document).keypress(function() {
  if(!started) {
    $('h1').text('Level' + level);
      nextSequence();
      started = true;
  }
});

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    $('body').addClass('game-over');

    setTimeout(function() {
      $('body').removeClass('game-over');
    }, 200);

    $('h1').text('Game Over, Press Any Key to Restart');
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
