import './App.css';
import { Route, Routes } from 'react-router-dom';
import Welcome from './views/Welcome/Welcome';
import Home from './views/Home/Home';
import CreatePokemon from './views/CreatePokemon/CreatePokemon';
import DetailId from './views/Detail/DetailId';
import DetailName from './views/Detail/DetailName';
import Navbar from './components/Navbar/Navbar';
// import { getPokemonByName } from './redux/actions';
// import { useDispatch } from 'react-redux';

// const dispatch = useDispatch();

const App = () => {
	// async function onSearch(name) {
	// 	try {
	// 		const { data } = await axios(`http://localhost:5040/pokemonapi/pokemons/${name}`);
	// 		if (data.name) {
	// 			dispatch(getPokemonByName(data));
	// 		} else {
	// 			window.alert('¡No hay personajes con este ID!');
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }

	return (
		<>
			<Navbar />
			<Routes>
				<Route
					exact
					path="/"
					element={<Welcome />}
				/>
				<Route
					exact
					path="/home"
					element={<Home />}
				/>
				<Route
					exact
					path="/pokemon/:id"
					element={<DetailId />}
				/>
				<Route
					exact
					path="/pokemon/search/:name"
					element={<DetailName />}
				/>
				<Route
					exact
					path="/create"
					element={<CreatePokemon />}
				/>
			</Routes>
		</>
	);
};

export default App;