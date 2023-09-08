import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	getPokemonDetails,
	clearPokemonDetails,
	getPokemons,
	deletePokemon,
} from '../../redux/actions';
// import Loading from '../Loading/Loading';
// import PokeNotFound from '../NotFound/PokeNotFound';
import { useNavigate, Link } from 'react-router-dom';
import style from './Detail.module.css';

import pokeballIcon from '/public/Images/masterBall.png';
import Loading from '../../components/Loading/Loading';
export default function DetailId() {
	const [id, setId] = useState('');

	useEffect(() => {
		const url = window.location.href.split('/');
		const id = url[url.length - 1];
		setId(id);
	}, [setId]);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const pokemonDetail = useSelector((state) => state.detailPokemon);
	const idPokemon = id;
	const pokemons = useSelector((state) => state.pokemons);

	useEffect(() => {
		dispatch(clearPokemonDetails());
		dispatch(getPokemonDetails(idPokemon));
		var value = '0px';
		document.getElementById('navbar').style.transform = `translate(0,${value})`;
	}, [idPokemon, dispatch]);
	// console.log('detalle: ' + pokemonDetail.name);

	useEffect(() => {
		pokemons.length === 0 && dispatch(getPokemons());
	}, [dispatch, pokemons.length]);

	const handleDelete = () => {
		dispatch(deletePokemon(idPokemon));
		navigate('/home');
	};

	// console.log(pokemonDetail.name);

	// if (pokemonDetail === 'Pokemon not found') return <PokeNotFound />;
	if (pokemonDetail.name === undefined) return <Loading />;
	else {
		return (
			<div>
				<div className={style.hero}>
					<Link
						className={style.linkToBack}
						to="/home">
						Back
					</Link>
					<div className={style.card}>
						{pokemonDetail && pokemonDetail?.id?.length > 30 && (
							<button onClick={handleDelete}> Delete Pokemon </button>
						)}
						{/* <div className={style.circle}></div> */}
						<div className={style.title}>
							<h2>Pokemon Detail</h2>
						</div>
						<div className={style.content}>
							<div className={style.right}>
								<div className={style.detailHeader}>
									<div>
										<img
											src={pokeballIcon}
											alt="Pokeball"
										/>
										<h2>{pokemonDetail.name}</h2>
									</div>
								</div>

								<div className={style.detailImage}>
									<img
										src={pokemonDetail.image}
										alt={pokemonDetail.name}
									/>
								</div>

								<div className={style.types}>
									<h4>Type</h4>
									{pokemonDetail.type &&
										pokemonDetail.type.map((type, index) => (
											<div
												key={index}
												className={`${style.type} ${[type]}`}>
												{type}
											</div>
										))}
								</div>
							</div>

							<div className={style.left}>
								<div className={style.stats}>
									<div className={style.stat}>
										<div className={style.hp}>
											<p>HP</p>
										</div>
										<div>
											<p>Attack</p>
										</div>
										<div>
											<p>Defense</p>
										</div>
										<div>
											<p>Speed</p>
										</div>
										<div>
											<p>Height</p>
										</div>
										<div>
											<p>Weight</p>
										</div>
									</div>
									<div className={style.value}>
										<div className={style.hp}>
											<p>{pokemonDetail.hp}</p>
										</div>
										<div>
											<p>{pokemonDetail.attack}</p>
										</div>
										<div>
											<p>{pokemonDetail.defense}</p>
										</div>
										<div>
											<p>{pokemonDetail.speed}</p>
										</div>
										<div>
											<p>{pokemonDetail.height}</p>
										</div>
										<div>
											<p>{pokemonDetail.weight}</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
