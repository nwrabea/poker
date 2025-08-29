// Game Logic
class Game {
    constructor() {
        this.score = 0;
        this.streak = 0;
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        this.sessionTime = 0;
        this.canAnswer = true;
        this.currentHand = null;
        this.currentPosition = null;
        this.currentScenario = null;
        
        this.loadStats();
        this.startTimer();
    }

    loadStats() {
        this.score = parseInt(localStorage.getItem('pokerScore')) || 0;
        this.streak = parseInt(localStorage.getItem('pokerStreak')) || 0;
        this.correctAnswers = parseInt(localStorage.getItem('pokerCorrect')) || 0;
        this.wrongAnswers = parseInt(localStorage.getItem('pokerWrong')) || 0;
        
        this.updateDisplay();
    }

    saveStats() {
        localStorage.setItem('pokerScore', this.score.toString());
        localStorage.setItem('pokerStreak', this.streak.toString());
        localStorage.setItem('pokerCorrect', this.correctAnswers.toString());
        localStorage.setItem('pokerWrong', this.wrongAnswers.toString());
    }

    updateDisplay() {
        UI.updateStats({
            score: this.score,
            streak: this.streak,
            correct: this.correctAnswers,
            wrong: this.wrongAnswers
        });
    }

    startTimer() {
        setInterval(() => {
            this.sessionTime++;
            UI.updateTimer(this.sessionTime);
        }, 1000);
    }

    nextHand() {
        this.canAnswer = true;
        UI.enableActionButtons();
        UI.clearTable();
        
        // Random selections
        this.currentHand = ALL_HANDS[Math.floor(Math.random() * ALL_HANDS.length)];
        this.currentPosition = POSITIONS[Math.floor(Math.random() * POSITIONS.length)];
        this.currentScenario = SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
        
        // Randomly select hero seat (1-9) but position is static
        this.heroSeat = Math.floor(Math.random() * 9) + 1;
        
        // Update display with static positioning and statistical stacks
        UI.highlightHeroSeat(this.currentPosition, this.heroSeat);
        UI.showCards(this.heroSeat, this.currentHand);
        UI.updateActionDisplay(this.currentScenario);
        UI.updateAllStackSizes();
        UI.updateDealerImage();
        
        // Hide result modal if showing
        UI.hideModal('resultModal');
    }

    makeDecision(playerAction) {
        if (!this.canAnswer) return;
        
        const decisions = POKER_DECISIONS[this.currentPosition]?.[this.currentScenario.type];
        if (!decisions) {
            UI.showResult(false, 'fold', 'No data for this scenario yet');
            return;
        }

        // Find correct action
        let correctAction = 'fold';
        
        for (const action in decisions) {
            if (action === 'explanation' || action === 'fold') continue;
            
            if (Array.isArray(decisions[action]) && decisions[action].includes(this.currentHand)) {
                correctAction = action;
                break;
            }
        }

        // Handle special cases
        if (this.currentScenario.type === 'facingAllin') {
            if ((playerAction === 'call' && correctAction === 'allin') || 
                (playerAction === 'allin' && correctAction === 'call')) {
                playerAction = correctAction;
            }
        }

        const isCorrect = playerAction === correctAction;
        const explanation = decisions.explanation[correctAction];

        // Update stats
        if (isCorrect) {
            this.score += 10;
            this.streak++;
            this.correctAnswers++;
        } else {
            this.score = Math.max(0, this.score - 5);
            this.streak = 0;
            this.wrongAnswers++;
        }

        this.updateDisplay();
        this.saveStats();
        UI.disableActionButtons();
        this.canAnswer = false;
        
        UI.showResult(isCorrect, correctAction, explanation);
    }

    resetStats() {
        if (confirm('Are you sure you want to reset all your statistics?')) {
            this.score = 0;
            this.streak = 0;
            this.correctAnswers = 0;
            this.wrongAnswers = 0;
            
            localStorage.removeItem('pokerScore');
            localStorage.removeItem('pokerStreak');
            localStorage.removeItem('pokerCorrect');
            localStorage.removeItem('pokerWrong');
            
            this.updateDisplay();
            this.nextHand();
        }
    }
}