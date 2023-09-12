import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	getPokemonByName,
	clearPokemonDetails,
	deletePokemon,
} from '../../redux/actions'; // Importación de acciones de Redux

import style from './Detail.module.css'; // Importación de hojas de estilo
import { useNavigate, Link } from 'react-router-dom';
import pokeballIcon from '/public/Images/masterBall.png';
import Loading from '../../components/Loading/Loading';
import NotFound from '../../components/NotFound/NotFound';

export default function DetailName() {
	const navigate = useNavigate();
	const [name, setName] = useState('');

	useEffect(() => {
		// Obtener el nombre del Pokémon a partir de la URL
		const url = window.location.href.split('/');
		const name = url[url.length - 1];
		setName(name);
	}, [name, setName]);

	const dispatch = useDispatch();
	const pokemonDetail = useSelector((state) => state.detailPokemon);

	useEffect(() => {
		// Limpiar los detalles del Pokémon al montar el componente y obtener los detalles
		dispatch(clearPokemonDetails());
		dispatch(getPokemonByName(name));

		// Manipulación del estilo del elemento 'navbar'
		var value = '0px';
		document.getElementById('navbar').style.transform = `translate(0, ${value})`;

		// console.log(name);
	}, [name, dispatch]);

	const handleDelete = () => {
		// Manejar la eliminación de un Pokémon
		dispatch(deletePokemon(pokemonDetail.id));
		navigate('/home'); // Redirigir al usuario a la página de inicio
	};

	if (pokemonDetail === 'Pokemon not found') {
		return <NotFound />; // Mostrar un componente de Pokémon no encontrado
	}

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
									{pokemonDetail && pokemonDetail?.id?.length > 30 && (
										<button onClick={handleDelete}> Delete Pokemon </button>
									)}
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
// }
