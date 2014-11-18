var TIME_TO_PLAY = 30000;
var startTime;
var timeRemaining;
var countDownText;
var scoreText;

var score;

var GameView = function()
{
    stage.addChild(gameBackground);
    stage.update();

    MineGenerator.genNewGrid();

    countDownText = new createjs.Text('0', 'bold 40px Arial', '#FFFFFF');
    countDownText.x = canvas.width - 100;
    countDownText.y = 50;
    stage.addChild(countDownText);

    score = 0;

    scoreText = new createjs.Text('0', 'bold 40px Arial', '#FFFFFF');
    scoreText.x = 50;
    scoreText.y = 50;
    scoreText.text = "£" + score;
    stage.addChild(scoreText);

    stage.update();
    startTime = Date.now();

    GameView.addListeners();

    this.getScore = function()
    {
        return score;
    };
};

GameView.addListeners = function()
{
    EventManager.addListener(ScoreEvent.ADD_SCORE, updateScore);
};

function updateGameView()
{
    updateCountdown();
    stage.update();
}

function updateCountdown()
{
    timeRemaining = Math.ceil((TIME_TO_PLAY - (Date.now() - startTime)) / 1000);
    countDownText.text = "" + timeRemaining;

    if (timeRemaining == 0)
    {
        EventManager.dispatch(new createjs.Event(GameEvent.TIME_UP));
    }
}

function updateScore(event)
{
    score = score + event.getScoreToAdd();
    scoreText.text = "£" + score;
}

function hideGameView()
{
    stage.removeChild(gameBackground);
    stage.update();
}