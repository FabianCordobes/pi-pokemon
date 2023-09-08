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

// Estado inicial
const initialState = {
	pokemons: [],
	auxPokemons: [],
	types: [],
	detailPokemon: {},
	msg: '',
	isPlaying: false,
	audioIndex: 0,
};

export default function reducer(state = initialState, action) {
	const { payload, type } = action; // Desestructurar la acción

	// Switch para manejar diferentes acciones
	switch (type) {
		// Reiniciar el número de página
		case RESET_PAGE:
			return {
				...state,
				numPage: 1, // Establecer el número de página en 1
			};

		// Actualizar la lista de pokemones y la lista auxiliar
		case GET_POKEMONS:
			return {
				...state,
				pokemons: payload, // Actualizar la lista de pokemones con los datos recibidos en payload
				auxPokemons: payload, // Actualizar la lista auxiliar de pokemones con los mismos datos
			};

		// Actualizar la lista de tipos
		case GET_TYPES:
			return {
				...state,
				types: payload, // Actualizar la lista de tipos con los datos recibidos en payload
			};

		// Filtrar por origen
		case FILTER_BY_ORIGIN:
			// Obtener la lista completa de pokemones
			const allPokesByOrigin = state.auxPokemons;
			let originFiltered;

			// Verificar el valor del filtro recibido en 'payload'
			if (payload === 'All') originFiltered = allPokesByOrigin; // Si es 'All', mostrar todos los pokemones
			if (payload === 'PokeAPI')
				originFiltered = allPokesByOrigin.filter(
					(pokemon) => typeof pokemon.id === 'number'
				); // Si es 'PokeAPI', filtrar por aquellos con ID numérico
			if (payload === 'Created')
				originFiltered = allPokesByOrigin.filter(
					(pokemon) => pokemon.id.toString().length > 30
				); // Si es 'Created', filtrar por aquellos con IDs como cadenas largas

			// Comprobar si se encontraron pokemones después del filtro
			if (originFiltered.length) {
				return {
					...state,
					pokemons: originFiltered, // Actualizar la lista de pokemones con los filtrados
					msg: '',
				};
			} else {
				return {
					...state,
					msg: 'There are no created pokemon yet', // Mensaje si no se encontraron pokemones después del filtro
				};
			}

		// Filtrar por tipo
		case FILTER_BY_TYPE:
			// Obtener la lista completa de pokemones
			const allPokesByType = state.auxPokemons;
			let typeFiltered;

			// Verificar el valor del filtro recibido en 'payload'
			if (payload === 'All') typeFiltered = allPokesByType; // Si es 'All', mostrar todos los pokemones
			if (payload !== 'All')
				typeFiltered = allPokesByType.filter((pokemon) => pokemon.type.includes(payload)); // Si no es 'All', filtrar por aquellos que tienen el tipo especificado

			// Comprobar si se encontraron pokemones después del filtro
			if (typeFiltered.length) {
				return {
					...state,
					pokemons: typeFiltered, // Actualizar la lista de pokemones con los filtrados
					msg: '',
				};
			} else {
				return {
					...state,
					msg: 'There are no loaded pokemon of the selected type', // Mensaje si no se encontraron pokemones después del filtro
				};
			}

		// Ordenar la lista de pokemones
		case SORT_BY:
			// Copiar la lista de pokemones antes de ordenarla para no mutar el estado original
			const pokemonsSorted = state.pokemons.slice();
			let orderBy;

			// Verificar el criterio de ordenamiento especificado en 'payload'
			if (payload === 'A-Z')
				orderBy = pokemonsSorted.sort((a, b) => (a.name > b.name ? 1 : -1)); // Ordenar alfabéticamente de A a Z por nombre
			if (payload === 'Z-A')
				orderBy = pokemonsSorted.sort((a, b) => (a.name < b.name ? 1 : -1)); // Ordenar alfabéticamente de Z a A por nombre
			if (payload === 'Ʌ Attack')
				orderBy = pokemonsSorted.sort((a, b) => (a.attack < b.attack ? 1 : -1)); // Ordenar por ataque ascendente
			if (payload === 'V Attack')
				orderBy = pokemonsSorted.sort((a, b) => (a.attack > b.attack ? 1 : -1)); // Ordenar por ataque descendente
			if (payload === 'id') orderBy = pokemonsSorted.sort((a, b) => a.id - b.id); // Ordenar por ID ascendente

			// Actualizar la lista de pokemones con la lista ordenada
			return {
				...state,
				pokemons: orderBy,
			};

		// ... (otros casos)

		// Agregar un nuevo pokemon a la lista
		case CREATE_POKEMON:
			return {
				...state,
				pokemons: [...state.pokemons, payload], // Agregar el nuevo pokemon a la lista existente
			};

		// Actualizar los detalles del pokemon
		case GET_POKEMON_DETAILS:
			return {
				...state,
				detailPokemon: payload, // Actualizar los detalles del pokemon con los datos recibidos en payload
			};

		// Borrar los detalles del pokemon
		case CLEAR_POKEMON_DETAILS:
			return {
				...state,
				detailPokemon: {}, // Limpiar los detalles del pokemon (dejarlo vacío)
			};

		// Obtener un pokemon por nombre
		case GET_POKEMON_BY_NAME:
			return {
				...state,
				detailPokemon: payload, // Actualizar los detalles del pokemon con los datos recibidos en payload
			};

		// Eliminar un pokemon de la lista
		case DELETE_POKEMON:
			return {
				...state,
				pokemons: state.pokemons.filter((pokemon) => pokemon.id !== payload), // Filtrar la lista de pokemones para eliminar el pokemon con el ID especificado
			};

		default:
			return state; // Devolver el estado sin cambios si la acción no coincide
	}
}
