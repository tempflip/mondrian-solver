const show = require('./show');

const nextSteps = (board, block) => {
    var nextList = [];
    var boardX = board[0].length;
    var boardY = board.length;
    var blockX = block[0].length;
    var blockY = block.length;

    for (x = 0; x <= (boardX - blockX); x++) {
        for (var y = 0; y <= (boardY - blockY); y++) {
            try {
                var nextStep = putBlockOnBoard(board, block, x, y);
                nextList.push(nextStep);
            } catch(err) {
                // console.log('ez a pozi nem jo!')
            }
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
                row.push(block[y-y_][x-x_]);
            } else {
                row.push(board[y][x]);
            }
        }
        newBoard.push(row);
    }
    return newBoard;
}

const createBlock = (x_, y_, color) => {
    var block = [];
    for (var y = 0; y < y_; y++) {
        var row = [];
        for (var x = 0; x < x_; x++) {
            row.push(color);
        }
        block.push(row);
    }
    return block;
}

const isBoardFull = (board) => {
    var full = true;
    board.forEach(row => {
        row.forEach(pixel => {
            if (pixel == 0) full = false;
        });
    });
    return full;
}

const solveBoardWithBlocks = (board, blockList) => {
    var r = [board];

    while (blockList.length > 0) {
        var myBlock = blockList.pop();
        var rr = [];
        r.forEach(brd => {
            rr = rr.concat(nextSteps(brd, myBlock));
        })
        r = rr;
    }
    return r;

};

const board1 = createBlock(5, 5, 0)

const blockList = [
    createBlock(1, 2, 5),
    createBlock(2, 2, 4),
    createBlock(2, 2, 3),
    createBlock(2, 3, 2),
    createBlock(3, 3, 1)
];


solveBoardWithBlocks(board1, blockList).forEach(e => {
    show.toScreen(e);
    console.log();
});

