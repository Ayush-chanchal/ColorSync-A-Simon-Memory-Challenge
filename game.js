// alert("This is a javascript file");
// $("h1");
var buttonColours=["red", "blue", "green", "yellow"];

var userClickedPattern=[];
var started=false;
var level=0;

var gamePattern=[];

$(document).keypress(function()
{
    if(!started)
    {
        $("#level-title").text("Level"+level);
        nextSequence();
        started=true;
    }
});
$(".btn").click(function(){
    // console.log("clicked");
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        console.log("Success");
        if(userClickedPattern.length===gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("Wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function nextSequence(){
    userClickedPattern=[];

    level++;
    $("#level-title").text("Level "+level);

    var ran=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[ran];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    // var sound=new Audio("sounds/"+randomChosenColour+".mp3");
    // sound.play();

    playSound(randomChosenColour);
}

function startOver()
{
    level=0;
    gamePattern=[];
    started=false;
}
function playSound(name)
{
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}






