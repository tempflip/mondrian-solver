const show = require('./show');

const nextSteps = (board, block) => {
    var nextList = [];
    var boardX = board[0].length;
    var boardY = board.length;
    var blockX = block[0].length;
    var blockY = block.length;

    console.log(boardX, boardY, blockX, blockY);

    for (x = 0; x <= (boardX - blockX); x++) {
        for (var y = 0; y <= (boardY - blockY); y++) {
            try {
                var nextStep = putBlockOnBoard(board, block, x, y);
                nextList.push(nextStep);
            } catch(err) {
                console.log('ez a pozi nem jo!')
            }
            console.log('#', x, y)
        }
        
    }
    
    return nextList;
}

const putBlockOnBoard = (board, block, x_, y_) => {
    var newBoard = [];
    blockY = block.length;
    blockX = block[0].length;

    for (var y = 0; y < board.length; y++) {
        var row = [];
        for (var x = 0; x < board[0].length; x++) {
            if (x >= x_ && x < x_+blockX && y >= y_ && y < y_+blockY) {
                if (board[y][x] != 0) {
                    throw('This position is already used!');
                }
                row.push(5);
            } else {
                row.push(board[y][x]);
            }
        }
        newBoard.push(row);
    }
    return newBoard;
}

var board1 = [
    [1,1,1,0],
    [1,0,0,0],
    [0,0,0,0],
    [0,0,0,1],
];

var block1 = [
    [2],
    [2]
]

nextSteps(board1, block1).forEach((b) => {
    console.log(b);

    show.toScreen(b);
})
