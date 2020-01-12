var board;
var NX = 8;
var NY = 8;
var selBlockI;
var blockList;
var onBoardBlocks = new Set();

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

const buildBlocksButtons = () => {
    var blocksDiv = $('#blocks');
    blocksDiv.empty();
    blockList.forEach((bl, i) => {
        if (onBoardBlocks.has(i)) return;

        var blY = bl.length;
        var blX = bl[0].length;
        var myButton = $('<button>' + blX + ' X ' + blY + '</button>');
        myButton.attr('b', i);
        myButton.addClass('block-selector');

        if (i == selBlockI) {
            myButton.addClass('selected-button');
        }

        blocksDiv.append(myButton);
        blocksDiv.append($('<br>'));
    });

    $('.block-selector').click(ev => {
        var selBlock = $(ev.target).attr('b');
        selBlockI = parseInt(selBlock);
        console.log('block selected', selBlockI);
        buildBlocksButtons();
    });    
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
        draw(board, getSelectedBlock(), parseInt(x), parseInt(y));

        // $('.board-element').removeClass('selected');
        // $(ev.target).addClass('selected');
    });

    $('.board-element').click(dropBlockOnBoard);


}

const dropBlockOnBoard = (ev) => {
    var x = $(ev.target).attr('cx');
    var y = $(ev.target).attr('cy');
    board = putBlockOnBoard(board, getSelectedBlock(), parseInt(x), parseInt(y));
    onBoardBlocks.add(selBlockI);
    selBlockI = undefined;
    draw(board);
    buildBlocksButtons();
};

const getSelectedBlock = () => {
    return blockList[selBlockI];
}

const startGame  = () => {
    board = createBlock(NX, NY, 0);    
    board = putBlockOnBoard(board, createBlock(1, 1, 1), 7, 1);
    board = putBlockOnBoard(board, createBlock(2, 1, 1), 5, 3);
    board = putBlockOnBoard(board, createBlock(3, 1, 1), 2, 7);    

    console.log(blockList);
    draw(board);
}

requirejs(["../solver"], function(solver) {
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
    selBlockI = 2;

    buildTable();
    buildBlocksButtons();
    addMouse();
    startGame();
});