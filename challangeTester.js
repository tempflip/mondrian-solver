const show = require('./show');
const solver = require('./solver');

var board1 = solver.createBlock(8, 8, 0);

board1 = solver.putBlockOnBoard(board1, solver.createBlock(1, 1, 1), 7, 1);
board1 = solver.putBlockOnBoard(board1, solver.createBlock(2, 1, 1), 5, 3);
board1 = solver.putBlockOnBoard(board1, solver.createBlock(3, 1, 1), 2, 7);

// board1 = solver.putBlockOnBoard(board1, solver.createBlock(3, 1, 1), 2, 3);
// board1 = solver.putBlockOnBoard(board1, solver.createBlock(1, 1, 1), 4, 1);
// board1 = solver.putBlockOnBoard(board1, solver.createBlock(1, 2, 1), 7, 4);

// board1 = solver.putBlockOnBoard(board1, solver.createBlock(2, 1, 1), 4, 0);
// board1 = solver.putBlockOnBoard(board1, solver.createBlock(1, 1, 1), 3, 2);
// board1 = solver.putBlockOnBoard(board1, solver.createBlock(3, 1, 1), 0, 4);



show.toScreen(board1);
// show.toScreen(board1);

const blockList = [
    solver.createBlock(3, 3, 2),
    solver.createBlock(5, 1, 3),
    solver.createBlock(4, 2, 4),
    solver.createBlock(2, 5, 5),
    solver.createBlock(3, 4, 6),
    solver.createBlock(2, 2, 7),
    solver.createBlock(3, 2, 8),
    solver.createBlock(1, 4, 9),
];


////////////////////

// var board1 = solver.createBlock(4, 4, 0);
// board1 = solver.putBlockOnBoard(
//     board1,
//     solver.createBlock(2, 4, 1),
//     0,0
// );
// const blockList = [
//     solver.createBlock(2, 2, 2),
//     solver.createBlock(1, 2, 3),
//     solver.createBlock(1, 2, 4),
// ];


var sols = solver.solveBoardWithBlocks(board1, blockList);

sols.forEach(s => {show.toScreen(s); console.log()});
console.log(sols.length);
