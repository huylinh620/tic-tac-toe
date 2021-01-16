const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const SHOW_CLASS = 'show'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const board = document.querySelector('.js-board')
const winningMessageElement = document.querySelector('.js-winning-message')
const restartButton = document.querySelector('.js-restart-button')
const cellElements = Array.prototype.slice.call(document.querySelectorAll('[data-cell]'))
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

startGame()

if (restartButton) {
  restartButton.addEventListener('click', startGame)
}

function startGame() {
  circleTurn = false
  if (cellElements.length) {
    cellElements.map(cell => {
      cell.classList.remove(X_CLASS)
      cell.classList.remove(CIRCLE_CLASS)

      cell.removeEventListener('click', handleClick)
      cell.addEventListener('click', handleClick, { once: true })
    })
  }

  setBoardHoverClass()
  winningMessageElement.classList.remove(SHOW_CLASS)
}

function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeMark(cell, currentClass)

  if (checkWin(currentClass)) {
   endGame(false)
  } else if (isDraw()){
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerHTML = `${circleTurn ? "0's" : "X's"} Wins!`
  }
  winningMessageElement.classList.add(SHOW_CLASS)
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function placeMark (cell, currentClass) {
  cell.classList.add(currentClass)
}

function swapTurns() {
  circleTurn = !circleTurn
}

function setBoardHoverClass() {
  if (!board) return
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)

  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}
