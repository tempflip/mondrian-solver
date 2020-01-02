const show = require('./show');
const solver = require('./solver');
const createBlock = solver.createBlock;

const getAllStartingBoards = (board_, fixedBlockList_) => {
    var startingBoardList = [JSON.parse(JSON.stringify(board_))];
    while (fixedBlockList_.length > 0) {
        console.log('...', startingBoardList.length);

        var newStartingBoardList = [];
        var myFixd = fixedBlockList_.pop();
        
        startingBoardList.forEach((thisBoard_) => {
            for (var y = 0; y < board_.length; y++) {
                for (var x = 0; x < board_[0].length; x++) {
                    var myBoard = JSON.parse(JSON.stringify(thisBoard_));
                    try {
                        myBoard = solver.putBlockOnBoard(myBoard, myFixd, x, y);
                        newStartingBoardList.push(myBoard);
                    } catch(e) {}
                }
            }
            startingBoardList = newStartingBoardList;
        });
           
        console.log(',,,,', startingBoardList.length);
    }
    
    // filtering the symmetric ones

    var startingBoardListJSON = startingBoardList.map((el) => JSON.stringify(el));
    filteredBoardList = [];
    filteredBoardSet = new Set();
    console.log('buuu');
    startingBoardListJSON.forEach(thisBoard => {
        var mirroredYBoard = JSON.stringify(mirrorY(JSON.parse(thisBoard)));
        var mirroredXBoard = JSON.stringify(mirrorX(JSON.parse(thisBoard)));
        var mirroredXYBoard = JSON.stringify(mirrorX(JSON.parse(mirroredYBoard)));
        
        // if (filteredBoardList.indexOf(thisBoard) == -1 
        // && filteredBoardList.indexOf(mirroredYBoard) == -1
        // && filteredBoardList.indexOf(mirroredXBoard) == -1
        // && filteredBoardList.indexOf(mirroredXYBoard) == -1
        if (!filteredBoardSet.has(thisBoard)
            && !filteredBoardSet.has(mirroredYBoard)
            && !filteredBoardSet.has(mirroredXBoard)
            && !filteredBoardSet.has(mirroredXYBoard)
        ) {
            // filteredBoardList.push(thisBoard);
            filteredBoardSet.add(thisBoard);
        }
    });
    // return startingBoardList;
    // return Array.from(filteredBoardSet);
    return Array.from(filteredBoardSet).map(el => JSON.parse(el));
}

const mirrorY = (board) => {
    var newBoard = [];
    for (var y = board.length-1; y >=0 ; y--) {
        newBoard.push(board[y]);
    }
    return newBoard;
}

const mirrorX = (board) => {
    var newBoard = [];

    for (var y = 0; y < board.length; y ++) {
        var row = [];
        for (var x = board[0].length-1; x >=0 ; x--) {
            row.push(board[y][x]);
        }
        newBoard.push(row);
    }
    return newBoard;
}

const findUnique = (board_, fixedBlockList_, blockList_) => {
    var startingBoardList = getAllStartingBoards(board_, fixedBlockList_);
    console.log('starting positions', startingBoardList.length);
    var solMap = {};

    for (var i = 0; i < startingBoardList.length; i++) {
        var myBoard = startingBoardList[i];
        var myBlockList = JSON.parse(JSON.stringify(blockList_));
        var sols = solver.solveBoardWithBlocks(myBoard, myBlockList);
        if (sols.length == 1) {
            console.log('#', i, sols.length);
            solMap[JSON.stringify(myBoard)] = sols;
        }
        // console.log(i);
        // if (i > 1000) break;
    }

    return solMap;
}

// var board1 = createBlock(8,8, 0);
var board1 = createBlock(7,7, 0);

const fixedBlockList = [
    createBlock(1, 1, 1),
    createBlock(1, 2, 1), 
    createBlock(1, 3, 1),
];

const blockList = [
    createBlock(1, 4, 4),
    // createBlock(1, 5, 4), //
    createBlock(2, 2, 5),
    createBlock(2, 3, 6),
    createBlock(2, 4, 2),
    // createBlock(2, 5, 2), //
    createBlock(3, 3, 3),
    createBlock(3, 4, 4),
];




var t0 = Date.now();
var solMap = findUnique(board1, fixedBlockList, blockList);
// console.log(getAllStartingBoards(board1, fixedBlockList));
console.log(Object.keys(solMap).length, ' unique found');
solver.showMetrics();
console.log('Running time ', Date.now() - t0);

// for (sol in solMap) {
//     show.toScreen(solMap[sol][0]);
//     console.log('....');
// }



