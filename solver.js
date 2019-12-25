const show = require('./show');

var pr1 = 0;
var pr2 = 0;
var pr3 = 0;
var pr4 = 0;
const nextSteps = (board, block) => {
    pr1++;    
    var nextList = [];
    var boardX = board[0].length;
    var boardY = board.length;
    var blockX = block[0].length;
    var blockY = block.length;

    if (ifFitsAtAll(board, blockX, blockY) == false) return nextList; // if there is no way to fit, just jump out


    for (x = 0; x <= (boardX - blockX); x++) {
        for (var y = 0; y <= (boardY - blockY); y++) {
            try {
                var nextStep = putBlockOnBoard(board, block, x, y);
                nextList.push(nextStep);
            } catch(err) {
                // console.log('##', y, blockY);
                // y += 1;
                //console.log('ez a pozi nem jo!', blockY)
            }
        }
    }
    
    return nextList;
}

const putBlockOnBoard = (board, block, x_, y_) => {
    pr3++;
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

const isBoardEmpty = (board) => {
    var empty = true;
    board.forEach(row => {
        row.forEach(pixel => {
            if (pixel != 0) empty = false;
        });
    });
    return empty;
}

const ifFitsAtAll = (board, x_, y_) => { // returns false if there is no place with a block with given dimensions
    
    for (var y = 0; y <= board.length - y_; y++) {
        for (var x = 0; x <= board[0].length - x_; x++) {
            var boardSlice = getBoardSlice(board, x, y, x_, y_);
            var isEmpty = isBoardEmpty(boardSlice);
            if (isEmpty) return true;
        }
    }
    pr2++;
    return false;

}

const getBoardSlice = (board, x_, y_, sliceX, sliceY) => {
    var newBoard = [];
    for (var y = y_; y < y_ + sliceY; y++) {
        if (!board[y]) continue;

        var row = [];
        for (var x = x_; x < x_ + sliceX; x++) {
            if (!board[y][x]) continue;
            row.push(board[y][x]);
        }
        newBoard.push(row);
    }
    return newBoard;
}

const getLargestBlockFromListX = (blockList) => {
    var maxX = 0;
    blockList.forEach(block => {
        if (block[0].length > maxX) maxX = block[0].length;
    });
    return maxX;
}

const getLargestBlockFromListY = (blockList) => {
    var maxY = 0;
    blockList.forEach(block => {
        if (block.length > maxY) maxY = block.length;
    });
    return maxY;
}

const solveBoardWithBlocks = (board, blockList) => {
    var r = [board];

    while (blockList.length > 0) {

        var myBlock = blockList.pop();
        var rr = [];
        r.forEach(brd => {
            pr4++;
            
            var myNextSteps = nextSteps(brd, myBlock);
            if (blockList.length > 0) {                

                myNextSteps = myNextSteps.filter(myBoard => {
                    var allFits = true;
                    blockList.forEach(thisBlock => {
                        if (ifFitsAtAll(myBoard, thisBlock[0].length, thisBlock.length) == false) {
                            allFits = false;
                        }
                    });

                    return allFits;
                });                

            }


            rr = rr.concat(myNextSteps);
        })
        r = rr;
    }
    return r;

};


var board1 = createBlock(7, 7, 0);
// var board1 = createBlock(4, 5, 0);

var blockList = [
    createBlock(3, 3, 1),
    createBlock(3, 2, 2),
    createBlock(3, 2, 3),
    createBlock(3, 2, 4),
    createBlock(1, 3, 5),
    createBlock(2, 3, 6),
    createBlock(6, 1, 3),
    createBlock(1, 7, 1),
];

var t0 = Date.now();
var sols = solveBoardWithBlocks(board1, blockList);
console.log('Running time ', Date.now() - t0);


// sols.forEach(e => {
//     show.toScreen(e);
//     console.log();
// });

console.log(pr1, pr2, pr3, pr4);
console.log('possible sols: ', sols.length);
// var board2 = createBlock(6, 6, 0);
// board2 = putBlockOnBoard(board2, createBlock(3,3,1),0,0);

// show.toScreen(board2);

// console.log(ifFitsAtAll(board2, 3, 4));