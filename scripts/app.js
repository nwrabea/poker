let currentScore = 0;
let currentStreak = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let currentHand, currentPosition, currentScenario;
let canAnswer = true;
let canReset = true;

const APP_VERSION = {
    current: "1.2.0",
    changes: [
        {
            version: "1.2.0",
            date: "2024-01-10",
            changes: [
                "Added keyboard shortcuts (f-fold, c-call, r-raise, a-allin, n-next)",
                "Improved decision logic",
                "Added result explanations"
            ]
        },
        {
            version: "1.1.0",
            date: "2024-01-05",
            changes: [
                "Added statistics tracking",
                "Added reset functionality",
                "Improved UI design"
            ]
        },
        {
            version: "1.0.0",
            date: "2024-01-01",
            changes: [
                "Initial release",
                "Basic poker decision trainer",
                "Core functionality"
            ]
        }
    ]
};

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

    // Find the correct action for the current hand
    let correctAction = null;
    // Check each action category (raise, call, allin)
    for (let action in decisions) {
        if (action === 'explanation' || action === 'fold') continue;
        if (Array.isArray(decisions[action]) && decisions[action].includes(currentHand)) {
            correctAction = action;
            break;
        }
    }
    // If no specific action was found, the correct action is fold
    if (!correctAction) {
        correctAction = 'fold';
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


function initializeVersioning() {
    const versionBtn = document.getElementById('versionBtn');
    const versionModal = document.getElementById('versionModal');
    const closeBtn = document.querySelector('.close-version-btn');
    const currentVersionSpan = document.getElementById('currentVersion');
    
    // Set current version
    currentVersionSpan.textContent = APP_VERSION.current;
    
    // Check if this is a new version for the user
    const lastSeenVersion = localStorage.getItem('lastSeenVersion');
    if (lastSeenVersion !== APP_VERSION.current) {
        const badge = document.createElement('span');
        badge.className = 'new-version-badge';
        badge.textContent = 'NEW';
        versionBtn.appendChild(badge);
    }
    
    // Generate version history
    const versionHistory = document.getElementById('versionHistory');
    APP_VERSION.changes.forEach(version => {
        const versionEntry = document.createElement('div');
        versionEntry.className = 'version-entry';
        
        versionEntry.innerHTML = `
            <h3>Version ${version.version}</h3>
            <div class="date">${version.date}</div>
            <ul>
                ${version.changes.map(change => `<li>${change}</li>`).join('')}
            </ul>
        `;
        
        versionHistory.appendChild(versionEntry);
    });
    
    // Event listeners
    versionBtn.addEventListener('click', () => {
        versionModal.style.display = 'block';
        localStorage.setItem('lastSeenVersion', APP_VERSION.current);
        const badge = versionBtn.querySelector('.new-version-badge');
        if (badge) badge.remove();
    });
    
    closeBtn.addEventListener('click', () => {
        versionModal.style.display = 'none';
    });
    
    window.addEventListener('click', (event) => {
        if (event.target === versionModal) {
            versionModal.style.display = 'none';
        }
    });
}

// Add this to your window.onload
window.onload = function() {
    initializeGame();
    initializeVersioning();
};