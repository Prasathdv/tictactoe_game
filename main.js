// This script adds game functionality of tic tac toe. 
// Define variables
const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
// Array of all possible winning combinations in tictactoe game
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
let circleTurn;

// get DOM element values into the script
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageTextData = document.querySelector('[data-winning-message-text]');
const winningMessage = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');

startGame();
restartButton.addEventListener('click',startGame)

// functions area
// This function initializes the sstarting game board
function startGame(){
    circleTurn = false;
    //  Add event listener
    cellElements.forEach(cell=>{
            cell.classList.remove(X_CLASS)
            cell.classList.remove(CIRCLE_CLASS)
            cell.removeEventListener('click',handleClick)
            cell.addEventListener('click', handleClick, {once:true})
        })
    setBoardHoverClass();
    winningMessage.classList.remove('show')    
}
// This function maark the X or O class based on the selected cell and swaps value
function handleClick(e){
    const cell = e.target;
    const currentClass = circleTurn? CIRCLE_CLASS : X_CLASS;
    // placeMark
    placeMark(cell,currentClass);
    // Check for Win
    if(checkWin(currentClass)){
        endGame(false)
    } else if(isDraw()){
        endGame(true)
    } else{
        // Switch turns
        swapTurns()
        // setOverBoardClass
        setBoardHoverClass()
    }
}
// This function adds the current class (X or O) to the clicked cell.
function placeMark(cell,currentClass){
    cell.classList.add(currentClass);
}
// This function swaps the classes (X,O) each time when clicked.
function swapTurns(){
    circleTurn = !circleTurn;
}
// This function do the below steps
// 1. Clears the initial set class (X and O)
// 2. Add the X or O class based on circleTurn value
function setBoardHoverClass(){
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
    }else{
        board.classList.add(X_CLASS)
    }
}
// Function to check if the combination is winning combination
//  First go thru each cell and check its class. compare the class names with rest of the combination and see if it matches.
//  then compare the reurn value with some of winning combination match

function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination=>{
        return combination.every(index=>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

// function for endGame
function endGame(draw){
    if(draw){
        winningMessageTextData.innerText = 'Draw!'

    }else{
        winningMessageTextData.innerText = `${circleTurn? "O`s " : "X`s "}wins!`
    }
    winningMessage.classList.add('show')
}

// function for isDraw()
// it uses object destructuring to array to use every function [...object] = array
function isDraw(){
    return [...cellElements].every(cell =>{
        return cell.classList.contains(X_CLASS)||cell.classList.contains(CIRCLE_CLASS)
    })
}
