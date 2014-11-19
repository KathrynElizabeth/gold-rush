var endGameStatusText;
var finalScoreText;
var coinBitmap;

function ScoreView(finalScore, endGameStatus)
{
    createjs.Sound.stop();
    stage.addChild(scoreBackground);

    endGameStatusText = new createjs.Text('0', 'bold 40px RedStateBlueState', '#ee0000');
    endGameStatusText.y = 100;
    endGameStatusText.text = endGameStatus;
    endGameStatusText.x = (canvas.width / 2) - (endGameStatusText.getMeasuredWidth() / 2);
    stage.addChild(endGameStatusText);

    coinBitmap = new createjs.Bitmap("assets/gold_coin.png");
    coinBitmap.x = (canvas.width / 2) - (coinBitmap.image.width);
    coinBitmap.y = 170;
    stage.addChild(coinBitmap);

    finalScoreText = new createjs.Text('0', 'bold 40px RedStateBlueState', '#7c3700');
    finalScoreText.x = coinBitmap.x + 27;
    finalScoreText.y = coinBitmap.y + 20;
    finalScoreText.text = "£  " + finalScore;
    stage.addChild(finalScoreText);

    playAgainButton.x = (canvas.width / 2) - (playAgainButton.image.width / 2);
    playAgainButton.y = (canvas.height - 200);
    playAgainButton.addEventListener('click', onPlayAgainButtonPress);
    stage.addChild(playAgainButton);
    stage.update();
}

function onPlayAgainButtonPress(event)
{
    stage.removeChild(playAgainButton);
    stage.removeChild(scoreBackground);
    stage.update();
    EventManager.dispatch(new createjs.Event(GameEvent.START_GAME));
}