
function SquareView(col, row, isMine, numSurrounding)
{
    var squareImage = new Image();
    squareImage.src = "assets/square.png";
    var squareBitmap = new createjs.Bitmap("assets/square.png");
    squareBitmap.x = GRID_X + (col * squareImage.width);
    squareBitmap.y = GRID_Y + (row * squareImage.height);

    var HOLD_TIME = 0.5;
    var pressTime;
    var flagged = false;

    var flagBitmap;

    var showMine = function()
    {
        var mineImage = new Image();
        mineImage.src = "assets/mine.png";
        var mineBitmap = new createjs.Bitmap("assets/mine.png");
        mineBitmap.x = squareBitmap.x;
        mineBitmap.y = squareBitmap.y;

        stage.addChild(mineBitmap);

        EventManager.dispatch(new createjs.Event(GameEvent.MINE));
    };

    var showNumSurrounding = function()
    {
        var numSurroundingText = new createjs.Text('0', 'bold 40px Arial', '#000000');
        numSurroundingText.text = "£" + numSurrounding;
        numSurroundingText.x = squareBitmap.x + (squareImage.width / 2);
        numSurroundingText.y = squareBitmap.y + (squareImage.height / 2);

        stage.addChild(numSurroundingText);

        EventManager.dispatch(new ScoreEvent(numSurrounding));
    };

    var revealSquare = function()
    {
        stage.removeChild(squareBitmap);

        if (isMine == true)
        {
            showMine();
        }
        else if (numSurrounding > 0)
        {
            showNumSurrounding();
        }
    };

    var deFlag = function()
    {
        flagged = false;
        stage.removeChild(flagBitmap);
        flagBitmap = null;
    };

    var plantFlag = function()
    {
        flagged = true;
        flagBitmap = new createjs.Bitmap("assets/flag.png");
        flagBitmap.x = squareBitmap.x;
        flagBitmap.y = squareBitmap.y;

        stage.addChild(flagBitmap);
    };

    var onSquareMouseDown = function(event)
    {
        pressTime = Date.now();
        squareBitmap.removeEventListener('mousedown', onSquareMouseDown);
        squareBitmap.addEventListener('pressup', onSquareMouseUp);
    };

    var onSquareMouseUp = function(event)
    {
        squareBitmap.removeEventListener('pressup', onSquareMouseUp);
        squareBitmap.addEventListener('mousedown', onSquareMouseDown);

        if (flagged == true)
        {
            deFlag();
        }
        else
        {
            if (((Date.now() - pressTime) / 1000) >= HOLD_TIME)
            {
                plantFlag();
            }
            else
            {
                revealSquare();
            }
        }
    };

    squareBitmap.addEventListener('mousedown', onSquareMouseDown);

    stage.addChild(squareBitmap);
}

