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

const initialState = {
	pokemons: [],
	auxPokemons: [],
	types: [],
	detailPokemon: {},
	msg: '',
	isPlaying: false,
	audioIndex: 0,
};

export default function reducer(state = initialState, { payload, type }) {
	switch (type) {
		case RESET_PAGE:
			return {
				...state,
				numPage: 1,
			};

		case GET_POKEMONS:
			return {
				...state,
				pokemons: payload,
				auxPokemons: payload,
			};

		case GET_TYPES:
			return {
				...state,
				types: payload,
			};

		case FILTER_BY_ORIGIN:
			const allPokesByOrigin = state.auxPokemons;
			let originFiltered;

			if (payload === 'All') originFiltered = allPokesByOrigin;
			if (payload === 'PokeAPI')
				originFiltered = allPokesByOrigin.filter(
					(pokemon) => typeof pokemon.id === 'number'
				);
			if (payload === 'Created')
				originFiltered = allPokesByOrigin.filter(
					(pokemon) => pokemon.id.toString().length > 30
				);
			if (originFiltered.length) {
				return {
					...state,
					pokemon: originFiltered,
					msg: '',
				};
			} else {
				return {
					...state,
					msg: 'There are no created pokemon yet',
				};
			}

		case FILTER_BY_TYPE:
			const allPokesByType = state.auxPokemons;
			let typeFiltered;

			if (payload === 'All') typeFiltered = allPokesByType;
			if (payload !== 'All')
				typeFiltered = allPokesByType.filter((pokemon) => pokemon.type.includes(payload));
			if (typeFiltered.length) {
				return {
					...state,
					pokemons: typeFiltered,
					msg: '',
				};
			} else {
				return {
					...state,
					msg: 'There are no loaded pokemon of the selected type',
				};
			}

		case SORT_BY:
			const pokemonsSorted = state.pokemons;
			let orderBy;

			if (payload === 'A-Z')
				orderBy = pokemonsSorted.sort((a, b) => (a.name > b.name ? 1 : -1));
			if (payload === 'Z-A')
				orderBy = pokemonsSorted.sort((a, b) => (a.name < b.name ? 1 : -1));
			if (payload === 'Ʌ Attack')
				orderBy = pokemonsSorted.sort((a, b) => (a.attack < b.attack ? 1 : -1));
			if (payload === 'V Attack')
				orderBy = pokemonsSorted.sort((a, b) => (a.attack > b.attack ? 1 : -1));
			if (payload === 'id') orderBy = pokemonsSorted.sort((a, b) => a.id - b.id);

			return {
				...state,
				pokemons: orderBy,
			};

		case CREATE_POKEMON:
			return {
				...state,
				pokemons: [...state.pokemons, payload],
			};

		case GET_POKEMON_DETAILS:
			return {
				...state,
				detailPokemon: payload,
			};

		case CLEAR_POKEMON_DETAILS:
			return {
				...state,
				detailPokemon: {},
			};

		case GET_POKEMON_BY_NAME:
			return {
				...state,
				detailPokemon: payload,
			};

		case DELETE_POKEMON:
			return {
				...state,
				pokemons: state.pokemons.filter((pokemon) => pokemon.id !== payload),
			};

		default:
			return state;
	}
}
