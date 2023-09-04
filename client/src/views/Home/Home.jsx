import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/Card/Card';
import Pagination from '../../components/Pagination/Pagination';
import style from './Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
	clearPokemonDetails,
	filterByOrigin,
	filterByType,
	getPokemons,
	getTypes,
	sortBy,
} from '../../redux/actions';
// import Loading from '../Loading/Loading';
import MusicPlayer from '../../components/MusicPlayer/MusicPlayer';

const Home = () => {
	const dispatch = useDispatch();
	const allPokemons = useSelector((state) => state.pokemons);
	const allTypes = useSelector((state) => state.types);
	const msg = useSelector((state) => state.msg);
	const [currentPage, setCurrentPage] = useState(1);
	const pokemonsPerPage = 12;
	const lastPokemonOfThePage = currentPage * pokemonsPerPage;
	const firstPokemonOfThePage = lastPokemonOfThePage - pokemonsPerPage;
	const currentPokemons = allPokemons.slice(firstPokemonOfThePage, lastPokemonOfThePage);

	const pagination = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	useEffect(() => {
		dispatch(getPokemons());
		dispatch(getTypes());
		dispatch(clearPokemonDetails());
		var value = '0px';
		document.getElementById('navbar').style.transform = `translate(0,${value})`;

	}, [dispatch]);

	const handleFilterByOrigin = (event) => {
		dispatch(filterByOrigin(event.target.value));
		setCurrentPage(1);
	};

	const handleFilterByType = (event) => {
		dispatch(filterByType(event.target.value));
		setCurrentPage(1);
	};

	const [order, setOrder] = useState('');

	const handleSort = (event) => {
		dispatch(sortBy(event.target.value));
		setCurrentPage(1);
		setOrder(event.target.value);
	};

	// if (allPokemons.length === 0) return <Loading />;
	// else
	return (
		<div className={style.homeContainer}>
			<MusicPlayer  />
				<div>
					<div>
						<select
							defaultValue={'default'}
							onChange={(e) => handleFilterByOrigin(e)}>
							<option
								value={'default'}
								hidden>
								origin
							</option>
							<option value="All">All</option>
							<option value="PokeAPI">PokeAPI</option>
							<option value="Created">Created</option>
						</select>
					</div>

					<div>
						<select
							defaultValue={'default'}
							onChange={(e) => handleFilterByType(e)}>
							<option
								value={'default'}
								hidden>
								Type
							</option>
							<option value="All">All</option>
							{msg.length && alert(msg)}
							{allTypes.map((type) => (
								<option
									key={type.id}
									value={type.name}>
									{type.name}
								</option>
							))}
						</select>
					</div>

					<div>
						<select
							defaultValue={'default'}
							onChange={(e) => handleSort(e)}>
							<option
								value={'default'}
								hidden>
								Order
							</option>
							<option value="A-Z">A-Z</option>
							<option value="Z-A">Z-A</option>
							<option value="Ʌ Attack">+ Attack</option>
							<option value="V Attack">- Attack</option>
							<option value="id">ID</option>
						</select>
					</div>
				</div>
			<div>

				<div className={style.divCardsContainer}>
					{currentPokemons?.map((p) => (
						<Link
							to={`/pokemon/${p.id}`}
							key={p.id}
							className={style.cardLink}>
							<Card
								key={p.id}
								name={p.name}
								image={p.image}
								type={p.type}
							/>
						</Link>
					))}
				</div>
				<div>
					<Pagination
						pokemonsPerPage={pokemonsPerPage}
						allPokemons={allPokemons.length}
						pagination={pagination}
						currentPage={currentPage}
					/>
				</div>
			</div>
		</div>
	);
};

export default Home;
