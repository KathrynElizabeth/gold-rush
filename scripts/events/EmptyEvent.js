
EmptyEvent.EMPTY_REVEALED = "empty revealed";
EmptyEvent.prototype = new createjs.Event(EmptyEvent.EMPTY_REVEALED);
EmptyEvent.prototype.constructor = EmptyEvent;

function EmptyEvent(col, row)
{
    this.getCol = function()
    {
        return col;
    };

    this.getRow = function()
    {
        return row;
    };
}