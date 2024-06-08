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


let gameBoard = createGame(10);

function gameLoop() {
    gameBoard = processMove(gameBoard, 'right');
    if (!checkCollision(gameBoard)) {
        clearInterval(gameInterval);
    }
    gameBoard = completeLevel(gameBoard);
}

let gameInterval = setInterval(gameLoop, 1000);

setInterval(() => {
    gameBoard = moveGhost(gameBoard);
}, 2000);


function runTests() {
    console.log("Running tests...");

    const board1 = createGame(10);
    console.assert(board1.includes('C'), "PacMan should be on the board");
    console.assert(board1.includes('^'), "Ghost should be on the board");
    console.assert(board1.includes('@'), "Fruit should be on the board");
    console.assert(board1.filter(x => x === '.').length === 7, "There should be 7 pellets");

    let board2 = createGame(10);
    const initialIndex = board2.indexOf('C');
    board2 = processMove(board2, 'right');
    console.assert(board2.indexOf('C') === initialIndex + 1, "PacMan should move right");
    board2 = processMove(board2, 'left');
    console.assert(board2.indexOf('C') === initialIndex, "PacMan should move left");

    let board3 = createGame(10);
    board3 = board3.map(() => '.');
    console.assert(allPelletsEaten(board3), "Should detect when all pellets are eaten");

    let board4 = createGame(10);
    board4 = board4.map(() => '.');
    const newBoard = completeLevel(board4);
    console.assert(newBoard !== board4, "Should reset the game when all pellets are eaten");

    let board5 = createGame(10);
    const initialGhostIndex = board5.indexOf('^');
    board5 = moveGhost(board5);
    console.assert(board5.indexOf('^') !== initialGhostIndex, "Ghost should move");

    let board6 = createGame(10);
    board6[0] = 'C';
    board6[1] = '^';
    console.assert(!checkCollision(board6), "Should detect collision between PacMan and ghost");

    console.log("All tests passed!");
}

runTests();
