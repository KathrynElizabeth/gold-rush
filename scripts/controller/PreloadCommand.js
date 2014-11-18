var preloader;
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

var _preloaderCallback;

var PreloadCommand = function ()
{

};

PreloadCommand.execute = function(preloaderCallback)
{
	_preloaderCallback = preloaderCallback;

	manifest = [
		{src:"assets/titleBackground.png", id:"titleBackground"},
		{src:"assets/gameBackground.png", id:"gameBackground"},
		{src:"assets/scoreBackground.png", id:"scoreBackground"},
		{src:"assets/playButton.png", id:"playButton"},
        {src:"assets/playAgainButton.png", id:"playAgainButton"},
        {src:"assets/square.png", id:"square"},
        {src:"assets/gold_coin.png", id:"goldUI"},
        {src:"assets/mine.png", id:"mine"},
        {src:"assets/timer.png", id:"timerUI"}
	]

	preloader = new PreloadJS();
	preloader.onProgress = onPreloaderProgress;
	preloader.onFileLoad = onPreloaderFileLoad;
	preloader.onComplete = onPreloaderComplete;
	preloader.loadManifest(manifest);
};


function onPreloaderProgress(event)
{
	console.log("main, onPreloaderProgress");
}

function onPreloaderFileLoad(event)
{
	switch(event.type)
	{
		case PreloadJS.IMAGE:
			var image = new Image();
			image.src = event.src;
			image.onload = onFileLoadComplete;
			window[event.id] = new createjs.Bitmap(event.src);
		break;

		case PreloadJS.SOUND:
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

function onPreloaderComplete(event)
{
	console.log("main, onPreloaderComplete");
}