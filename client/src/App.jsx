import './App.css';
import { Route, Routes } from 'react-router-dom';
import Welcome from './views/Welcome/Welcome';
import Home from './views/Home/Home';
import Detail from './views/Detail/Detail';
import CreatePokemon from './views/CreatePokemon/CreatePokemon';
import Navbar from './components/Navbar/Navbar';
// import { getPokemonByName } from './redux/actions';
// import axios from 'axios';
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
					element={<Detail />}
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
