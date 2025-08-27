// Add these mapping constants at the top of poker-hands.js
const CARD_MAP = {
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    'T': '10',
    'J': 'jack',
    'Q': 'queen',
    'K': 'king',
    'A': 'ace'
};

const SUIT_MAP = {
    's': 'spades',
    'h': 'hearts',
    'd': 'diamonds',
    'c': 'clubs'
};

const POSITIONS = ['SB', 'BB', 'UTG', 'UTG1', 'UTG2', 'MP1', 'MP2', 'MP3', 'CO', 'BTN'];

const ALL_HANDS = [
    // Premium pairs (3)
    'AA', 'KK', 'QQ',
    
    // Medium pairs (3)
    'JJ', 'TT', '99',
    
    // Small pairs (7)
    '88', '77', '66', '55', '44', '33', '22',
    
    // Suited Aces (12)
    'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
    
    // Suited Kings (11)
    'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s', 'K4s', 'K3s', 'K2s',
    
    // Suited Queens (10)
    'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s', 'Q6s', 'Q5s', 'Q4s', 'Q3s', 'Q2s',
    
    // Suited Jacks (9)
    'JTs', 'J9s', 'J8s', 'J7s', 'J6s', 'J5s', 'J4s', 'J3s', 'J2s',
    
    // Suited Tens (8)
    'T9s', 'T8s', 'T7s', 'T6s', 'T5s', 'T4s', 'T3s', 'T2s',
    
    // Suited 9s (7)
    '98s', '97s', '96s', '95s', '94s', '93s', '92s',
    
    // Suited 8s (6)
    '87s', '86s', '85s', '84s', '83s', '82s',
    
    // Suited 7s (5)
    '76s', '75s', '74s', '73s', '72s',
    
    // Suited 6s (4)
    '65s', '64s', '63s', '62s',
    
    // Suited 5s (3)
    '54s', '53s', '52s',
    
    // Suited 4s (2)
    '43s', '42s',
    
    // Suited 3s (1)
    '32s',
    
    // Offsuit Aces (12)
    'AKo', 'AQo', 'AJo', 'ATo', 'A9o', 'A8o', 'A7o', 'A6o', 'A5o', 'A4o', 'A3o', 'A2o',
    
    // Offsuit Kings (11)
    'KQo', 'KJo', 'KTo', 'K9o', 'K8o', 'K7o', 'K6o', 'K5o', 'K4o', 'K3o', 'K2o',
    
    // Offsuit Queens (10)
    'QJo', 'QTo', 'Q9o', 'Q8o', 'Q7o', 'Q6o', 'Q5o', 'Q4o', 'Q3o', 'Q2o',
    
    // Offsuit Jacks (9)
    'JTo', 'J9o', 'J8o', 'J7o', 'J6o', 'J5o', 'J4o', 'J3o', 'J2o',
    
    // Offsuit Tens (8)
    'T9o', 'T8o', 'T7o', 'T6o', 'T5o', 'T4o', 'T3o', 'T2o',
    
    // Offsuit 9s (7)
    '98o', '97o', '96o', '95o', '94o', '93o', '92o',
    
    // Offsuit 8s (6)
    '87o', '86o', '85o', '84o', '83o', '82o',
    
    // Offsuit 7s (5)
    '76o', '75o', '74o', '73o', '72o',
    
    // Offsuit 6s (4)
    '65o', '64o', '63o', '62o',
    
    // Offsuit 5s (3)
    '54o', '53o', '52o',
    
    // Offsuit 4s (2)
    '43o', '42o',
    
    // Offsuit 3s (1)
    '32o'
];

const POKER_DECISIONS = {
    SB: {
        openRaise: {
            raise: ['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', 
                   'AKs', 'AQs', 'AJs', 
                   'AKo', 'AQo', 'AJo', 'KQs'],
            fold: 'rest',
            explanation: {
                raise: "2.5-3BB with AA-88, AK-AJ, KQs",
                fold: "Fold weaker hands from SB to avoid playing OOP"
            }
        },
        facing2bet: {
            raise: ['AA', 'KK', 'QQ', 'AKs'],
            call: ['JJ', 'TT', 'AQs'],
            fold: 'rest',
            explanation: {
                raise: "3bet with AA-QQ, AKs for value",
                call: "Call with JJ-TT, AQs - strong hands but not strong enough to 3bet",
                fold: "Fold rest - avoid playing weak hands OOP vs 2bet"
            }
        },
        facing3bet: {
            raise: ['AA', 'KK'],
            call: ['QQ', 'AKs'],
            fold: 'rest',
            explanation: {
                raise: "4bet with AA, KK only",
                call: "Call with QQ, AKs - strong enough to continue",
                fold: "Fold rest vs 3bet from OOP"
            }
        },
        facing4bet: {
            allin: ['AA', 'KK'],
            fold: 'rest',
            explanation: {
                allin: "All-in with AA, KK only",
                fold: "Fold everything else vs 4bet"
            }
        },
        facingAllin: {
            call: ['AA', 'KK'],
            fold: 'rest',
            explanation: {
                call: "Call all-in with AA, KK only",
                fold: "Fold everything else vs all-in"
            }
        }
    },

    BB: {
        openRaise: {
            raise: ['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88',
                   'AKs', 'AKo', 'AQs'],
            fold: 'rest',
            explanation: {
                raise: "Raise strong hands from BB when everyone folds",
                fold: "Check your option with weaker hands"
            }
        },
        facing2bet: {
            raise: ['AA', 'KK', 'QQ', 'AKs'],
            call: ['JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22',
                  'AQs', 'AJs', 'ATs', 'KQs',
                  'JTs', 'T9s', '98s', '87s', '76s', '65s'],
            fold: 'rest',
            explanation: {
                raise: "3bet with AA-QQ, AKs for value",
                call: "Call with pairs and suited cards - good pot odds from BB",
                fold: "Fold trash hands even from BB"
            }
        },
        facing3bet: {
            raise: ['AA', 'KK'],
            call: ['QQ', 'AKs'],
            fold: 'rest',
            explanation: {
                raise: "4bet with AA, KK only",
                call: "Call with QQ, AKs - strong enough to continue",
                fold: "Fold rest vs 3bet"
            }
        },
        facing4bet: {
            allin: ['AA', 'KK'],
            fold: 'rest',
            explanation: {
                allin: "All-in with AA, KK only",
                fold: "Fold everything else vs 4bet"
            }
        },
        facingAllin: {
            call: ['AA', 'KK', 'QQ'],
            fold: 'rest',
            explanation: {
                call: "Call all-in with AA, KK, QQ only",
                fold: "Fold everything else vs all-in"
            }
        }
    },

        UTG: {
        openRaise: {
            raise: ['AA', 'KK', 'QQ', 'JJ', 'TT', 
                   'AKs', 'AKo', 'AQs'],
            fold: 'rest',
            explanation: {
                raise: "3BB with AA-TT, AKs, AKo, AQs - tight range from UTG",
                fold: "Fold weaker hands from earliest position"
            }
        },
        facing2bet: {
            raise: ['AA', 'KK', 'QQ', 'AKs'],
            call: ['JJ', 'TT', 'AKo', 'AQs'],
            fold: 'rest',
            explanation: {
                raise: "3bet with AA-QQ, AKs for value",
                call: "Call with JJ-TT, AKo, AQs - strong hands but not strong enough to 3bet",
                fold: "Fold rest - respect 2bet vs UTG range"
            }
        },
        facing3bet: {
            raise: ['AA', 'KK'],
            call: ['QQ', 'JJ', 'AKs'],
            fold: 'rest',
            explanation: {
                raise: "4bet with AA, KK only",
                call: "Call with QQ, JJ, AKs - strong enough to continue",
                fold: "Fold rest vs 3bet"
            }
        },
        facing4bet: {
            allin: ['AA', 'KK'],
            fold: 'rest',
            explanation: {
                allin: "All-in with AA, KK only",
                fold: "Fold everything else vs 4bet"
            }
        },
        facingAllin: {
            call: ['AA', 'KK'],
            fold: 'rest',
            explanation: {
                call: "Call all-in with AA, KK only",
                fold: "Fold everything else vs all-in"
            }
        }
    },

    UTG1: {
        openRaise: {
            raise: ['AA', 'KK', 'QQ', 'JJ', 'TT', '99',
                   'AKs', 'AKo', 'AQs', 'AQo'],
            fold: 'rest',
            explanation: {
                raise: "3BB with AA-99, AK, AQ - slightly wider than UTG",
                fold: "Fold weaker hands from early position"
            }
        },
        facing2bet: {
            raise: ['AA', 'KK', 'QQ', 'AKs'],
            call: ['JJ', 'TT', 'AKo', 'AQs'],
            fold: 'rest',
            explanation: {
                raise: "3bet with AA-QQ, AKs for value",
                call: "Call with JJ-TT, AKo, AQs - strong hands",
                fold: "Fold rest vs 2bet"
            }
        },
        facing3bet: {
            raise: ['AA', 'KK'],
            call: ['QQ', 'JJ', 'AKs'],
            fold: 'rest',
            explanation: {
                raise: "4bet with AA, KK only",
                call: "Call with QQ, JJ, AKs - strong enough to continue",
                fold: "Fold rest vs 3bet"
            }
        },
        facing4bet: {
            allin: ['AA', 'KK'],
            call: ['QQ', 'AKs'],
            fold: 'rest',
            explanation: {
                allin: "All-in with AA, KK only",
                call: "Call with QQ, AKs - strong enough to call",
                fold: "Fold rest vs 4bet"
            }
        },
        facingAllin: {
            call: ['AA', 'KK', 'QQ'],
            fold: 'rest',
            explanation: {
                call: "Call all-in with AA, KK, QQ only",
                fold: "Fold everything else vs all-in"
            }
        }
    },

    UTG2: {
        openRaise: {
            raise: ['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88',
                   'AKs', 'AKo', 'AQs', 'AQo', 'AJs', 'KQs'],
            fold: 'rest',
            explanation: {
                raise: "2.5-3BB with AA-88, AK-AQ, AJs, KQs",
                fold: "Fold weaker hands from early/middle position"
            }
        },
        facing2bet: {
            raise: ['AA', 'KK', 'QQ', 'AKs'],
            call: ['JJ', 'TT', 'AKo', 'AQs', 'AJs'],
            fold: 'rest',
            explanation: {
                raise: "3bet with AA-QQ, AKs for value",
                call: "Call with JJ-TT, AKo, AQs, AJs - position allows wider calling range",
                fold: "Fold rest vs 2bet"
            }
        },
        facing3bet: {
            raise: ['AA', 'KK'],
            call: ['QQ', 'JJ', 'AKs', 'AQs'],
            fold: 'rest',
            explanation: {
                raise: "4bet with AA, KK only",
                call: "Call with QQ-JJ, AKs, AQs - position allows wider continuing range",
                fold: "Fold rest vs 3bet"
            }
        },
        facing4bet: {
            allin: ['AA', 'KK'],
            call: ['QQ', 'AKs'],
            fold: 'rest',
            explanation: {
                allin: "All-in with AA, KK only",
                call: "Call with QQ, AKs - strong enough to call",
                fold: "Fold rest vs 4bet"
            }
        },
        facingAllin: {
            call: ['AA', 'KK', 'QQ'],
            fold: 'rest',
            explanation: {
                call: "Call all-in with AA, KK, QQ only",
                fold: "Fold everything else vs all-in"
            }
        }
    },

        MP1: {
        openRaise: {
            raise: ['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77',
                   'AKs', 'AKo', 'AQs', 'AQo', 'AJs', 'KQs', 'KJs'],
            fold: 'rest',
            explanation: {
                raise: "2.5BB with AA-77, AK-AJ, KQ+",
                fold: "Fold weaker hands from MP1"
            }
        },
        facing2bet: {
            raise: ['AA', 'KK', 'QQ', 'AKs'],
            call: ['JJ', 'TT', '99', 'AKo', 'AQs', 'AJs'],
            fold: 'rest',
            explanation: {
                raise: "3bet with AA-QQ, AKs for value",
                call: "Call with JJ-99, AKo, AQs, AJs - position allows wider calling range",
                fold: "Fold rest vs 2bet"
            }
        },
        facing3bet: {
            raise: ['AA', 'KK', 'QQ'],
            call: ['JJ', 'TT', 'AKs', 'AQs'],
            fold: 'rest',
            explanation: {
                raise: "4bet with AA-QQ",
                call: "Call with JJ-TT, AKs, AQs - strong hands in position",
                fold: "Fold rest vs 3bet"
            }
        },
        facing4bet: {
            allin: ['AA', 'KK'],
            call: ['QQ', 'AKs'],
            fold: 'rest',
            explanation: {
                allin: "All-in with AA, KK only",
                call: "Call with QQ, AKs - strong enough to call",
                fold: "Fold rest vs 4bet"
            }
        },
        facingAllin: {
            call: ['AA', 'KK', 'QQ'],
            fold: 'rest',
            explanation: {
                call: "Call all-in with AA, KK, QQ only",
                fold: "Fold everything else vs all-in"
            }
        }
    },

    MP2: {
        openRaise: {
            raise: ['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66',
                   'AKs', 'AKo', 'AQs', 'AQo', 'AJs', 'ATs',
                   'KQs', 'KJs', 'QJs'],
            fold: 'rest',
            explanation: {
                raise: "2.5BB with AA-66, AK-AT, KQ+, suited connectors",
                fold: "Fold weaker hands from MP2"
            }
        },
        facing2bet: {
            raise: ['AA', 'KK', 'QQ', 'AKs', 'AKo'],
            call: ['JJ', 'TT', '99', 'AQs', 'AJs', 'KQs'],
            fold: 'rest',
            explanation: {
                raise: "3bet with AA-QQ, AK for value",
                call: "Call with JJ-99, AQs+, KQs - position allows wider calling range",
                fold: "Fold rest vs 2bet"
            }
        },
        facing3bet: {
            raise: ['AA', 'KK', 'QQ'],
            call: ['JJ', 'TT', 'AKs', 'AQs', 'AJs'],
            fold: 'rest',
            explanation: {
                raise: "4bet with AA-QQ",
                call: "Call with JJ-TT, AKs-AJs - position allows wider continuing range",
                fold: "Fold rest vs 3bet"
            }
        },
        facing4bet: {
            allin: ['AA', 'KK'],
            call: ['QQ', 'AKs', 'AKo'],
            fold: 'rest',
            explanation: {
                allin: "All-in with AA, KK only",
                call: "Call with QQ, AK - position allows wider calling range",
                fold: "Fold rest vs 4bet"
            }
        },
        facingAllin: {
            call: ['AA', 'KK', 'QQ', 'AKs'],
            fold: 'rest',
            explanation: {
                call: "Call all-in with AA, KK, QQ, AKs",
                fold: "Fold everything else vs all-in"
            }
        }
    },

    MP3: {
        openRaise: {
            raise: ['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55',
                   'AKs', 'AKo', 'AQs', 'AQo', 'AJs', 'ATs',
                   'KQs', 'KJs', 'QJs',
                   'JTs', 'T9s', '98s', '87s', '76s', '65s'],
            fold: 'rest',
            explanation: {
                raise: "2.5BB with AA-55, AK-AT, KQ+, suited connectors",
                fold: "Fold weaker hands from MP3"
            }
        },
        facing2bet: {
            raise: ['AA', 'KK', 'QQ', 'AKs', 'AKo', 'AQs'],
            call: ['JJ', 'TT', '99', '88', 'AQo', 'AJs', 'KQs', 'KJs'],
            fold: 'rest',
            explanation: {
                raise: "3bet with AA-QQ, AK, AQs for value",
                call: "Call with JJ-88, AQo-AJs, KQ+ - late position allows wider calling range",
                fold: "Fold rest vs 2bet"
            }
        },
        facing3bet: {
            raise: ['AA', 'KK', 'QQ'],
            call: ['JJ', 'TT', '99', 'AKs', 'AQs', 'AJs'],
            fold: 'rest',
            explanation: {
                raise: "4bet with AA-QQ",
                call: "Call with JJ-99, AK-AJ suited - late position allows wider continuing range",
                fold: "Fold rest vs 3bet"
            }
        },
        facing4bet: {
            allin: ['AA', 'KK', 'AKs'],
            call: ['QQ', 'AKo', 'AQs'],
            fold: 'rest',
            explanation: {
                allin: "All-in with AA, KK, AKs",
                call: "Call with QQ, AKo, AQs - late position allows wider calling range",
                fold: "Fold rest vs 4bet"
            }
        },
        facingAllin: {
            call: ['AA', 'KK', 'QQ', 'AKs', 'AKo'],
            fold: 'rest',
            explanation: {
                call: "Call all-in with AA, KK, QQ, AK",
                fold: "Fold everything else vs all-in"
            }
        }
    },

        CO: {
        openRaise: {
            raise: ['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44',
                   'AKs', 'AKo', 'AQs', 'AQo', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
                   'KQs', 'KJs', 'KTs', 'QJs', 'QTs', 'JTs',
                   'T9s', '98s', '87s', '76s', '65s', '54s'],
            fold: 'rest',
            explanation: {
                raise: "2.5BB with: AA-44, all suited Aces, KQ+, suited connectors",
                fold: "Fold very weak hands even from CO"
            }
        },
        facing2bet: {
            raise: ['AA', 'KK', 'QQ', 'JJ', 'AKs', 'AKo'],
            call: ['TT', '99', '88', 'AQs', 'AJs', 'ATs', 'KQs', 'KJs'],
            fold: 'rest',
            explanation: {
                raise: "3bet with AA-JJ, AK for value",
                call: "Call with TT-88, AQ-AT suited, KQ+ suited - good position",
                fold: "Fold rest vs 2bet"
            }
        },
        facing3bet: {
            raise: ['AA', 'KK', 'QQ', 'AKs'],
            call: ['JJ', 'TT', '99', 'AKo', 'AQs', 'AJs'],
            fold: 'rest',
            explanation: {
                raise: "4bet with AA-QQ, AKs",
                call: "Call with JJ-99, AKo, AQ-AJ suited - position allows wider continuing range",
                fold: "Fold rest vs 3bet"
            }
        },
        facing4bet: {
            allin: ['AA', 'KK', 'AKs'],
            call: ['QQ', 'AKo'],
            fold: 'rest',
            explanation: {
                allin: "All-in with AA, KK, AKs",
                call: "Call with QQ, AKo - position allows calling",
                fold: "Fold rest vs 4bet"
            }
        },
        facingAllin: {
            call: ['AA', 'KK', 'QQ', 'AKs', 'AKo'],
            fold: 'rest',
            explanation: {
                call: "Call all-in with AA, KK, QQ, AK",
                fold: "Fold everything else vs all-in"
            }
        }
    },

    BTN: {
        openRaise: {
            raise: ['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22',
                   'AKs', 'AKo', 'AQs', 'AQo', 'AJs', 'AJo', 'ATs', 'ATo', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s',
                   'KQs', 'KQo', 'KJs', 'KJo', 'KTs', 'QJs', 'QTs', 'JTs',
                   'T9s', '98s', '87s', '76s', '65s', '54s', '43s'],
            fold: 'rest',
            explanation: {
                raise: "2.2-2.5BB with: Any pair, Any Ax, KQ+, suited connectors",
                fold: "Fold very weak hands even from BTN"
            }
        },
        facing2bet: {
            raise: ['AA', 'KK', 'QQ', 'JJ', 'AKs', 'AKo'],
            call: ['TT', '99', '88', 'AQs', 'AJs', 'ATs', 'KQs', 'KJs', 'QJs'],
            fold: 'rest',
            explanation: {
                raise: "3bet with AA-JJ, AK for value",
                call: "Call with TT-88, AQ-AT suited, KQ-QJ suited - best position",
                fold: "Fold rest vs 2bet"
            }
        },
        facing3bet: {
            raise: ['AA', 'KK', 'QQ', 'AKs'],
            call: ['JJ', 'TT', '99', '88', 'AKo', 'AQs', 'AJs', 'ATs', 'KQs'],
            fold: 'rest',
            explanation: {
                raise: "4bet with AA-QQ, AKs",
                call: "Call with JJ-88, AK-AT suited, KQs - widest continuing range in position",
                fold: "Fold rest vs 3bet"
            }
        },
        facing4bet: {
            allin: ['AA', 'KK', 'AKs'],
            call: ['QQ', 'AKo'],
            fold: 'rest',
            explanation: {
                allin: "All-in with AA, KK, AKs",
                call: "Call with QQ, AKo - best position to call",
                fold: "Fold rest vs 4bet"
            }
        },
        facingAllin: {
            call: ['AA', 'KK', 'QQ', 'AKs', 'AKo', 'JJ'],
            fold: 'rest',
            explanation: {
                call: "Call all-in with AA, KK, QQ, AK, JJ - widest calling range in position",
                fold: "Fold everything else vs all-in"
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
    },
    {
        type: 'facingAllin',
        description: 'Facing all-in',
        context: 'Opponent has moved all-in.'
    }
];

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