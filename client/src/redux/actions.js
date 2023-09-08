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

// Acción para resetear el número de página
export function resetPage() {
	return {
		type: RESET_PAGE,
	};
}

// Acción para obtener la lista de pokemones
export const getPokemons = () => {
	return async function (dispatch) {
		try {
			const response = await axios.get('/pokemons');
			dispatch({
				type: GET_POKEMONS,
				payload: response.data, // Actualizar la lista de pokemones con los datos recibidos en payload
			});
		} catch (error) {
			console.log(error);
		}
	};
};

// Acción para obtener la lista de tipos
export const getTypes = () => {
	return async function (dispatch) {
		try {
			const response = await axios.get('/types');
			dispatch({
				type: GET_TYPES,
				payload: response.data, // Actualizar la lista de tipos con los datos recibidos en payload
			});
		} catch (error) {
			console.log(error);
		}
	};
};

// Acción para filtrar por origen
export const filterByOrigin = (payload) => {
	return {
		type: FILTER_BY_ORIGIN,
		payload,
	};
};

// Acción para filtrar por tipo
export const filterByType = (payload) => {
	return {
		type: FILTER_BY_TYPE,
		payload,
	};
};

// Acción para ordenar la lista de pokemones
export const sortBy = (payload) => {
	return {
		type: SORT_BY,
		payload,
	};
};

// Acción para crear un nuevo pokemon
export const createPokemon = (payload) => {
	return async function (dispatch) {
		try {
			const response = await axios.post('/pokemons', payload);

			if (response.data !== 'Name already exists in the database') {
				dispatch({
					type: CREATE_POKEMON,
					payload: response.data, // Agregar el nuevo pokemon a la lista existente
				});
				alert('El pokemon ha sido creado correctamente');
			} else {
				alert(response.data); // Mostrar una alerta si el nombre del pokemon ya existe
			}
		} catch (error) {
			console.log(error);
		}
	};
};

// Acción para obtener los detalles de un pokemon
export const getPokemonDetails = (payload) => {
	return async function (dispatch) {
		try {
			const response = await axios.get(`/pokemons/${payload}`);
			dispatch({
				type: GET_POKEMON_DETAILS,
				payload: response.data, // Actualizar los detalles del pokemon con los datos recibidos en payload
			});
		} catch (error) {
			console.log(error);
		}
	};
};

// Acción para borrar los detalles de un pokemon
export const clearPokemonDetails = () => {
	return {
		type: CLEAR_POKEMON_DETAILS,
	};
};

// Acción para obtener un pokemon por nombre
export const getPokemonByName = (payload) => {
	return async function (dispatch) {
		try {
			const response = await axios.get(`/pokemons?name=${payload}`);
			dispatch({
				type: GET_POKEMON_BY_NAME,
				payload: response.data, // Actualizar los detalles del pokemon con los datos recibidos en payload
			});
		} catch (error) {
			console.log(error);
		}
	};
};

// Acción para eliminar un pokemon de la lista
export const deletePokemon = (payload) => {
	return async function (dispatch) {
		try {
			const response = await axios.delete(`/pokemon/delete/${payload}`);
			console.log(response.data);
			dispatch({
				type: DELETE_POKEMON,
				payload, // Eliminar el pokemon con el ID especificado de la lista
			});
			alert('El pokemon se elimino correctamente');
		} catch (error) {
			console.log(error);
			alert('El pokemon no se pudo eliminar');
		}
	};
};
