let currentScore = 0;
let currentStreak = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let currentHand, currentPosition, currentScenario;
let canAnswer = true;
let canReset = true;

const APP_VERSION = {
    current: "1.2.6",
    changes: [
        {
            version: "1.2.6",
            date: "2025-08-27",
            changes: [
                "Cards as images"
            ]
        },
        {
            version: "1.2.5",
            date: "2025-08-27",
            changes: [
                "CSS fixes"
            ]
        },
        {
            version: "1.2.4",
            date: "2025-08-27",
            changes: [
                "Bug fixes of table view"
            ]
        },
        {
            version: "1.2.3",
            date: "2025-08-27",
            changes: [
                "Adding Table View to show to users that decision making the algorithem do according to Position/facingBets etc."
            ]
        },
        {
            version: "1.2.2",
            date: "2025-08-26",
            changes: [
                "Fix Fold issue, by fixing all positions options",
                "adding facingallin as option"
            ]
        },
        {
            version: "1.2.1",
            date: "2025-08-26",
            changes: [
                "Fix Fold issue",
                "Add Versioning view to user"
            ]
        },
        {
            version: "1.2.0",
            date: "2025-08-26",
            changes: [
                "Added keyboard shortcuts (f-fold, c-call, r-raise, a-allin, n-next)",
                "Improved decision logic",
                "Added result explanations"
            ]
        },
        {
            version: "1.1.0",
            date: "2025-08-25",
            changes: [
                "Added statistics tracking",
                "Added reset functionality",
                "Improved UI design"
            ]
        },
        {
            version: "1.0.0",
            date: "2025-08-25",
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
    let correctAction = 'fold'; // Default to fold
    
    // Check each possible action (raise, call, allin)
    for (const action in decisions) {
        // Skip non-action properties
        if (action === 'explanation' || action === 'fold') continue;
        
        // If the hand is in this action's list, that's the correct action
        if (Array.isArray(decisions[action]) && decisions[action].includes(currentHand)) {
            correctAction = action;
            break;
        }
    }

    // Special handling for facingAllin scenario
    if (currentScenario.type === 'facingAllin') {
        // In facingAllin scenarios, 'call' and 'allin' are equivalent
        if ((playerAction === 'call' && correctAction === 'allin') || 
            (playerAction === 'allin' && correctAction === 'call')) {
            playerAction = correctAction;
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

function initializeStrategyView() {
    const showBtn = document.getElementById('showStrategyBtn');
    const modal = document.getElementById('strategyModal');
    const closeBtn = document.querySelector('.close-strategy-btn');
    const viewFilter = document.getElementById('viewFilter');
    
    function generateStrategyTable(view = 'all') {
        const header = document.getElementById('tableHeader');
        const tbody = document.getElementById('strategyTableBody');
        
        // Clear existing content
        header.innerHTML = '';
        tbody.innerHTML = '';
        
        // Generate header
        const headers = ['Position'];
        if (view === 'all' || view === 'openRaise') headers.push('Open Raise');
        if (view === 'all' || view === 'facing2bet') headers.push('Facing 2bet');
        if (view === 'all' || view === 'facing3bet') headers.push('Facing 3bet');
        if (view === 'all' || view === 'facing4bet') headers.push('Facing 4bet');
        if (view === 'all' || view === 'facingAllin') headers.push('Facing All-in');
        
        header.innerHTML = headers.map(h => `<th>${h}</th>`).join('');
        
        // Generate rows
        POSITIONS.forEach(position => {
            const row = document.createElement('tr');
            const decisions = POKER_DECISIONS[position];
            
            // Position cell
            row.innerHTML = `<td class="position-cell">${position}</td>`;
            
            // Add cells based on view
            if (view === 'all' || view === 'openRaise') {
                row.innerHTML += generateActionCell(decisions.openRaise);
            }
            if (view === 'all' || view === 'facing2bet') {
                row.innerHTML += generateActionCell(decisions.facing2bet);
            }
            if (view === 'all' || view === 'facing3bet') {
                row.innerHTML += generateActionCell(decisions.facing3bet);
            }
            if (view === 'all' || view === 'facing4bet') {
                row.innerHTML += generateActionCell(decisions.facing4bet);
            }
            if (view === 'all' || view === 'facingAllin') {
                row.innerHTML += generateActionCell(decisions.facingAllin);
            }
            
            tbody.appendChild(row);
        });
    }
    
    function generateActionCell(decision) {
        if (!decision) return '<td class="fold">-</td>';
        
        let content = '';
        if (decision.raise && decision.raise.length) {
            content += `<span class="raise">Raise: ${decision.raise.join(', ')}</span><br>`;
        }
        if (decision.call && decision.call.length) {
            content += `<span class="call">Call: ${decision.call.join(', ')}</span><br>`;
        }
        if (decision.allin && decision.allin.length) {
            content += `<span class="allin">All-in: ${decision.allin.join(', ')}</span><br>`;
        }
        content += `<span class="fold">Fold: ${decision.fold === 'rest' ? 'Everything else' : decision.fold}</span>`;
        
        return `<td>${content}</td>`;
    }
    
    showBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        generateStrategyTable('all');
    });
    
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    viewFilter.addEventListener('change', () => {
        generateStrategyTable(viewFilter.value);
    });
    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Add these functions to app.js
function getCardImagePath(card, suit) {
    const cardName = CARD_MAP[card];
    const suitName = SUIT_MAP[suit.toLowerCase()];
    return `assets/cards/${cardName}_of_${suitName}.png`;
}

function convertHandToImages(hand) {
    if (hand.length === 2) { // Pocket pairs
        return `
            <span class="card-image">
                <img src="${getCardImagePath(hand[0], 'h')}" alt="${hand[0]}♥">
            </span>
            <span class="card-image">
                <img src="${getCardImagePath(hand[0], 's')}" alt="${hand[0]}♠">
            </span>
        `;
    }
    
    const card1 = hand[0];
    const card2 = hand[1];
    const suited = hand[2] === 's';
    
    if (suited) {
        return `
            <span class="card-image">
                <img src="${getCardImagePath(card1, 's')}" alt="${card1}♠">
            </span>
            <span class="card-image">
                <img src="${getCardImagePath(card2, 's')}" alt="${card2}♠">
            </span>
        `;
    } else {
        return `
            <span class="card-image">
                <img src="${getCardImagePath(card1, 's')}" alt="${card1}♠">
            </span>
            <span class="card-image">
                <img src="${getCardImagePath(card2, 'h')}" alt="${card2}♥">
            </span>
        `;
    }
}

// Modify your existing nextHand function to use images
function nextHand() {
    canAnswer = true;
    enableActionButtons();
    
    currentHand = ALL_HANDS[Math.floor(Math.random() * ALL_HANDS.length)];
    currentPosition = POSITIONS[Math.floor(Math.random() * POSITIONS.length)];
    currentScenario = SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
    
    // Update this line to use images instead of text
    document.getElementById('current-hand').innerHTML = convertHandToImages(currentHand);
    document.getElementById('current-position').textContent = currentPosition;
    document.getElementById('current-action').textContent = currentScenario.description;
    document.getElementById('current-stack').textContent = Math.floor(Math.random() * 50 + 75);
    document.getElementById('result').textContent = '';
    
    document.getElementById('resultModal').style.display = 'none';
}

// Add to your window.onload
window.onload = function() {
    initializeGame();
    initializeVersioning();
    initializeStrategyView();
};