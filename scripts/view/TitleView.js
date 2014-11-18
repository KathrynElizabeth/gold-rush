
function TitleView()
{
    stage.addChild(titleBackground);

    playButton.x = (canvas.width / 2) - (playButton.image.width / 2);
    playButton.y = canvas.height - 100;
    playButton.addEventListener('click', onPlayButtonPress);
    stage.addChild(playButton);
    stage.update();
}

function hideTitleView()
{
    stage.removeChild(titleBackground);
    stage.removeChild(playButton);
    titleBackground = null;
    playButton = null;
    stage.update();
}

