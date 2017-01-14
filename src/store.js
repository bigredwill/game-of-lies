import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

let ACTIONS = {

	NEW_GAME_LOADING: (state, action) => {
		return {
			...state,
			newGameLoading: true,
		}
	},

	NEW_GAME_RECEIVED: (state, { gameId }) => ({
		...state,
		gameId,
		newGameLoading: false,
	}),

	JOIN_GAME: (state, { gameId }) => ({
		...state,
		gameId,
		newGameLoading: true,
	}),

	JOIN_GAME_SUCCESS: (state, { character }) => ({
		...state,
		character,
		newGameLoading: false,
	}),

	JOIN_GAME_FAIL: (state, { error }) => ({
		...state,
		error,
		newGameLoading: false,
	}),

};

const INITIAL = {
	newGameLoading: false,
	gameId: null,
	character: null,
	error: null
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore( (state, action) => (
	action && ACTIONS[action.type] ? ACTIONS[action.type](state, action) : state
), INITIAL, composeEnhancers(applyMiddleware(thunk)));
