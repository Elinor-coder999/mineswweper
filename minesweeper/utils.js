'use strict'

function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}


function getEmptyCell() {
    var emptyCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var currCell = gBoard[i][j]
            //   console.log(currCell)
            if (currCell === EMPTY )
                emptyCells.push({ i: i, j: j })
        }
    }

    // console.log(emptyCells)
    var idx = getRandomIntInclusive(0, emptyCells.length)
    return emptyCells[idx]
    
}
function showModal() {
    const elModal = document.querySelector('.modal')
    elModal.classList.remove('hide')
}

function hideModal() {
    const elModal = document.querySelector('.modal')
    elModal.classList.add('hide')
}




function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function getRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    const hexColor = `#${((1 << 24) + (red << 16) + (green << 8) + blue)
                          .toString(16)
                          .slice(1)
                          .toUpperCase()}`;

    return hexColor;
}

function printPrimaryDiagonal(mat) {
    for(var d = 0; d < mat.length; d++){
        var item = mat[d][d]
        console.log(item)
    }
}

function printSecondaryDiagonal(mat) {
    for(var d = 0; d < mat.length; d++){
        var item = mat[d][mat.length - d - 1]
        console.log(item)
    }
}