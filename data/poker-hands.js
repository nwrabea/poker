const POSITIONS = ['SB', 'BB', 'UTG', 'UTG+1', 'UTG+2', 'MP1', 'MP2', 'MP3', 'CO', 'BTN'];

const ALL_HANDS = [
    'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22',
    'AKs', 'AQs', 'AJs', 'ATs', 'KQs', 'KJs', 'QJs',
    'AKo', 'AQo', 'AJo', 'ATo', 'KQo'
];

const POKER_DECISIONS = {
    SB: {
        openRaise: {
            raise: ['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', 'AKs', 'AKo', 'AQs', 'AQo', 'AJs'],
            fold: 'rest'
        },
        facing2bet: {
            raise: ['AA', 'KK', 'QQ', 'AKs'],
            call: ['JJ', 'TT', 'AQs'],
            fold: 'rest'
        },
        facing3bet: {
            raise: ['AA', 'KK'],
            call: ['QQ', 'AKs'],
            fold: 'rest'
        },
        facing4bet: {
            allin: ['AA', 'KK'],
            fold: 'rest'
        }
    },
    BB: {
        facing2bet: {
            raise: ['AA', 'KK', 'QQ', 'AKs'],
            call: ['JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22', 'AQs', 'AJs', 'ATs', 'KQs'],
            fold: 'rest'
        },
        facing3bet: {
            raise: ['AA', 'KK'],
            call: ['QQ', 'AKs'],
            fold: 'rest'
        },
        facing4bet: {
            allin: ['AA', 'KK'],
            fold: 'rest'
        }
    },
    UTG: {
        openRaise: {
            raise: ['AA', 'KK', 'QQ', 'JJ', 'TT', 'AKs', 'AKo', 'AQs'],
            fold: 'rest'
        },
        facing3bet: {
            raise: ['AA', 'KK'],
            call: ['QQ', 'JJ', 'AKs'],
            fold: 'rest'
        },
        facing4bet: {
            allin: ['AA', 'KK'],
            fold: 'rest'
        }
    }
    // Add other positions similarly...
};

const SCENARIOS = [
    { type: 'openRaise', description: 'No action yet - Should you open?' },
    { type: 'facing2bet', description: 'Facing 2bet of 6BB' },
    { type: 'facing3bet', description: 'Facing 3bet of 15BB' },
    { type: 'facing4bet', description: 'Facing 4bet of 35BB' }
];