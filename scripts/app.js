let currentScore = 0;
let currentStreak = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let currentHand, currentPosition, currentScenario;

function initializeGame() {
    loadStats();
    updateDisplay();
    nextHand();
}

function loadStats() {
    currentScore = parseInt(localStorage.getItem('pokerScore')) || 0;
    currentStreak = parseInt(localStorage.getItem('pokerStreak')) || 0;
    correctAnswers = parseInt(localStorage.getItem('pokerCorrect')) || 0;
    wrongAnswers = parseInt(localStorage.getItem('pokerWrong')) || 0;
}

function saveStats() {
    localStorage.setItem('pokerScore', currentScore);
    localStorage.setItem('pokerStreak', currentStreak);
    localStorage.setItem('pokerCorrect', correctAnswers);
    localStorage.setItem('pokerWrong', wrongAnswers);
}

function updateDisplay() {
    document.getElementById('score').textContent = currentScore;
    document.getElementById('streak').textContent = currentStreak;
    document.getElementById('correct').textContent = correctAnswers;
    document.getElementById('wrong').textContent = wrongAnswers;
}

function nextHand() {
    currentHand = ALL_HANDS[Math.floor(Math.random() * ALL_HANDS.length)];
    currentPosition = POSITIONS[Math.floor(Math.random() * POSITIONS.length)];
    currentScenario = SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
    
    document.getElementById('current-hand').textContent = currentHand;
    document.getElementById('current-position').textContent = currentPosition;
    document.getElementById('current-action').textContent = currentScenario.description;
    document.getElementById('current-stack').textContent = Math.floor(Math.random() * 50 + 75);
    document.getElementById('result').textContent = '';
}

function makeDecision(action) {
    const correctDecision = getCorrectDecision();
    const isCorrect = action === correctDecision;

    if (isCorrect) {
        currentScore += 10;
        currentStreak++;
        correctAnswers++;
        document.getElementById('result').innerHTML = 
            `<span class="correct">Correct! +10 points</span>`;
    } else {
        currentScore = Math.max(0, currentScore - 5);
        currentStreak = 0;
        wrongAnswers++;
        document.getElementById('result').innerHTML = 
            `<span class="incorrect">Incorrect! The correct play was to ${correctDecision}</span>`;
    }
    
    updateDisplay();
    saveStats();
}

function getCorrectDecision() {
    const decisions = POKER_DECISIONS[currentPosition][currentScenario.type];
    
    for (let action in decisions) {
        if (decisions[action].includes(currentHand)) {
            return action;
        }
    }
    return 'fold';
}

window.onload = initializeGame;