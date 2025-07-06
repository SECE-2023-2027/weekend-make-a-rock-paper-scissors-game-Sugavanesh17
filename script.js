const choices = ['stone', 'paper', 'scissor'];
let userScore = 0;
let computerScore = 0;

const buttons = document.querySelectorAll('.choice');
const statusText = document.querySelector('.status');
const userScoreSpan = document.getElementById('user-score');
const computerScoreSpan = document.getElementById('computer-score');

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return 'draw';
    }
    if (
        (userChoice === 'stone' && computerChoice === 'scissor') ||
        (userChoice === 'paper' && computerChoice === 'stone') ||
        (userChoice === 'scissor' && computerChoice === 'paper')
    ) {
        return 'user';
    }
    return 'computer';
}

const userHand = document.querySelector('.user-hand');
const computerHand = document.querySelector('.computer-hand');

function updateHandImage(handElement, choice) {
    let src = '';
    if (choice === 'stone') {
        src = 'https://img.icons8.com/ios-filled/80/000000/rock.png';
    } else if (choice === 'paper') {
        src = 'https://img.icons8.com/ios-filled/80/000000/paper.png';
    } else if (choice === 'scissor') {
        src = 'https://img.icons8.com/ios-filled/80/000000/scissors.png';
    }
    handElement.querySelector('img').src = src;
}

function playRound(userChoice) {
    userHand.classList.add('show', 'shake');
    computerHand.classList.add('show', 'shake');

    statusText.textContent = 'Playing...';
    statusText.classList.remove('animate-win', 'animate-lose', 'animate-draw');

    setTimeout(() => {
        userHand.classList.remove('shake');
        computerHand.classList.remove('shake');

        const computerChoice = getComputerChoice();
        updateHandImage(userHand, userChoice);
        updateHandImage(computerHand, computerChoice);

        const winner = determineWinner(userChoice, computerChoice);

        if (winner === 'user') {
            userScore++;
            statusText.textContent = `You chose ${userChoice}, computer chose ${computerChoice}. You win! 🎉`;
            statusText.classList.add('animate-win');
        } else if (winner === 'computer') {
            computerScore++;
            statusText.textContent = `You chose ${userChoice}, computer chose ${computerChoice}. You lose! 😞`;
            statusText.classList.add('animate-lose');
        } else {
            statusText.textContent = `You both chose ${userChoice}. It's a draw! 🤝`;
            statusText.classList.add('animate-draw');
        }

        userScoreSpan.textContent = userScore;
        computerScoreSpan.textContent = computerScore;
    }, 1000);
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const userChoice = button.getAttribute('data-choice');
        playRound(userChoice);
    });
});

const resetBtn = document.getElementById('reset-btn');
resetBtn.addEventListener('click', () => {
    userScore = 0;
    computerScore = 0;
    userScoreSpan.textContent = userScore;
    computerScoreSpan.textContent = computerScore;
    statusText.textContent = 'Make your choice to start the game!';
    statusText.classList.remove('animate-win', 'animate-lose', 'animate-draw');
    userHand.classList.remove('show');
    computerHand.classList.remove('show');
});
