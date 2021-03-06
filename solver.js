
var pr1 = 0;
var pr2 = 0;
var pr3 = 0;
var pr4 = 0;
var pr5 = 0;
const nextSteps = (board, block) => {
    pr1++;    
    var nextList = [];
    var boardX = board[0].length;
    var boardY = board.length;

    // normal
    ////////
    var blockX = block[0].length;
    var blockY = block.length;
    for (x = 0; x <= (boardX - blockX); x++) {
        for (var y = 0; y <= (boardY - blockY); y++) {
            
            
            if (blockPuttable(board, blockX, blockY, x, y)) {
                var nextStep = putBlockOnBoard(board, block, x, y);
                nextList.push(nextStep);
            }

            // if (blockX != blockY) {
            //     if (blockPuttable(board, blockY, blockX, x, y)) {
            //         var nextStep2 = putBlockOnBoard(board, transpose(block), x, y);
            //         nextList.push(nextStep2);
            //     }
            // }
        }
    }

    // transposed -> merge with normal!
    //////////////////////
    if (blockX != blockY) {
        blockTransposed = transpose(block);

        var blockX = blockTransposed[0].length;
        var blockY = blockTransposed.length;
        for (x = 0; x <= (boardX - blockX); x++) {
            for (var y = 0; y <= (boardY - blockY); y++) {
                
                if (blockPuttable(board, blockX, blockY, x, y)) {
                    var nextStep = putBlockOnBoard(board, blockTransposed, x, y);
                    nextList.push(nextStep);
                }
            }
        }
    }

    return nextList;
}

const transpose = (block) => {
    var newBlock = [];
    for (var x = 0; x < block[0].length; x ++) {
        var row = [];
        for (var y = 0; y < block.length; y ++) {
            row.push(block[y][x]);
        }
        newBlock.push(row);
    }
    return newBlock;
}

const blockPuttable = (board, blockX, blockY, x_, y_) => {
    for (var x = x_; x < x_+blockX; x++) {
        for (var y = y_; y < y_+blockY; y++) {
            if (board[y][x] != 0) return false;
        }
    }
    return true;
}

const putBlockOnBoard = (board, block, x_, y_) => {
    pr3++;
    var newBoard = JSON.parse(JSON.stringify(board));

    var blockX = block[0].length;
    var blockY = block.length;

    for (var y = 0; y < blockY; y++) {
        for (var x = 0; x < blockX; x++) {
            pr2++;
            if (newBoard[y + y_][x + x_] != 0) throw('This position is already used!'); // this is mostly safety
            newBoard[y + y_][x + x_] = block[y][x];
        }
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

const solveBoardWithBlocks = (board, blockList_) => {
    var blockList = blockList_.sort((a,b) => { // sorting by size. smallest to the first position
        var aSize = a.length * a[0].length;
        var bSize = b.length * b[0].length;
    
        if (aSize < bSize) return -1;
        else return 1;
    });
    var r = [board];

    while (blockList.length > 0) {

        var myBlock = blockList.pop();
        var rr = [];
        r.forEach(brd => {
            pr4++;
            
            var myNextSteps = nextSteps(brd, myBlock);
            // if (blockList.length > 0) {                

            //     myNextSteps = myNextSteps.filter(myBoard => {
            //         var allFits = true;
            //         blockList.forEach(thisBlock => {
            //             if (ifFitsAtAll(myBoard, thisBlock[0].length, thisBlock.length) == false) {
            //                 allFits = false;
            //             }
            //         });

            //         return allFits;
            //     });                

            // }


            rr = rr.concat(myNextSteps);
        })
        r = rr;
    }
    return r;

};

const showMetrics = () => {
    console.log('@@@ M: ', pr1, pr2, pr3, pr4, pr5);
}

module.exports = {
    createBlock : createBlock,
    solveBoardWithBlocks  : solveBoardWithBlocks,
    putBlockOnBoard : putBlockOnBoard,
    // nextSteps : nextSteps,
    showMetrics : showMetrics
};
