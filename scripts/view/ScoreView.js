var endGameStatusText;
var finalScoreText;

function ScoreView(finalScore, endGameStatus)
{
    stage.addChild(scoreBackground);

    endGameStatusText = new createjs.Text('0', 'bold 40px Arial', '#000000');
    endGameStatusText.y = 100;
    endGameStatusText.text = endGameStatus;
    endGameStatusText.x = (canvas.width / 2) - (endGameStatusText.text.length * 10);
    stage.addChild(endGameStatusText);

    finalScoreText = new createjs.Text('0', 'bold 40px Arial', '#000000');
    finalScoreText.x = (canvas.width / 2);
    finalScoreText.y = 200;
    finalScoreText.text = "£" + finalScore;
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