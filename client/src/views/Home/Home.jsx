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
import Loading from '../../components/Loading/Loading';
import Filters from '../../components/Filters/Filters';

const Home = () => {
	const dispatch = useDispatch();
	const allPokemons = useSelector((state) => state.pokemons);
	const allTypes = useSelector((state) => state.types);
	const [currentPage, setCurrentPage] = useState(1);
	const pokemonsPerPage = 12;
	const lastPokemonOfThePage = currentPage * pokemonsPerPage;
	const firstPokemonOfThePage = lastPokemonOfThePage - pokemonsPerPage;
	const currentPokemons =
		allPokemons && allPokemons.slice(firstPokemonOfThePage, lastPokemonOfThePage);
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

	if (allPokemons.length === 0) return <Loading />;
	else
		return (
			<div className={style.homeContainer}>
				<div className={style.homeHeader}>
					<div className={style.columnReverse}>
						<Pagination
							pokemonsPerPage={pokemonsPerPage}
							allPokemons={allPokemons.length}
							pagination={pagination}
							currentPage={currentPage}
						/>
						<Filters
							handleFilterByOrigin={handleFilterByOrigin}
							handleFilterByType={handleFilterByType}
							handleSort={handleSort}
							order={order}
							allTypes={allTypes}
						/>
					</div>
				</div>

				<div className={style.center}>
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
					<div style={{ marginTop: '10px' }}>
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
