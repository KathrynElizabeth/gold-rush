
//GameEvent.prototype = new createjs.Event("");
//GameEvent.prototype.constructor = GameEvent;

var GameEvent = function()
{
};

GameEvent.MINE = "mine";
GameEvent.TIME_UP = "timeup";
GameEvent.GAME_OVER = "gameover";
GameEvent.START_GAME = "start game";
GameEvent.WIN = "win game";
GameEvent.FLAG = "flag";
GameEvent.DE_FLAG = "deflag";
GameEvent.EMPTY = "empty";