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
    // Generate random hand and situation
    currentHand = ALL_HANDS[Math.floor(Math.random() * ALL_HANDS.length)];
    currentPosition = POSITIONS[Math.floor(Math.random() * POSITIONS.length)];
    currentScenario = SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
    
    // Update display
    document.getElementById('current-hand').textContent = currentHand;
    document.getElementById('current-position').textContent = currentPosition;
    document.getElementById('current-action').textContent = currentScenario.description;
    document.getElementById('current-stack').textContent = Math.floor(Math.random() * 50 + 75);
    document.getElementById('result').textContent = '';
}

function makeDecision(playerAction) {
    if (!POKER_DECISIONS[currentPosition] || 
        !POKER_DECISIONS[currentPosition][currentScenario.type]) {
        document.getElementById('result').innerHTML = 
            `<span class="incorrect">No data for this scenario yet</span>`;
        nextHand();
        return;
    }

    const decisions = POKER_DECISIONS[currentPosition][currentScenario.type];
    let correctAction = 'fold'; // Default action is fold

    // Find correct action for the current hand
    for (let action in decisions) {
        if (action !== 'fold' && decisions[action].includes(currentHand)) {
            correctAction = action;
            break;
        }
    }

    const isCorrect = playerAction === correctAction;

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
            `<span class="incorrect">Incorrect! The correct play was to ${correctAction}</span>`;
    }
    
    updateDisplay();
    saveStats();
}

window.onload = initializeGame;