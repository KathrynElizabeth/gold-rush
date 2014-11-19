var queue;
var manifest;
var totalLoaded = 0;

var titleBackground;
var gameBackground;
var scoreBackground;
var playButton;
var playAgainButton;
var square;
var mine;
var goldUI;
var timerUI;

var music;
var tickSound;

var _preloaderCallback;

var PreloadCommand = function ()
{

};

PreloadCommand.execute = function(preloaderCallback)
{
	_preloaderCallback = preloaderCallback;

	manifest = [
        {src:"assets/sounds/music.mp3", id:"music"},
        {src:"assets/sounds/tick.mp3", id:"tick"},
        {src:"assets/sounds/coin.mp3", id:"coin"},
        {src:"assets/sounds/dirt.mp3", id:"dirt"},
        {src:"assets/sounds/explosion.mp3", id:"explosion"},
        {src:"assets/sounds/flag.mp3", id:"flag"},
		{src:"assets/titleBackground.png", id:"titleBackground"},
		{src:"assets/gameBackground.png", id:"gameBackground"},
		{src:"assets/scoreBackground.png", id:"scoreBackground"},
		{src:"assets/playButton.png", id:"playButton"},
        {src:"assets/playAgainButton.png", id:"playAgainButton"},
        {src:"assets/square.png", id:"square"},
        {src:"assets/gold_coin.png", id:"goldUI"},
        {src:"assets/mine.png", id:"mine"},
        {src:"assets/timer.png", id:"timerUI"}
	];

    queue = new createjs.LoadQueue();
    queue.installPlugin(createjs.Sound);
    queue.on("fileload", onPreloaderFileLoad, this);
    queue.on("complete", onPreloaderComplete, this);
    queue.on("error", onPreloaderError, this);
    queue.on("progress", onPreloaderProgress, this);
    queue.loadManifest(manifest, true);

};

function onPreloaderProgress(event)
{
	console.log("main, onPreloaderProgress");
}

function onPreloaderFileLoad(event)
{
    var item = event.item;
    var type = item.type;

	switch(type)
	{
		case createjs.LoadQueue.IMAGE:
			window[item.id] = new createjs.Bitmap(item.src);
            onFileLoadComplete();
		break;

		case createjs.LoadQueue.SOUND:
            createjs.Sound.registerSound(item.src, item.id);
			onFileLoadComplete();
		break;
	}

}

function onFileLoadComplete(event)
{
	totalLoaded++;

	if (totalLoaded == manifest.length)
	{
		_preloaderCallback();
	}
}

function onPreloaderError(event)
{
    console.log('on preloader error');
}

function onPreloaderComplete(event)
{
	console.log("main, onPreloaderComplete");
}