var canvas;
var stage;

var gameView;
var titleView;
var scoreView;

var playingGame;
var eventManager;

var gameStatus;

function Main()
{
    createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.FlashPlugin]);
    createjs.Sound.alternateExtensions = ["mp3"];
	canvas = document.getElementById('GoldRushStage');
	stage = new createjs.Stage(canvas);

	PreloadCommand.execute(onPreloadComplete);

    createjs.Touch.enable(stage);
	createjs.Ticker.setFPS(30);

    eventManager = new EventManager();
}

function onPreloadComplete()
{
    addListeners();
	showTitleScreen();
}

function addListeners()
{
    EventManager.addListener(GameEvent.START_GAME, startGame);
    EventManager.addListener(GameEvent.MINE, onMineExposed);
    EventManager.addListener(GameEvent.TIME_UP, onTimeUp);
    EventManager.addListener(GameEvent.GAME_OVER, onGameOver);
    EventManager.addListener(GameEvent.WIN, onGameWin);
}

function showTitleScreen()
{
    titleView = new TitleView();
}


function onTimeUp(event)
{
    gameStatus = "Time Up!";
    EventManager.dispatch(new createjs.Event(GameEvent.GAME_OVER));
}

function onPlayButtonPress()
{
	hideTitleView();
	EventManager.dispatch(new createjs.Event(GameEvent.START_GAME));
}

function startGame(event)
{
    playingGame = true;
    gameView = new GameView();
    createjs.Ticker.addEventListener("tick", update);
}

function update()
{
    if (playingGame)
    {
        gameView.update();
    }

    stage.update();
}

function onMineExposed(event)
{
    gameView.removeListeners();
    gameStatus = "Bombed!";
    playingGame = false;
    setTimeout(onMineDelay, 2000);
}

function onMineDelay()
{
    EventManager.dispatch(new createjs.Event(GameEvent.GAME_OVER));
}

function onGameOver(event)
{
    createjs.Ticker.removeEventListener("tick", update);
    hideGameView();
    showScoreScreen();
}

function onGameWin(event)
{
    gameStatus = "You win!";
    showScoreScreen();
}

function showScoreScreen()
{
    scoreView = new ScoreView(gameView.getScore(), gameStatus);
}