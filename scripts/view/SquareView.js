
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
    var revealed = false;
    var isPressing = false;

    var flagBitmap;

    var showMine = function()
    {
        var mineImage = new Image();
        mineImage.src = "assets/mine.png";
        var mineBitmap = new createjs.Bitmap("assets/mine.png");
        mineBitmap.x = squareBitmap.x;
        mineBitmap.y = squareBitmap.y;

        stage.addChild(mineBitmap);

        createjs.Sound.play("explosion");

        EventManager.dispatch(new createjs.Event(GameEvent.MINE));
    };

    var showNumSurrounding = function()
    {
        var coinBitmap = new createjs.Bitmap("assets/gold_coin.png");
        coinBitmap.x = squareBitmap.x;
        coinBitmap.y = squareBitmap.y;

        stage.addChild(coinBitmap);

        var numSurroundingText = new createjs.Text('0', 'bold 40px RedStateBlueState', '#7c3700');
        numSurroundingText.text = numSurrounding;
        numSurroundingText.x = squareBitmap.x + 27;
        numSurroundingText.y = squareBitmap.y + (numSurroundingText.getMeasuredHeight()/1.5);

        stage.addChild(numSurroundingText);

        createjs.Sound.play("coin");

        EventManager.dispatch(new ScoreEvent(numSurrounding));
    };

    function revealSquare()
    {
        squareBitmap.removeEventListener('mousedown', onSquareMouseDown);
        this.revealed = true;
        stage.removeChild(squareBitmap);

        if (flagged)
        {
            deFlag();
        }

        if (isMine == true)
        {
            showMine();
        }
        else if (numSurrounding > 0)
        {
            showNumSurrounding();
        }
        else
        {
            createjs.Sound.play("dirt");
            EventManager.dispatch(new EmptyEvent(col, row));
        }
    }

    var deFlag = function()
    {
        flagged = false;
        stage.removeChild(flagBitmap);
        flagBitmap = null;

        createjs.Sound.play("flag");

        EventManager.dispatch(new createjs.Event(GameEvent.DE_FLAG));
    };

    var plantFlag = function()
    {
        flagged = true;
        flagBitmap = new createjs.Bitmap("assets/flag.png");
        flagBitmap.x = squareBitmap.x;
        flagBitmap.y = squareBitmap.y;

        createjs.Sound.play("flag");

        stage.addChild(flagBitmap);

        EventManager.dispatch(new createjs.Event(GameEvent.FLAG));
    };

    var onSquareMouseDown = function(event)
    {
        pressTime = Date.now();
        squareBitmap.addEventListener('pressup', onSquareMouseUp);

        if (flagged == false)
        {
            squareBitmap.addEventListener('tick', checkForHold);
        }
    };

    function checkForHold(event)
    {
        if (((Date.now() - pressTime) / 1000) >= HOLD_TIME)
        {
            squareBitmap.removeEventListener('tick', checkForHold);
            squareBitmap.removeEventListener('pressup', onSquareMouseUp);
            plantFlag();
        }
    }

    var onSquareMouseUp = function(event)
    {
        squareBitmap.removeEventListener('pressup', onSquareMouseUp);
        squareBitmap.removeEventListener('tick', checkForHold);

        if (flagged == true)
        {
            deFlag();
        }
        else
        {
            revealSquare();
        }
    };

    function removeListeners()
    {
        squareBitmap.removeEventListener('mousedown', onSquareMouseDown);
    }

    squareBitmap.addEventListener('mousedown', onSquareMouseDown);

    stage.addChild(squareBitmap);

    var squareView =
    {
        revealSquare:revealSquare,
        isEmpty:numSurrounding == 0,
        revealed:revealed,
        removeListeners:removeListeners
    };


    return squareView;
}

