var userMove = document.getElementById("user-move");
var computerMove = document.getElementById("computer-move");
var winner = document.getElementById("winner");
var userCount = document.getElementById("user-count");
var computerCount = document.getElementById("computer-count");
var drawCount = document.getElementById("draw-count");

var validMoves = ['r', 'p', 's'];
var moves = ['rock', 'paper', 'scissors'];
var userWins = 0;
var pcWins = 0;
var draws = 0;
var winnerName;

alert($('.game-piece'))
$('.game-piece').on('click', playGame);

function playGame(evt) {
    alert('hi')
    var pathSegments = evt.target.src.split('/'),
        userIn = pathSegments[pathSegments.length - 1][0].toLowerCase();

    pcIn = getPCMove();

    findWinner(userIn, pcIn);
    highliteWinner();
    recordGame(userIn, pcIn);
}

function recordGame(userIn, pcIn) {
    userMove.textContent = moves[validMoves.indexOf(userIn)];
    computerMove.textContent = moves[validMoves.indexOf(pcIn)];
    userCount.textContent = userWins;
    computerCount.textContent = pcWins;
    drawCount.textContent = draws;
    winner.textContent = winnerName;
}

function highliteWinner() {
    var elMap = {
        you: [userMove, userCount],
        computer: [computerMove, computerCount],
        drawnowinner: [drawCount]
    },
        elArray = elMap[winnerName.toLowerCase().replace(/[-\s]/g,'')];
    
        for(var prop in elMap) {
            var arr = elMap[prop];
            for (var item of arr) {
                item.classList.replace('just-won-color', 'normal-color');
            }
        }


    if (elArray) {
        for (var item of elArray) {
            item.classList.replace('normal-color', 'just-won-color');
        }
    }
}

function findWinner(userIn, pcIn) {
    // ['r', 'p', 's']
    //   0    1    2
    var userIdx = validMoves.indexOf(userIn),
        pcIdx = validMoves.indexOf(pcIn),
        outCome = userIdx - pcIdx;

    switch (outCome) {
        case 2:
        case -1: winnerName = 'Computer'; pcWins++; break;
        case 0: winnerName = 'draw - no winner'; draws++; break;
        case -2:
        case 1: winnerName = 'You'; userWins++; break;
    }
}

function getPCMove() {
    var randomChoice = Math.random() * 3,
        roundedDown = Math.floor(randomChoice);

    return validMoves[roundedDown];
}