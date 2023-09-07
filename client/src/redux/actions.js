import {
	RESET_PAGE,
	GET_POKEMONS,
	GET_TYPES,
	FILTER_BY_ORIGIN,
	FILTER_BY_TYPE,
	SORT_BY,
	CREATE_POKEMON,
	GET_POKEMON_DETAILS,
	CLEAR_POKEMON_DETAILS,
	GET_POKEMON_BY_NAME,
	DELETE_POKEMON,
	
} from './actionType';
import axios from 'axios';



export function resetPage() {
	return {
		type: RESET_PAGE,
	};
}

export const getPokemons = () => {
	return async function (dispatch) {
		await axios
			.get('/pokemons')
			.then((response) => {
				dispatch({
					type: GET_POKEMONS,
					payload: response.data,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const getTypes = () => {
	return function (dispatch) {
		axios
			.get('/types')
			.then((response) => {
				dispatch({
					type: GET_TYPES,
					payload: response.data,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const filterByOrigin = (payload) => {
	return {
		type: FILTER_BY_ORIGIN,
		payload,
	};
};

export const filterByType = (payload) => {
	return {
		type: FILTER_BY_TYPE,
		payload,
	};
};

export const sortBy = (payload) => {
	return {
		type: SORT_BY,
		payload,
	};
};

export const createPokemon = (payload) => {
	return function (dispatch) {
		axios
			.post('/pokemons', payload)
			.then((response) => {
				if (response.data !== 'Name already exists in the database') {
					dispatch({
						type: CREATE_POKEMON,
						payload: response.data,
					});
				} else {
					alert(response.data);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const getPokemonDetails = (payload) => {
	return function (dispatch) {
		axios
			.get(`/pokemons/${payload}`)
			.then((response) => {
				dispatch({
					type: GET_POKEMON_DETAILS,
					payload: response.data,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const clearPokemonDetails = () => {
	return {
		type: CLEAR_POKEMON_DETAILS,
	};
};

export const getPokemonByName = (payload) => {
	return async function (dispatch) {
		try {
			await axios.get(`/pokemons?name=${payload}`).then((response) => {
				dispatch({
					type: GET_POKEMON_BY_NAME,
					payload: response.data,
				});
			});
		} catch (error) {
			console.log(error);
		}
	};
};

export const deletePokemon = (payload) => {
	return function (dispatch) {
		axios
			.delete(`/pokemon/delete/${payload}`)
			.then((response) => {
				console.log(response.data);
				dispatch({
					type: DELETE_POKEMON,
					payload,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};
};
