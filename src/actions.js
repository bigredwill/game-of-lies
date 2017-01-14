
const BASE_URL = 'http://localhost:3000';

export function createNewGame() {
	return function (dispatch) {
		dispatch(loadingNewGame());

		return fetch(`${BASE_URL}/game/new`,{
			method: 'POST',
			headers: {
		    "Content-Type": "application/json"
		   }
		}).then((data) => {

			data.json().then((json) => {
				console.log(json);
				dispatch(receiveNewGame(json.id));
			})
		}, (error) => {
			dispatch(errorNewGame(error));
		})
	}
}

export function loadingNewGame() {
	return {
		type: 'NEW_GAME_LOADING'
	}
}

export function receiveNewGame(gameId) {
	return {
		type: 'NEW_GAME_RECEIVED',
		gameId
	}
}

export function errorNewGame(error) {
	return {
		type: 'NEW_GAME_ERROR',
		error
	}
}

function alreadyJoinedGame(gameId) {
	return !!getLocalGameCharacter(gameId);
}

function getLocalGameCharacter(gameId) {
	return localStorage.getItem(gameId) && JSON.parse(localStorage.getItem(gameId)).character;
}

function addToLocalStorage(gameId, character) {
	localStorage.setItem(gameId, JSON.stringify({
		gameId,
		character
	}));
}

export function requestJoinGame(gameId) {

	return function(dispatch) {
		dispatch({
			type: 'JOIN_GAME',
			gameId
		});

		if (alreadyJoinedGame(gameId)) {
			dispatch(joinGameSuccess(getLocalGameCharacter(gameId)));
			return;
		}

		var url = `http://10.38.5.78:3000/games/${gameId}`;
		fetch(url, {
			method: 'GET',
			headers: {
		    "Content-Type": "application/json"
		   },
 			body: JSON.stringify()
	  	}).then((response) => {
			response.json().then((data) => {
				if (data.error) {
					dispatch(joinGameFail(data.error));
				} else {
					addToLocalStorage(gameId, data.card);
					dispatch(joinGameSuccess(data.card))
				}
			})
		}, (error) => {
			console.log(error.message)
			this.setState({
				error: 'Couldn\'t connect to server.'
			})
		})
	}

}

export function joinGameSuccess(character) {
	return {
		type: 'JOIN_GAME_SUCCESS',
		character
	}
}

export function joinGameFail(error) {
	return {
		type: 'JOIN_GAME_FAIL',
		error
	}
}
