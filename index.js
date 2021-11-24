const { createStore, combineReducers } = require('redux');

// Action types
const BUY_POKEMON = 'BUY_POKEMON';
const RETURN_POKEMON = 'RETURN_POKEMON';
const BUY_CONSOLE = 'BUY_CONSOLE';

// Action creators
const buy_pokemon_action = (id, cant) => {
    return {
        type: BUY_POKEMON,
        payload: {
            id,
            cant
        }
    }
}

const return_pokemon_action = (id, cant) => {
    return {
        type: RETURN_POKEMON,
        payload: {
            id,
            cant
        }
    }
}

const buy_console_action = (id, cant) => {
    return {
        type: BUY_CONSOLE,
        payload: {
            id, 
            cant
        }
    }
}

// Reducer
const default_games_state = [
    {
        id: 1,
        name: 'Call of Duty 4',
        stock: 10
    },
    {
        id: 2,
        name: 'God of War',
        stock: 10
    }
];

const default_consoles_state = [
    {
        id: 1,
        name: 'Play Station 5',
        stock: 10
    }
];

const gamesReducer = (state = default_games_state, action) => {
    switch (action.type) {
        case BUY_POKEMON: {
            const { id } = action.payload;
            const { cant } = action.payload;
            return state.map(pokemon => {
                if (pokemon.id === id) {
                    return {
                        ...pokemon,
                        stock: pokemon.stock - cant
                    }
                }
                return pokemon;
            });
        }
        case RETURN_POKEMON: {
            const { id } = action.payload;
            const { cant } = action.payload;
            return state.map(pokemon => {
                if(pokemon.id === id) {
                    return {
                        ...pokemon,
                        stock: pokemon.stock + cant
                    }
                }
                return pokemon
            })
        }
        default: return state;
    }
}

const consolesReducer = (state = default_consoles_state, action) => {
    switch (action.type) {
        case BUY_CONSOLE: {
            const { id } = action.payload;
            const { cant } = action.payload;
            return state.map(console => {
                if (console.id === id) {
                    return {
                        ...console,
                        stock: console.stock - cant
                    }
                }
                return console;
            });
        }
        default: return state;
    }
}

// Store
const rootReducer = combineReducers({
    games: gamesReducer,
    consoles: consolesReducer
});

const store = createStore(rootReducer);
console.log('Estado inicial: ', store.getState());
store.subscribe(() => {
    console.log('Cambio de estado: ', store.getState());
});

store.dispatch(buy_pokemon_action(1, 3));
store.dispatch(return_pokemon_action(1, 2));

store.dispatch(buy_console_action(1, 2));
