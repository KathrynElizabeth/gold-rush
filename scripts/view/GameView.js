var TIME_TO_PLAY = 30000;
var startTime;
var timeRemaining;
var countDownText;
var scoreText;
var remainingMinesText;
var score;
var lastTime;

var remainingMines = 3;

var GameView = function()
{
    music = createjs.Sound.play("music");
    stage.addChild(gameBackground);
    stage.update();

    MineGenerator.genNewGrid();

    timerUI.x = canvas.width - 160;
    timerUI.y = 15;
    stage.addChild(timerUI);

    countDownText = new createjs.Text('0', 'bold 40px Arial', '#FFFFFF');
    countDownText.x = timerUI.x + 80;
    countDownText.y = timerUI.y + 17;
    stage.addChild(countDownText);

    mine.x = timerUI.x;
    mine.y = timerUI.y + timerUI.image.height;
    stage.addChild(mine);

    remainingMinesText = new createjs.Text('0', 'bold 40px Arial', '#FFFFFF');
    remainingMinesText.x = countDownText.x;
    remainingMinesText.y = mine.y + 20;
    remainingMinesText.text = "" + remainingMines;
    stage.addChild(remainingMinesText);

    goldUI.x = 10;
    goldUI.y = 10;
    stage.addChild(goldUI);

    score = 0;

    scoreText = new createjs.Text('0', 'bold 40px Arial', '#7c3700');
    scoreText.x = goldUI.x + 25;
    scoreText.y = goldUI.y + 15;
    scoreText.text = "£   " + score;
    stage.addChild(scoreText);

    stage.update();
    startTime = Date.now();
    lastTime = startTime;

    GameView.addListeners();

    this.getScore = function()
    {
        return score;
    };
};

GameView.addListeners = function()
{
    EventManager.addListener(ScoreEvent.ADD_SCORE, updateScore);
    EventManager.addListener(GameEvent.FLAG, flagMine);
    EventManager.addListener(GameEvent.DE_FLAG, deFlagMine);
    EventManager.addListener(EmptyEvent.EMPTY_REVEALED, onEmptyRevealed);
};

function flagMine(event)
{
    remainingMines--;
    remainingMinesText.text = "" + remainingMines;
}

function deFlagMine(event)
{
    remainingMines++;
    remainingMinesText.text = "" + remainingMines;
}

function onEmptyRevealed(event)
{
    checkForSurroundingEmpties(event.getCol(), event.getRow());
}

function checkForSurroundingEmpties(col, row)
{
    var surroundingSquares = getSurroundingSquares(col, row);

    for (var i = 0; i < surroundingSquares.length; i++)
    {
        surroundingSquares[i].revealSquare();
    }
}
function getSurroundingSquares(col, row)
{
    var surroundingSquares = new Array();

    var hasLeftSquare = col > 0;
    var hasRightSquare = col < GRID_WIDTH - 1;
    var hasTopSquare = row > 0;
    var hasBottomSquare = row < GRID_HEIGHT - 1;

    var squareView;

    if (hasLeftSquare)
    {
        squareView = gameGrid[col - 1][row];
        if (isSquareToBeRevealed(squareView))
        {
            surroundingSquares.push(squareView);
        }
    }

    if (hasRightSquare)
    {
        squareView = gameGrid[col + 1][row];
        if (isSquareToBeRevealed(squareView))
        {
            surroundingSquares.push(gameGrid[col + 1][row]);
        }
    }

    if (hasBottomSquare)
    {
        squareView = gameGrid[col][row + 1];
        if (isSquareToBeRevealed(squareView))
        {
            surroundingSquares.push(squareView);
        }
    }

    if (hasTopSquare)
    {
        squareView = gameGrid[col][row - 1];
        if (isSquareToBeRevealed(squareView))
        {
            surroundingSquares.push(squareView);
        }
    }

    return surroundingSquares;
}

function isSquareToBeRevealed(squareView)
{
    return (squareView.isEmpty && (squareView.revealed == false));
}

function updateGameView()
{
    updateCountdown();
    stage.update();
}

function updateCountdown()
{
    timeRemaining = Math.ceil((TIME_TO_PLAY - (Date.now() - startTime)) / 1000);

    if (lastTime - timeRemaining >= 1)
    {
        lastTime = timeRemaining;
        tickSound = createjs.Sound.play("tick");
    }
    countDownText.text = "" + timeRemaining;

    if (timeRemaining == 0)
    {
        EventManager.dispatch(new createjs.Event(GameEvent.TIME_UP));
    }
}

function updateScore(event)
{
    score = score + event.getScoreToAdd();
    scoreText.text = "£   " + score;
}

function hideGameView()
{
    stage.removeChild(gameBackground);
    stage.update();
}