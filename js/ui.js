// UI Management Functions
class UI {
    static showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
        }
    }

    static hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
        }
    }

    static updateStats(stats) {
        document.getElementById('score').textContent = stats.score;
        document.getElementById('streak').textContent = stats.streak;
        document.getElementById('correct').textContent = stats.correct;
        document.getElementById('wrong').textContent = stats.wrong;
    }

    static updateTimer(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        document.getElementById('session-time').textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    static showCards(seatNumber, hand) {
        const seat = document.querySelector(`.seat-${seatNumber}`);
        if (!seat) return;

        const cardsContainer = seat.querySelector('.cards-container');
        cardsContainer.innerHTML = '';

        const cards = this.parseHand(hand);
        cards.forEach((card, index) => {
            setTimeout(() => {
                const cardElement = this.createCardElement(card);
                cardsContainer.appendChild(cardElement);
            }, index * 100);
        });
    }

    static parseHand(hand) {
        if (hand.length === 2) {
            // Pocket pair
            return [
                { rank: hand[0], suit: 's' },
                { rank: hand[0], suit: 'h' }
            ];
        } else if (hand.endsWith('s')) {
            // Suited hand
            return [
                { rank: hand[0], suit: 's' },
                { rank: hand[1], suit: 's' }
            ];
        } else {
            // Offsuit hand
            return [
                { rank: hand[0], suit: 's' },
                { rank: hand[1], suit: 'h' }
            ];
        }
    }

    static createCardElement(card) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card card-enter';
        
        const img = document.createElement('img');
        img.src = `assets/cards/${CARD_RANKS[card.rank]}_of_${this.getSuitName(card.suit)}.png`;
        img.alt = `${card.rank}${card.suit}`;
        
        cardDiv.appendChild(img);
        return cardDiv;
    }

    static getSuitName(suit) {
        const suitNames = {
            's': 'spades',
            'h': 'hearts',
            'd': 'diamonds',
            'c': 'clubs'
        };
        return suitNames[suit];
    }

    static highlightHeroSeat(position, heroSeat) {
        // Remove previous highlights
        document.querySelectorAll('.seat').forEach(seat => {
            seat.classList.remove('hero-seat', 'active');
        });

        // Highlight hero seat
        const seat = document.querySelector(`.seat-${heroSeat}`);
        if (seat) {
            seat.classList.add('hero-seat', 'active');
            
            // Keep position name, don't change to Hero
            const nameEl = seat.querySelector('.player-name');
            const currentPosition = SEAT_TO_POSITION[heroSeat];
            if (nameEl && currentPosition) {
                nameEl.textContent = currentPosition;
            }
            
            // Update position indicator
            const indicator = seat.querySelector('.position-indicator');
            if (indicator) {
                indicator.textContent = position.length > 3 ? position.substr(0, 3) : position;
            }
        }
    }

    static updateAllStackSizes() {
        // Update all seat stack sizes with statistical distribution
        for (let i = 1; i <= 9; i++) {
            const seat = document.querySelector(`.seat-${i}`);
            if (seat) {
                const chipCount = seat.querySelector('.chip-count');
                if (chipCount) {
                    chipCount.textContent = `${generateStackSize()} BB`;
                }
            }
        }
    }

    static updateDealerImage() {
        const dealer = getRandomDealer();
        const dealerImg = document.getElementById('dealer-image');
        const dealerName = document.querySelector('.dealer-name');
        
        if (dealerImg) {
            dealerImg.src = dealer.image;
        }
        if (dealerName) {
            dealerName.textContent = dealer.name;
        }
    }

    static showResult(isCorrect, correctAction, explanation) {
        const modal = document.getElementById('resultModal');
        const title = document.getElementById('modalTitle');
        const message = document.getElementById('modalMessage');
        const explanationDiv = document.getElementById('modalExplanation');

        title.textContent = isCorrect ? 'Correct!' : 'Incorrect';
        title.className = isCorrect ? 'correct' : 'incorrect';
        
        if (isCorrect) {
            message.textContent = `Great decision! You correctly chose to ${correctAction}.`;
        } else {
            message.textContent = `The correct play was to ${correctAction}.`;
        }
        
        explanationDiv.textContent = explanation;
        
        this.showModal('resultModal');
    }

    static clearTable() {
        document.querySelectorAll('.cards-container').forEach(container => {
            container.innerHTML = '';
        });
        
        document.querySelectorAll('.seat').forEach((seat) => {
            seat.classList.remove('hero-seat', 'active');
            // Reset to static position names
            const nameEl = seat.querySelector('.player-name');
            const seatClass = seat.className.match(/seat-(\d+)/)?.[1];
            const position = SEAT_TO_POSITION[parseInt(seatClass)];
            if (nameEl && position) {
                nameEl.textContent = position;
            }
        });
    }

    static enableActionButtons() {
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('disabled');
        });
    }

    static disableActionButtons() {
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.disabled = true;
            btn.classList.add('disabled');
        });
    }

    static updateActionDisplay(scenario) {
        const actionDisplay = document.getElementById('current-action');
        actionDisplay.textContent = scenario.displayText;
    }

    static updateChipCount(amount) {
        // Update chip count for the hero seat
        const heroSeat = document.querySelector('.seat.hero-seat');
        if (heroSeat) {
            const chipCount = heroSeat.querySelector('.chip-count');
            if (chipCount) {
                chipCount.textContent = `${amount} BB`;
            }
        }
    }
}

// Modal close handlers
function closeModal(modalId) {
    UI.hideModal(modalId);
}

// Action panel toggle for mobile
function toggleActionPanel(event) {
    event.preventDefault();
    event.stopPropagation();
    const panel = document.getElementById('actionPanel');
    panel.classList.toggle('expanded');
}

// Menu functions
function showMenu() {
    UI.showModal('menuModal');
}

function showChat() {
    // Placeholder for chat functionality
    console.log('Chat feature coming soon');
}

function showStats() {
    // Could open a detailed stats modal
    console.log('Detailed stats coming soon');
}

function showStrategy() {
    updateStrategyView();
    UI.showModal('strategyModal');
}

function showVersion() {
    displayVersionHistory();
    UI.showModal('versionModal');
}

function showSettings() {
    // Placeholder for settings
    console.log('Settings coming soon');
}

// Strategy view update
function updateStrategyView() {
    const positionFilter = document.getElementById('positionFilter').value;
    const actionFilter = document.getElementById('actionFilter').value;
    const content = document.getElementById('strategyContent');
    
    let html = '<div class="strategy-grid">';
    
    if (positionFilter === 'all') {
        // Show all positions
        POSITIONS.forEach(position => {
            html += generatePositionStrategy(position, actionFilter);
        });
    } else {
        // Show specific position
        html += generatePositionStrategy(positionFilter, actionFilter);
    }
    
    html += '</div>';
    content.innerHTML = html;
}

function generatePositionStrategy(position, actionFilter) {
    const decisions = POKER_DECISIONS[position];
    if (!decisions) return '';
    
    let html = `<div class="position-strategy">
        <h3>${position}</h3>`;
    
    if (actionFilter === 'all' || actionFilter === 'openRaise') {
        html += formatActionStrategy('Open Raise', decisions.openRaise);
    }
    if (actionFilter === 'all' || actionFilter === 'facing2bet') {
        html += formatActionStrategy('Facing 2-Bet', decisions.facing2bet);
    }
    if (actionFilter === 'all' || actionFilter === 'facing3bet') {
        html += formatActionStrategy('Facing 3-Bet', decisions.facing3bet);
    }
    if (actionFilter === 'all' || actionFilter === 'facing4bet') {
        html += formatActionStrategy('Facing 4-Bet', decisions.facing4bet);
    }
    if (actionFilter === 'all' || actionFilter === 'facingAllin') {
        html += formatActionStrategy('Facing All-In', decisions.facingAllin);
    }
    
    html += '</div>';
    return html;
}

function formatActionStrategy(actionName, strategy) {
    if (!strategy) return '';
    
    let html = `<div class="action-strategy">
        <h4>${actionName}</h4>`;
    
    if (strategy.raise) {
        html += `<div class="strategy-line raise">
            <span class="action-label">Raise:</span>
            <span class="hands">${Array.isArray(strategy.raise) ? strategy.raise.join(', ') : strategy.raise}</span>
        </div>`;
    }
    
    if (strategy.call) {
        html += `<div class="strategy-line call">
            <span class="action-label">Call:</span>
            <span class="hands">${Array.isArray(strategy.call) ? strategy.call.join(', ') : strategy.call}</span>
        </div>`;
    }
    
    if (strategy.allin) {
        html += `<div class="strategy-line allin">
            <span class="action-label">All-In:</span>
            <span class="hands">${Array.isArray(strategy.allin) ? strategy.allin.join(', ') : strategy.allin}</span>
        </div>`;
    }
    
    html += `<div class="strategy-line fold">
        <span class="action-label">Fold:</span>
        <span class="hands">${strategy.fold}</span>
    </div>`;
    
    html += '</div>';
    return html;
}

// Version history display
function displayVersionHistory() {
    const content = document.getElementById('versionContent');
    let html = '';
    
    APP_VERSION.changes.forEach(version => {
        html += `
            <div class="version-entry">
                <h3>Version ${version.version}</h3>
                <div class="date">${version.date}</div>
                <ul>
                    ${version.changes.map(change => `<li>${change}</li>`).join('')}
                </ul>
            </div>
        `;
    });
    
    content.innerHTML = html;
}