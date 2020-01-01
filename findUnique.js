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
    return startingBoardList;
}

const findUnique = (board_, fixedBlockList_, blockList_) => {
    var startingBoardList = getAllStartingBoards(board_, fixedBlockList_);
    
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
        // if (Object.keys(solMap).length > 3) break;
    }

    return solMap;
}

var board1 = createBlock(7,7, 0);

const fixedBlockList = [
    createBlock(1, 1, 1),
    createBlock(1, 2, 1), 
    createBlock(1, 3, 1),
];

const blockList = [
    createBlock(1, 4, 4),
    createBlock(2, 2, 5),
    createBlock(2, 3, 6),
    createBlock(2, 4, 2),
    createBlock(3, 3, 3),
    createBlock(3, 4, 4),
];




var t0 = Date.now();
var solMap = findUnique(board1, fixedBlockList, blockList);
console.log(getAllStartingBoards(board1, fixedBlockList).length);


console.log('Running time ', Date.now() - t0);

for (sol in solMap) {
    show.toScreen(solMap[sol][0]);
    console.log('....');
}



