'use strict'

const MINE = '💣'
const FLAG = '🚩'

var gBoard


var gLevel = {
    SIZE: 4,
    MINES: 2
}

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function onInIt() {
    gGame.isOn = true
    gGame.shownCount = 0
    gGame.markedCount = 0
    gGame.secsPassed = 0
    gBoard = buildBoard()
    setMinesNegsCount(gBoard)
    // boardCheck(gBoard)
    renderBoard(gBoard)

}


function buildBoard() {
    const board = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = []
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: true
            }
        }
    }

    // board[1][2] = MINE
    // board[3][1] = MINE

    return (board)
}

function setMines() {
    var minesPlaced = 0
    while (minesPlaced < gLevel.MINES) {
        const rowIdx = Math.floor(Math.random() * gLevel.SIZE)
        const colIdx = Math.floor(Math.random() * gLevel.SIZE)
        if (!gBoard[i][j].isMine) {
            gBoard[i][j].isMine = true;
            minesPlaced++
        }


    }
}



function setMinesNegsCount() {
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            if (gBoard[i][j].isMine) continue;
            var mineCount = 0;
            for (var x = i - 1; x <= i + 1; x++) {
                for (var y = j - 1; y <= j + 1; y++) {
                    if (x >= 0 && x < gLevel.SIZE && y >= 0 && y < gLevel.SIZE && gBoard[x][y].isMine) {
                        mineCount++;
                    }
                }
            }
            gBoard[i][j].minesAroundCount = mineCount;
        }
    }
}


function renderBoard() {
    const boardHTML = gBoard.map((row, i) =>
        `<tr>${row.map((cell, j) =>
            `<td onclick="onCellClicked(this, ${i}, ${j})" 
                oncontextmenu="onCellMarked(this, ${i}, ${j}); return false;" 
                class="${cell.isShown ? 'shown' : ''}">
                ${cell.isShown ? (cell.isMine ? '💣' : cell.minesAroundCount) : ''}
            </td>`
        ).join('')}</tr>`
    ).join('');
    document.querySelector('.board').innerHTML = `<table>${boardHTML}</table>`;
}

function onCellClicked(elCell, i, j) {
    const cell = gBoard[i][j];
    if (cell.isShown || cell.isMarked) return;
    cell.isShown = true;
    gGame.shownCount++;
    renderBoard();
    if (cell.isMine) {
        alert('Game Over!'); // End the game if a mine is clicked
        return;
    }
    if (cell.minesAroundCount === 0) {
        expandShown(i, j);
    }
    checkGameOver()
}

function expandShown(i, j) {
    for (var x = i - 1; x <= i + 1; x++) {
        for (var y = j - 1; y <= j + 1; y++) {
            if (x >= 0 && x < gLevel.SIZE && y >= 0 && y < gLevel.SIZE && !gBoard[x][y].isShown) {
                gBoard[x][y].isShown = true;
                gGame.shownCount++;
                renderBoard();
                if (gBoard[x][y].minesAroundCount === 0) {
                    expandShown(x, y);
                }
            }
        }
    }
}

function onCellMarked(elCell, i, j) {
    const cell = gBoard[i][j];
    if (!gGame.isOn || cell.isShown) return;

    cell.isMarked = !cell.isMarked;
    const boardHTML = gBoard.map((row, i) =>
        `<tr>${row.map((cell, j) =>
            `<td onclick="onCellClicked(this, ${i}, ${j})" 
                oncontextmenu="onCellMarked(this, ${i}, ${j}); return false;"
                class="${cell.isShown ? 'shown' : ''} ${cell.isMine ? 'mine' : ''} ${cell.isMarked ? 'marked' : ''}"
                data-count="${cell.minesAroundCount}">
                ${cell.isMarked ? '🚩' : ''}
            </td>`
        ).join('')}</tr>`
    ).join('');
    document.querySelector('.board').innerHTML = `<table>${boardHTML}</table>`


    checkGameOver();
}
function checkGameOver() {
    if (!gGame.isOn) return

    let markedMinesCount = 0
    let revealedCellsCount = 0

    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            const cell = gBoard[i][j];
            if (cell.isMine && cell.isMarked) {
                markedMinesCount++;
            }
            if (cell.isShown) {
                revealedCellsCount++;
            }
        }
    }

}