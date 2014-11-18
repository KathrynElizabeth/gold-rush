
var gameGrid;
var mines;

var GRID_WIDTH = 5;
var GRID_HEIGHT = 5;

var GRID_X;
var GRID_Y = 50;

var NUM_MINES = 3;

// TODO do I need a grid array as well as a mines array?

var MineGenerator = function()
{

};

MineGenerator.genNewGrid = function()
{
    GRID_X = (canvas.width / 2) - ((GRID_WIDTH * square.image.width) / 2);

    gameGrid = new Array(GRID_WIDTH);

    for (var col = 0; col < GRID_WIDTH; col++)
    {
        gameGrid[col] = new Array(GRID_HEIGHT);
    }

    deMineGrid();
    randomizeMines();
    genSquares();
};

function deMineGrid()
{
    mines = new Array(GRID_WIDTH);

    for (var col = 0; col < GRID_WIDTH; col++)
    {
        mines[col] = new Array(GRID_HEIGHT);

        for (var row = 0; row < GRID_HEIGHT; row++)
        {
            mines[col][row] = 0;
        }
    }
}

function randomizeMines()
{
    var randomCol;
    var randomRow;

    for (var i = 0; i < NUM_MINES; i++)
    {
        randomCol = Math.floor(Math.random() * GRID_WIDTH);
        randomRow = Math.floor(Math.random() * GRID_HEIGHT);

        //TODO Check for existing mine at that position

        mines[randomCol][randomRow] = 1;
    }
}

function genSquares()
{
    for (var col = 0; col < GRID_WIDTH; col++)
    {
        for (var row = 0; row < GRID_HEIGHT; row++)
        {
            addSquare(col, row);
        }
    }

    stage.update();
}

function addSquare(col, row)
{
    gameGrid[col][row] = new SquareView(col, row, mines[col][row] == 1, getSurroundingMines(col, row));
}

function getSurroundingMines(col, row)
{
    var surroundingMines = getMineCount(col - 1, row) +
        getMineCount(col - 1, row - 1) +
        getMineCount(col - 1, row + 1) +
        getMineCount(col, row + 1) +
        getMineCount(col, row - 1) +
        getMineCount(col + 1, row + 1) +
        getMineCount(col + 1, row) +
        getMineCount(col + 1, row - 1);

    return surroundingMines;
}

function getMineCount(col, row)
{
    var mineCount = 0;

    if (squareIsOnGrid(col, row))
    {
        mineCount += mines[col][row];
    }

    return mineCount;
}

function squareIsOnGrid(col, row)
{
    return (col > -1 && row > -1 && col < GRID_WIDTH && row < GRID_HEIGHT);
}
