let score = 0;
let lives = 3;

function createGame(n) {
    const board = new Array(n).fill('.');
    const pacmanIndex = Math.floor(Math.random() * n);
    let ghostIndex, fruitIndex;

    do {
        ghostIndex = Math.floor(Math.random() * n);
    } while (ghostIndex === pacmanIndex);

    do {
        fruitIndex = Math.floor(Math.random() * n);
    } while (fruitIndex === pacmanIndex || fruitIndex === ghostIndex);

    board[pacmanIndex] = 'C';
    board[ghostIndex] = '^';
    board[fruitIndex] = '@';

    console.log(board);
    return board;
}

function processMove(board, direction) {
    let pacmanIndex = board.indexOf('C');
    board[pacmanIndex] = '.';

    if (direction === 'left' && pacmanIndex > 0) {
        pacmanIndex -= 1;
    } else if (direction === 'right' && pacmanIndex < board.length - 1) {
        pacmanIndex += 1;
    }

    if (board[pacmanIndex] === '.') {
        score += 10;
    }

    board[pacmanIndex] = 'C';
    console.log(board);
    console.log('Score:', score);
    return board;
}

function allPelletsEaten(board) {
    return !board.includes('.');
}

function completeLevel(board) {
    if (allPelletsEaten(board)) {
        console.log('Level Complete! Advancing to the next level...');
        return createGame(board.length);
    }
    return board;
}

function moveGhost(board) {
    let ghostIndex = board.indexOf('^');
    board[ghostIndex] = '.';

    let direction = Math.random() < 0.5 ? -1 : 1;
    ghostIndex += direction;

    if (ghostIndex < 0) ghostIndex = board.length - 1;
    if (ghostIndex >= board.length) ghostIndex = 0;

    board[ghostIndex] = '^';
    console.log(board);
    return board;
}

function checkCollision(board) {
    let pacmanIndex = board.indexOf('C');
    let ghostIndex = board.indexOf('^');

    if (pacmanIndex === ghostIndex) {
        lives -= 1;
        console.log('PacMan hit by ghost! Lives left:', lives);
        if (lives === 0) {
            console.log('Game Over!');
            return false;
        }
    }
    return true;
}


function gameLoop() {
    gameBoard = processMove(gameBoard, 'right');
    if (!checkCollision(gameBoard)) {
        clearInterval(gameInterval);
    }
    gameBoard = completeLevel(gameBoard);
}

let gameBoard = createGame(10);
let gameInterval = setInterval(gameLoop, 1000);

setInterval(() => {
    gameBoard = moveGhost(gameBoard);
}, 2000);
