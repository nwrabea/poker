let currentScore = 0;
let currentStreak = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let currentHand, currentPosition, currentScenario;
let canAnswer = true;
let canReset = true;

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

function resetStats() {
    if (!canReset) return;
    
    if (confirm('Are you sure you want to reset all your results?')) {
        currentScore = 0;
        currentStreak = 0;
        correctAnswers = 0;
        wrongAnswers = 0;
        
        // Clear localStorage
        localStorage.removeItem('pokerScore');
        localStorage.removeItem('pokerStreak');
        localStorage.removeItem('pokerCorrect');
        localStorage.removeItem('pokerWrong');
        
        // Update display
        updateDisplay();
        
        // Prevent multiple rapid resets
        canReset = false;
        setTimeout(() => { canReset = true; }, 1000);
        
        // Show confirmation
        alert('Results have been reset!');
        
        // Start new hand
        nextHand();
    }
}

function nextHand() {
    canAnswer = true;
    enableActionButtons();
    
    currentHand = ALL_HANDS[Math.floor(Math.random() * ALL_HANDS.length)];
    currentPosition = POSITIONS[Math.floor(Math.random() * POSITIONS.length)];
    currentScenario = SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
    
    document.getElementById('current-hand').textContent = currentHand;
    document.getElementById('current-position').textContent = currentPosition;
    document.getElementById('current-action').textContent = currentScenario.description;
    document.getElementById('current-stack').textContent = Math.floor(Math.random() * 50 + 75);
    document.getElementById('result').textContent = '';
    
    // Hide modal
    document.getElementById('resultModal').style.display = 'none';
}

function disableActionButtons() {
    const buttons = document.querySelectorAll('#actions-container button');
    buttons.forEach(button => {
        button.classList.add('disabled');
        button.disabled = true;
    });
}

function enableActionButtons() {
    const buttons = document.querySelectorAll('#actions-container button');
    buttons.forEach(button => {
        button.classList.remove('disabled');
        button.disabled = false;
    });
}

function showResultModal(isCorrect, correctAction, explanation) {
    const modal = document.getElementById('resultModal');
    const title = document.getElementById('modalTitle');
    const message = document.getElementById('modalMessage');
    const explanationDiv = document.getElementById('modalExplanation');

    modal.className = 'modal ' + (isCorrect ? 'correct' : 'incorrect');
    title.textContent = isCorrect ? 'Correct!' : 'Incorrect!';
    message.textContent = isCorrect ? 
        `+10 points! Great decision! Current streak: ${currentStreak}` : 
        `The correct play was to ${correctAction}. Streak reset to 0.`;
    explanationDiv.textContent = explanation;

    modal.style.display = 'block';
}

function makeDecision(playerAction) {
    if (!canAnswer) return;
    
    const decisions = POKER_DECISIONS[currentPosition]?.[currentScenario.type];
    if (!decisions) {
        showResultModal(false, 'fold', 'No data for this scenario yet');
        return;
    }

    let correctAction = 'fold';
    for (let action in decisions) {
        if (action !== 'fold' && action !== 'explanation' && decisions[action].includes(currentHand)) {
            correctAction = action;
            break;
        }
    }

    const isCorrect = playerAction === correctAction;
    const explanation = decisions.explanation[correctAction];

    if (isCorrect) {
        currentScore += 10;
        currentStreak++;
        correctAnswers++;
    } else {
        currentScore = Math.max(0, currentScore - 5);
        currentStreak = 0;
        wrongAnswers++;
    }

    updateDisplay();
    saveStats();
    disableActionButtons();
    canAnswer = false;
    
    showResultModal(isCorrect, correctAction, explanation);
}

// Initialize game when window loads
window.onload = initializeGame;

// Add keyboard shortcuts
document.addEventListener('keydown', function(event) {
    if (!canAnswer) return;
    
    switch(event.key) {
        case 'f':
            makeDecision('fold');
            break;
        case 'c':
            makeDecision('call');
            break;
        case 'r':
            makeDecision('raise');
            break;
        case 'a':
            makeDecision('allin');
            break;
        case 'n':
            if (!canAnswer) nextHand();
            break;
    }
});