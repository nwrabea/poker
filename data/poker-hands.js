const POSITIONS = ['SB', 'BB', 'UTG', 'UTG1', 'UTG2', 'MP1', 'MP2', 'MP3', 'CO', 'BTN'];

const ALL_HANDS = [
    'AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22',
    'AKs', 'AQs', 'AJs', 'ATs', 'KQs', 'KJs', 'QJs',
    'AKo', 'AQo', 'AJo', 'ATo', 'KQo'
];

const POKER_DECISIONS = {
    SB: {
        openRaise: {
            raise: ['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', 'AKs', 'AKo', 'AQs', 'AQo', 'AJs'],
            fold: 'rest',
            explanation: {
                raise: "Strong hand from SB - raise to build pot and isolate",
                fold: "Weak hand from SB - avoid playing out of position"
            }
        },
        facing2bet: {
            raise: ['AA', 'KK', 'QQ', 'AKs'],
            call: ['JJ', 'TT', 'AQs'],
            fold: 'rest',
            explanation: {
                raise: "Premium hand - 3bet for value",
                call: "Strong hand but not strong enough to 3bet",
                fold: "Too weak to play out of position against a raise"
            }
        },
        facing3bet: {
            raise: ['AA', 'KK'],
            call: ['QQ', 'AKs'],
            fold: 'rest',
            explanation: {
                raise: "Premium hand - 4bet for value",
                call: "Strong enough to call but not to 4bet",
                fold: "Not strong enough to continue against 3bet"
            }
        },
        facing4bet: {
            allin: ['AA', 'KK'],
            fold: 'rest',
            explanation: {
                allin: "Premium hand - commit with these monsters",
                fold: "Not strong enough to call a 4bet"
            }
        }
    },
    BB: {
        facing2bet: {
            raise: ['AA', 'KK', 'QQ', 'AKs'],
            call: ['JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22', 'AQs', 'AJs', 'ATs', 'KQs'],
            fold: 'rest',
            explanation: {
                raise: "Premium hand - 3bet for value from BB",
                call: "Playable hand in position with good odds",
                fold: "Too weak to defend BB against raise"
            }
        },
        facing3bet: {
            raise: ['AA', 'KK'],
            call: ['QQ', 'AKs'],
            fold: 'rest',
            explanation: {
                raise: "Premium hand - 4bet for value",
                call: "Strong enough to call 3bet",
                fold: "Not strong enough vs 3bet"
            }
        },
        facing4bet: {
            allin: ['AA', 'KK'],
            fold: 'rest',
            explanation: {
                allin: "Premium hand - commit with these monsters",
                fold: "Not strong enough to call 4bet"
            }
        }
    },
    UTG: {
        openRaise: {
            raise: ['AA', 'KK', 'QQ', 'JJ', 'TT', 'AKs', 'AKo', 'AQs'],
            fold: 'rest',
            explanation: {
                raise: "Strong hand - open raise from early position",
                fold: "Too weak to open from UTG"
            }
        },
        facing3bet: {
            raise: ['AA', 'KK'],
            call: ['QQ', 'JJ', 'AKs'],
            fold: 'rest',
            explanation: {
                raise: "Premium hand - 4bet for value",
                call: "Strong enough to call 3bet",
                fold: "Not strong enough to continue vs 3bet"
            }
        },
        facing4bet: {
            allin: ['AA', 'KK'],
            fold: 'rest',
            explanation: {
                allin: "Premium hand - commit with these monsters",
                fold: "Not strong enough to call 4bet"
            }
        }
    },
    'UTG1': {
        openRaise: {
            raise: ['AA', 'KK', 'QQ', 'JJ', 'TT', '99', 'AKs', 'AKo', 'AQs', 'AQo'],
            fold: 'rest',
            explanation: {
                raise: "Strong hand - open raise from early position",
                fold: "Too weak to open from UTG1"
            }
        },
        facing3bet: {
            raise: ['AA', 'KK'],
            call: ['QQ', 'JJ', 'AKs'],
            fold: 'rest',
            explanation: {
                raise: "Premium hand - 4bet for value",
                call: "Strong enough to call 3bet",
                fold: "Not strong enough to continue vs 3bet"
            }
        }
    },
    'UTG2': {
        openRaise: {
            raise: ['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', 'AKs', 'AKo', 'AQs', 'AQo', 'AJs'],
            fold: 'rest',
            explanation: {
                raise: "Strong hand - open raise from early/middle position",
                fold: "Too weak to open from UTG2"
            }
        },
        facing3bet: {
            raise: ['AA', 'KK'],
            call: ['QQ', 'JJ', 'AKs', 'AQs'],
            fold: 'rest',
            explanation: {
                raise: "Premium hand - 4bet for value",
                call: "Strong enough to call 3bet",
                fold: "Not strong enough to continue vs 3bet"
            }
        }
    },
    MP1: {
        openRaise: {
            raise: ['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', 'AKs', 'AKo', 'AQs', 'AQo', 'AJs', 'KQs'],
            fold: 'rest',
            explanation: {
                raise: "Playable hand from middle position",
                fold: "Too weak to open from MP1"
            }
        },
        facing3bet: {
            raise: ['AA', 'KK', 'QQ'],
            call: ['JJ', 'TT', 'AKs', 'AQs'],
            fold: 'rest',
            explanation: {
                raise: "Premium hand - 4bet for value",
                call: "Strong enough to call 3bet",
                fold: "Not strong enough to continue vs 3bet"
            }
        }
    },
    MP2: {
        openRaise: {
            raise: ['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', 'AKs', 'AKo', 'AQs', 'AQo', 'AJs', 'KQs', 'KJs'],
            fold: 'rest',
            explanation: {
                raise: "Playable hand from middle position",
                fold: "Too weak to open from MP2"
            }
        },
        facing3bet: {
            raise: ['AA', 'KK', 'QQ'],
            call: ['JJ', 'TT', 'AKs', 'AQs', 'AJs'],
            fold: 'rest',
            explanation: {
                raise: "Premium hand - 4bet for value",
                call: "Strong enough to call 3bet",
                fold: "Not strong enough to continue vs 3bet"
            }
        }
    },
    MP3: {
        openRaise: {
            raise: ['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', 'AKs', 'AKo', 'AQs', 'AQo', 'AJs', 'ATs', 'KQs', 'KJs'],
            fold: 'rest',
            explanation: {
                raise: "Playable hand from late middle position",
                fold: "Too weak to open from MP3"
            }
        },
        facing3bet: {
            raise: ['AA', 'KK', 'QQ'],
            call: ['JJ', 'TT', '99', 'AKs', 'AQs', 'AJs'],
            fold: 'rest',
            explanation: {
                raise: "Premium hand - 4bet for value",
                call: "Strong enough to call 3bet",
                fold: "Not strong enough to continue vs 3bet"
            }
        }
    },
    CO: {
        openRaise: {
            raise: ['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', 'AKs', 'AKo', 'AQs', 'AQo', 'AJs', 'ATs', 'KQs', 'KJs', 'QJs'],
            fold: 'rest',
            explanation: {
                raise: "Playable hand from CO - can open wider range",
                fold: "Still too weak to open from CO"
            }
        },
        facing3bet: {
            raise: ['AA', 'KK', 'QQ', 'AKs'],
            call: ['JJ', 'TT', '99', 'AKo', 'AQs', 'AJs'],
            fold: 'rest',
            explanation: {
                raise: "Premium hand - 4bet for value",
                call: "Strong enough to call 3bet in position",
                fold: "Not strong enough to continue vs 3bet"
            }
        }
    },
    BTN: {
        openRaise: {
            raise: ['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22', 'AKs', 'AKo', 'AQs', 'AQo', 'AJs', 'ATs', 'KQs', 'KJs', 'QJs'],
            fold: 'rest',
            explanation: {
                raise: "Any playable hand from BTN - widest opening range",
                fold: "Too weak even for BTN"
            }
        },
        facing2bet: { 
            raise: ['AA', 'KK', 'QQ', 'JJ', 'AKs'],
            call: ['TT', '99', '88', 'AKo', 'AQs', 'AJs', 'KQs'],
            fold: 'rest',
            explanation: {
                raise: "Premium hand - 3bet for value in position",
                call: "Strong hand that plays well in position",
                fold: "Not strong enough to continue"
            }
        },
        facing3bet: {
            raise: ['AA', 'KK', 'QQ', 'AKs'],
            call: ['JJ', 'TT', '99', '88', 'AKo', 'AQs', 'AJs', 'KQs'],
            fold: 'rest',
            explanation: {
                raise: "Premium hand - 4bet for value",
                call: "Can call wider range in position",
                                fold: "Not strong enough even in position"
            }
        },
        facing4bet: {
            allin: ['AA', 'KK', 'AKs'],
            call: ['QQ', 'AKo'],
            fold: 'rest',
            explanation: {
                allin: "Premium hand - commit with these monsters",
                call: "Strong enough to call in position",
                fold: "Not strong enough vs 4bet"
            }
        }
    }
};

const SCENARIOS = [
    { 
        type: 'openRaise', 
        description: 'No action yet - Should you open?',
        context: 'You are first to act. Standard open-raise sizing is 2.5-3BB.'
    },
    { 
        type: 'facing2bet', 
        description: 'Facing 2bet of 6BB',
        context: 'Opponent has raised to 6BB. You have not invested any chips yet.'
    },
    { 
        type: 'facing3bet', 
        description: 'Facing 3bet of 15BB',
        context: 'You raised, opponent 3bet to 15BB. You already invested 3BB.'
    },
    { 
        type: 'facing4bet', 
        description: 'Facing 4bet of 35BB',
        context: 'You raised, got 3bet, you 4bet, and now facing a 4bet to 35BB.'
    }
];

// Stack size considerations
const STACK_SIZES = {
    deep: {
        min: 100,
        max: 200,
        description: 'Deep stacked play (100BB+)'
    },
    medium: {
        min: 50,
        max: 99,
        description: 'Medium stacked play (50-99BB)'
    },
    short: {
        min: 20,
        max: 49,
        description: 'Short stacked play (20-49BB)'
    },
    very_short: {
        min: 1,
        max: 19,
        description: 'Very short stacked play (<20BB)'
    }
};

// Additional hand categories for reference
const HAND_CATEGORIES = {
    premium_pairs: ['AA', 'KK', 'QQ'],
    medium_pairs: ['JJ', 'TT', '99'],
    small_pairs: ['88', '77', '66', '55', '44', '33', '22'],
    premium_broadways: ['AKs', 'AKo', 'AQs', 'AQo'],
    suited_aces: ['AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s'],
    suited_connectors: ['JTs', 'T9s', '98s', '87s', '76s', '65s', '54s', '43s', '32s'],
    suited_one_gappers: ['J9s', 'T8s', '97s', '86s', '75s', '64s', '53s', '42s']
};

// General poker concepts for explanations
const POKER_CONCEPTS = {
    position_importance: "Position is crucial in poker. Later position allows playing more hands as you'll have more information.",
    stack_depth: "Deeper stacks allow more post-flop play and implied odds for suited connectors and small pairs.",
    pot_odds: "Compare the cost of calling to the size of the pot to make mathematically correct decisions.",
    implied_odds: "Consider potential future bets you might win when deciding to play drawing hands.",
    three_bet_strategy: "3-betting serves two purposes: for value with strong hands and as a bluff with selected weaker hands.",
    four_bet_strategy: "4-bets should generally be polarized to very strong hands or bluffs, rarely for middle-strength hands."
};

// Export all constants if using modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        POSITIONS,
        ALL_HANDS,
        POKER_DECISIONS,
        SCENARIOS,
        STACK_SIZES,
        HAND_CATEGORIES,
        POKER_CONCEPTS
    };
}