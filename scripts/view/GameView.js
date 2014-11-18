var TIME_TO_PLAY = 30000;
var startTime;
var timeRemaining;
var countDownText;
var scoreText;
var remainingMinesText;

var score;

var remainingMines = 3;

var GameView = function()
{
    stage.addChild(gameBackground);
    stage.update();

    MineGenerator.genNewGrid();

    countDownText = new createjs.Text('0', 'bold 40px Arial', '#FFFFFF');
    countDownText.x = canvas.width - 100;
    countDownText.y = 50;
    stage.addChild(countDownText);

    remainingMinesText = new createjs.Text('0', 'bold 40px Arial', '#FFFFFF');
    remainingMinesText.x = countDownText.x;
    remainingMinesText.y = countDownText.y + 50;
    remainingMinesText.text = "" + remainingMines;
    stage.addChild(remainingMinesText);

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
    console.log("revealed: " + squareView.revealed);
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