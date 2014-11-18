
var EventManager = function()
{
    createjs.EventDispatcher.initialize(EventManager.prototype);
};

EventManager.addListener = function(type, handler)
{
    EventManager.prototype.addEventListener(type, handler);
};

EventManager.removeListener = function(type, handler)
{
    EventManager.prototype.removeEventListener(type, handler);
};

EventManager.dispatch = function(event)
{
    EventManager.prototype.dispatchEvent(event);
};