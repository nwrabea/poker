// Main Application
let game;

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    game = new Game();
    game.nextHand();
    
    // Set up keyboard shortcuts
    setupKeyboardShortcuts();
    
    // Close modals when clicking outside
    setupModalClosers();
});

// Global functions for HTML onclick handlers
function makeDecision(action) {
    game.makeDecision(action);
}

function nextHand() {
    game.nextHand();
}

function resetStats() {
    UI.hideModal('menuModal');
    game.resetStats();
}

// Keyboard shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(event) {
        // Prevent shortcuts when modal is open
        if (document.querySelector('.modal.show')) {
            if (event.key === 'Escape') {
                document.querySelectorAll('.modal.show').forEach(modal => {
                    modal.classList.remove('show');
                });
            }
            if (event.key === 'n' || event.key === 'N') {
                if (document.getElementById('resultModal').classList.contains('show')) {
                    nextHand();
                }
            }
            return;
        }
        
        // Game shortcuts
        switch(event.key.toLowerCase()) {
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
                nextHand();
                break;
        }
    });
}

// Modal closers
function setupModalClosers() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.classList.remove('show');
            }
        });
    });
}

// Check for new version
if (localStorage.getItem('lastSeenVersion') !== APP_VERSION.current) {
    // Could show a notification about new version
    console.log('New version available:', APP_VERSION.current);
}
localStorage.setItem('lastSeenVersion', APP_VERSION.current);