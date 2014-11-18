
ScoreEvent.ADD_SCORE = "add score";
ScoreEvent.prototype = new createjs.Event(ScoreEvent.ADD_SCORE);
ScoreEvent.prototype.constructor = ScoreEvent;

function ScoreEvent(scoreToAdd)
{
    this.getScoreToAdd = function()
    {
        return scoreToAdd;
    };
}