document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const movesDisplay = document.getElementById('moves')
    const overlay = document.getElementById('overlay')
    const final = document.getElementById('final')
    const width = 8
    const squares = []
    let score = 0
    let moves = 20
    scoreDisplay.innerHTML = score
    movesDisplay.innerHTML = moves

    const candyColors = [
        'url(src/images/red-candy.png)',
        'url(src/images/green-candy.png)',
        'url(src/images/blue-candy.png)',
        'url(src/images/purple-candy.png)',
        'url(src/images/yellow-candy.png)',
        'url(src/images/orange-candy.png)'
    ]

    //Create Board
    function createBoard() {
        for (let i = 0; i < width*width; i++) {
            const square = document.createElement('div')
            square.setAttribute('draggable', true)
            square.setAttribute('id', i)
            let randomColor = Math.floor(Math.random() * candyColors.length)
            square.style.backgroundImage = candyColors[randomColor]
            grid.appendChild(square)
            squares.push(square)
            grid.style.display = 'none'
            }
    }
    createBoard()


//Drag the candies
let colorBeingDragged
let colorBeingReplaced
let squareIdBeingDragged
let squareIdBeingReplaced

squares.forEach(square => square.addEventListener('dragstart', dragStart))
squares.forEach(square => square.addEventListener('dragend', dragEnd))
squares.forEach(square => square.addEventListener('dragover', dragOver))
squares.forEach(square => square.addEventListener('dragenter', dragEnter))
squares.forEach(square => square.addEventListener('dragleave', dragLeave))
squares.forEach(square => square.addEventListener('drop', dragDrop))


function dragStart() {
    colorBeingDragged = this.style.backgroundImage
    squareIdBeingDragged = parseInt(this.id)
    console.log(colorBeingDragged)
    console.log(this.id, 'dragstart')
}

function dragOver(e) {
    e.preventDefault()
    console.log(this.id, 'dragover')
}

function dragEnter(e) {
    e.preventDefault()
    console.log(this.id, 'dragenter')
}

function dragLeave() {
    console.log(this.id, 'dragleave')
}

function dragDrop() {
    console.log(this.id, 'dragdrop')
    colorBeingReplaced = this.style.backgroundImage
    squareIdBeingReplaced = parseInt(this.id)
    this.style.backgroundImage = colorBeingDragged
    squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced
}

function dragEnd() {
    console.log(this.id, 'dragend')
    let validMoves = [
        squareIdBeingDragged -1,
        squareIdBeingDragged -width, 
        squareIdBeingDragged +1,
        squareIdBeingDragged +width
    ]

    let validMove = validMoves.includes(squareIdBeingReplaced)
    if (squareIdBeingReplaced && validMove) {
            squareIdBeingReplaced = null
            moves-=1
            movesDisplay.innerHTML = moves
            checkRowForFive()
            checkColumnForFive()
            checkRowForFour()
            checkColumnForFour()
            checkRowForThree()
            checkColumnForThree()
        }
    else if (squareIdBeingReplaced && !validMove) {
        squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
    } 
    
    else squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
}

//drop candies once some have been cleared
function moveDown() {
    for (i = 0; i <= 55; i++) {
        if (squares[i + width].style.backgroundImage === '') {
            squares[i + width].style.backgroundImage = squares[i].style.backgroundImage
            squares[i].style.backgroundImage = ''
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
            const isFirstRow = firstRow.includes(i)
            if (isFirstRow && squares[i].style.backgroundImage === ''){
                let randomColor = Math.floor(Math.random() * candyColors.length)
                squares[i].style.backgroundImage = candyColors[randomColor]
            }
        }
    }
}


//Checking for matches
//check for Five
function checkRowForFive() {
    for (i = 0; i <= 59; i++) {
        let rowOfFive = [i, i+1, i+2, i+3, i+4]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''

        const notValid = [4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31, 37, 38, 39, 44, 45, 46, 47, 52, 53, 54, 55, 60, 61, 62, 63]
        if (notValid.includes(i)) continue

        if (rowOfFive.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
            score += 5
            scoreDisplay.innerHTML = score
            rowOfFive.forEach(index => {
                squares[index].style.backgroundImage = ''

            })
        }

    }
}

function checkColumnForFive() {
    for (i = 0; i <= 31; i++) {
        let columnOfFive = [i, i+width, i+width*2, i+width*3, i+width*4]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''

        if (columnOfFive.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
            score += 4
            scoreDisplay.innerHTML = score
            columnOfFive.forEach(index => {
                squares[index].style.backgroundImage = ''

            })
        }

    }

}

//check for Four
function checkRowForFour() {
    for (i = 0; i <= 60; i++) {
        let rowOfFour = [i, i+1, i+2, i+3]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''

        const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 38, 39, 45, 46, 47, 53, 54, 55, 61, 62, 63]
        if (notValid.includes(i)) continue

        if (rowOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
            score += 4
            scoreDisplay.innerHTML = score
            rowOfFour.forEach(index => {
                squares[index].style.backgroundImage = ''

            })
        }

    }

}

function checkColumnForFour() {
    for (i = 0; i <= 39; i++) {
        let columnOfFour = [i, i+width, i+width*2, i+width*3]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''

        if (columnOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
            score += 4
            scoreDisplay.innerHTML = score
            columnOfFour.forEach(index => {
                squares[index].style.backgroundImage = ''

            })
        }

    }

}

//check for Three
function checkRowForThree() {
    for (i = 0; i <= 61; i++) {
        let rowOfThree = [i, i+1, i+2]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''

        const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
        if (notValid.includes(i)) continue

        if (rowOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
            score += 3
            scoreDisplay.innerHTML = score
            rowOfThree.forEach(index => {
                squares[index].style.backgroundImage = ''

            })
        }

    }

}

function checkColumnForThree() {
    for (i = 0; i <= 47; i++) {
        let columnOfThree = [i, i+width, i+width*2]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''

        if (columnOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
            score += 3
            scoreDisplay.innerHTML = score
            columnOfThree.forEach(index => {
                squares[index].style.backgroundImage = ''

            })
        }

    }

}

function startGame() {
    overlay.style.display = "none"
    start.style.display = "none"
    pause.style.display = "flex"
    newG.style.display = "flex"
    grid.style.display = "flex"    
    window.setInterval(function(){
        checkRowForFive()
        checkColumnForFive()
        checkRowForFour()
        checkColumnForFour()
        checkRowForThree()
        checkColumnForThree()
        moveDown()

        for (i = 0; i <= 7; i++){
            if (squares[i].style.backgroundImage === ''){
                let randomColor = Math.floor(Math.random() * candyColors.length)
                squares[i].style.backgroundImage = candyColors[randomColor]
            }
        }

        if (moves == 0) {
            overlay.style.display = "flex"
            final.innerHTML = "Out of moves! <br> Your result: " + score
            pause.style.display = "none"
            grid.style.display = "none"
        }
        
    }, 100)
 
}

function pauseGame() {
    overlay.style.display = "flex"
    start.style.display = "flex"
    start.innerHTML = "<h3>Resume</h3>"
    pause.style.display = "none"
    grid.style.display = 'none'
    final.innerHTML = "Game is paused"
}


function newGame() {
    newG.style.display = "none"
    pause.style.display = "none"
    start.style.display = "flex"
    start.innerHTML = "<h3>Start game</h3>"
    grid.style.display = 'none'
    overlay.style.display = "flex"
    final.innerHTML = 'Start a new game' 
    for (i; i < 63; i++) {
        let randomColor = Math.floor(Math.random() * candyColors.length)
        squares[i].style.backgroundImage = candyColors[randomColor]
    }
    score = 0
    moves = 20
    movesDisplay.innerHTML = 20
    scoreDisplay.innerHTML = 0
}


start = document.getElementById("start-button")
start.addEventListener("click", startGame)

pause = document.getElementById("pause-button")
pause.addEventListener("click", pauseGame)

newG = document.getElementById("new-button")
newG.addEventListener("click", newGame)

})