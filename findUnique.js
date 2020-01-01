const show = require('./show');
const solver = require('./solver');
const createBlock = solver.createBlock;

const findUnique = (board_, fixedBlockList_, blockList_) => {
    var fxd1 = fixedBlockList_[0];
    for (var y = 0; y < board_.length; y++) {
        for (var x = 0; x < board_[0].length; x++) {
            var myBoard = JSON.parse(JSON.stringify(board_));
            myBoard = solver.putBlockOnBoard(myBoard, fxd1, x, y);
            var myBlockList = JSON.parse(JSON.stringify(blockList_));
            // show.toScreen(myBoard);
            var sols = solver.solveBoardWithBlocks(myBoard, myBlockList);

            console.log(y, x, sols.length);
        }
    }
}

var board1 = createBlock(7,7, 0);

const fixedBlockList = [
    createBlock(1, 1, 1)
];

const blockList = [
    createBlock(1, 2, 2),
    createBlock(1, 3, 3),
    createBlock(1, 4, 4),
    createBlock(2, 2, 5),
    createBlock(2, 3, 6),
    createBlock(2, 4, 2),
    createBlock(3, 3, 3),
    createBlock(3, 4, 4),
];




var t0 = Date.now();
findUnique(board1, fixedBlockList, blockList);
console.log('Running time ', Date.now() - t0);


// sols.forEach(e => {
//     show.toScreen(e);
//     console.log();
// });

// console.log(pr1, pr2, pr3, pr4);

