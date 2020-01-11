requirejs(["../solver"], function(solver) {
    buildTable();
    addMouse();
    startGame();
});

var board;
var NX = 8;
var NY = 8;
var selectedBlock;
var blockList;

const buildTable  = () => {

    for(var y = 0; y < NY; y++) {
        var htmlRow = $("<div>", {id: 'r-' + y, "class": "board-row"});
        for(var x = 0; x < NX; x++) {
            var htmlEl = $('<div>', {'id': 'b-e-' + x + '-' + y, 'class' : 'board-element'});
            htmlEl.attr('cx', x);
            htmlEl.attr('cy', y);
            htmlRow.append(htmlEl);
        }
        
        $('#game').append(htmlRow);
    }
}

const draw = (brd_, slt, x, y) => {
    const colors = ['grey', 'black', 'blue', 'yellow', 'green', 
    'white', 'pink', 'magenta', 'cyan',
    'orange'];

    var brd;
    if (slt != null) {
        brd = putBlockOnBoard(board, slt, x, y);
    } else {
        brd = brd_;
    }

    console.log(brd);
    for (var y = 0; y < brd.length; y ++) {
        for (var x = 0; x < brd[0].length; x ++) {
            $('#b-e-' + x + '-' + y).css('background-color', colors[brd[y][x]]);
        }
    }

};

const addMouse = () => {
    $('.board-element').mouseover( (ev) => {
        var x = $(ev.target).attr('cx');
        var y = $(ev.target).attr('cy');
        console.log(x,y);
        draw(board, selectedBlock, parseInt(x), parseInt(y));

        // $('.board-element').removeClass('selected');
        // $(ev.target).addClass('selected');
    });

    $('.board-element').click( (ev) => {
        var x = $(ev.target).attr('cx');
        var y = $(ev.target).attr('cy');
        board = putBlockOnBoard(board, selectedBlock, parseInt(x), parseInt(y));
        draw(board);
    });

    $('.block-selector').click(ev => {
        var selBlock = $(ev.target).attr('b');
        selectedBlock = blockList[selBlock];
        console.log('block selected', selectedBlock);
    });
}

const startGame  = () => {
    board = createBlock(NX, NY, 0);    
    board = putBlockOnBoard(board, createBlock(1, 1, 1), 7, 1);
    board = putBlockOnBoard(board, createBlock(2, 1, 1), 5, 3);
    board = putBlockOnBoard(board, createBlock(3, 1, 1), 2, 7);    

    blockList = [
        createBlock(3, 3, 2),
        createBlock(5, 1, 3),
        createBlock(4, 2, 4),
        createBlock(2, 5, 5),
        createBlock(3, 4, 6),
        createBlock(2, 2, 7),
        createBlock(3, 2, 8),
        createBlock(1, 4, 9),
    ];

    selectedBlock = blockList[0];

    console.log(blockList);
    draw(board);
}