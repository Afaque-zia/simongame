// All Targets, and Array initializations
var colors = ["red", "green", "blue", "yellow"]
var gamerRound = 0;
var randomNumbers = [];
var userInputs = [];
var gameStarted=false;
var button = $("button")
var audio = new Audio("./music/gamebackgroundaudio.mp3");
var audioOnGameRound = new Audio("./music/userEvent.wav");
var audioOnGameOver = new Audio("./music/gameOver.wav");
// All Functions
function gameNotStarted() {
    $("#result").html("Please Start The Game")
    animate("result");
    animate("button");
}
// Listen KeyPress On Body for just check that game is started or not
$("body").keypress(function (){
    if(gameStarted === false){
        gameNotStarted();
    } 
});
// Function to start the game On Button Click
button.click(function () {
    audio.play();
    audio.volume = 0.5;
    generateNumber();
    button.hide();
    gameStarted = true;
})
// Function When User Click on any color box
$(".box").click( function (e) {
    if(gameStarted === false){
        gameNotStarted();
    }else{
        var targetElementId = e.delegateTarget.attributes[0].nodeValue;
        animate(targetElementId);
        userInputs.push(targetElementId);
        checkResult(userInputs.length - 1);
    }
})
// Function to animate any text or box on click
function animate(id) {
    audioOnGameRound.play();
    $("#"+id).fadeOut(30).fadeIn(30).fadeOut(30).fadeIn(30);
}
// Function to check is gamePattern and userInputs are same or not
function checkResult(number) {
    if(randomNumbers[number] === userInputs[number]){
        if(randomNumbers.length===userInputs.length)
        {
        userInputs = [];
        gamerRound++;
        setTimeout(() => {
            generateNumber();
        },800);
        $("#result").html(gamerRound)
        }
    }else{
        $("#result").html("Game Over");
        gamerRound = 0;
        randomNumbers = [];
        userInputs = [];
        gameStarted = false;
        audio.pause();
        audio.currentTime = 0;
        audioOnGameOver.play();
        button.show();
        animate("result");
        animate("button");
    }
}
// Function That Generate random number on every game round
function generateNumber() {
  var number = Math.floor(Math.random() * 4);
  randomNumbers.push(colors[number]);
  onGameRound();
}
// function to animate every following Game pattern
function onGameRound() {
    var count = 0;
    var x = setInterval(function () {
        var element = randomNumbers[count];
        $("#"+element).fadeOut(30).fadeIn(30).fadeOut(30).fadeIn(30);
        if(count == randomNumbers.length){
            count = 0;
            clearInterval(x)
        }
        count++
    }, 800)
}


