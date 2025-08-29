// Game Constants
const POSITIONS = ['UTG', 'UTG1', 'MP1', 'MP2', 'MP3', 'CO', 'BTN', 'SB', 'BB'];



const SEAT_TO_POSITION = {
    1: 'SB',
    2: 'BB', 
    3: 'UTG',
    4: 'UTG1',
    5: 'MP1',
    6: 'MP2',
    7: 'MP3',
    8: 'CO',
    9: 'BTN'
};

// Statistical stack size generation
function generateStackSize() {
    const rand = Math.random();
    
    // 60% chance for normal stacks (25-60 BB)
    if (rand < 0.6) {
        return Math.floor(Math.random() * 36) + 25; // 25-60 BB
    }
    // 25% chance for big stacks (61-120 BB)
    else if (rand < 0.85) {
        return Math.floor(Math.random() * 60) + 61; // 61-120 BB
    }
    // 10% chance for very big stacks (121-200 BB)
    else if (rand < 0.95) {
        return Math.floor(Math.random() * 80) + 121; // 121-200 BB
    }
    // 5% chance for short stacks (8-24 BB)
    else {
        return Math.floor(Math.random() * 17) + 8; // 8-24 BB
    }
}

// Dealer names
const DEALER_WOMEN_NAMES = ['Sarah', 'Emma', 'Jessica', 'Ashley', 'Michelle', 'Amanda', 'Jennifer', 'Lisa', 'Maria', 'Nicole'];
const DEALER_MEN_NAMES = ['Michael', 'David', 'James', 'Robert', 'John', 'William', 'Richard', 'Joseph', 'Thomas', 'Christopher'];

// Random dealer selection
function getRandomDealer() {
    const isWoman = Math.random() < 0.5;
    if (isWoman) {
        return {
            image: 'assets/images/dealer_women.png',
            name: DEALER_WOMEN_NAMES[Math.floor(Math.random() * DEALER_WOMEN_NAMES.length)]
        };
    } else {
        return {
            image: 'assets/images/dealer_man.png',
            name: DEALER_MEN_NAMES[Math.floor(Math.random() * DEALER_MEN_NAMES.length)]
        };
    }
}

const CARD_SUITS = {
    's': '♠',
    'h': '♥',
    'd': '♦',
    'c': '♣'
};

const CARD_RANKS = {
    'A': 'ace',
    'K': 'king',
    'Q': 'queen',
    'J': 'jack',
    'T': '10',
    '9': '9',
    '8': '8',
    '7': '7',
    '6': '6',
    '5': '5',
    '4': '4',
    '3': '3',
    '2': '2'
};

const SCENARIOS = [
    { 
        type: 'openRaise', 
        description: 'No action yet - Should you open?',
        displayText: 'Open Raise'
    },
    { 
        type: 'facing2bet', 
        description: 'Facing 2bet of 6BB',
        displayText: 'Facing 2-Bet (6BB)'
    },
    { 
        type: 'facing3bet', 
        description: 'Facing 3bet of 15BB',
        displayText: 'Facing 3-Bet (15BB)'
    },
    { 
        type: 'facing4bet', 
        description: 'Facing 4bet of 35BB',
        displayText: 'Facing 4-Bet (35BB)'
    },
    {
        type: 'facingAllin',
        description: 'Facing all-in',
        displayText: 'Facing All-In'
    }
];

const APP_VERSION = {
    current: "1.3.0",
    changes: [
        {
            version: "1.3.0",
            date: "2024-01-15",
            changes: [
                "Complete UI redesign with dark theme",
                "Added realistic poker table visualization",
                "Improved card animations",
                "Better mobile responsiveness"
            ]
        }
    ]
};