import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTypes, createPokemon, getPokemons } from '../../redux/actions';
import { validate, valSelect } from '../../validators/validators';
import style from './CreatePokemon.module.css';

import pokedexImg from '/public/Images/pokedex.jpg';

export default function CreatePokemon() {
	//const DEFAULT_IMG = 'https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg';

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const pokeTypes = useSelector((state) => state.types);
	const pokemons = useSelector((state) => state.pokemons);


	
	const [errors, setErrors] = useState({});
	const [errorSelect, setErrorSelect] = useState({});
	const [disabled, setDisabled] = useState(true);
	const [input, setInput] = useState({
		name: '',
		hp: '',
		attack: '',
		defense: '',
		speed: '',
		height: '',
		weight: '',
		image: '',
		type: [],
	});

	useEffect(() => {
		dispatch(getTypes());
		dispatch(getPokemons());
		// var value = '0px';
		// document.getElementById('navbar').style.transform = `translate(0,${value})`;
	}, [dispatch]);

	const handleChange = (e) => {
		setInput({ ...input, [e.target.name]: e.target.value });
		const valErrors = validate({ ...input, [e.target.name]: e.target.value }, pokemons);
		const valErrorTypes = valSelect(input);

		if (JSON.stringify(valErrors) === '{}' && JSON.stringify(valErrorTypes) === '{}') {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
		setErrors(valErrors);
		setErrorSelect(valErrorTypes);
	};

	const handleSelect = (e) => {
		if (!input.type.includes(e.target.value)) {
			setInput({
				...input,
				type: [...input.type, e.target.value],
			});
			const valErrorTypes = valSelect({
				...input,
				type: [...input.type, e.target.value],
			});
			const valErrors = validate(input, pokemons);

			if (JSON.stringify(valErrorTypes) === '{}' && JSON.stringify(valErrors) === '{}') {
				setDisabled(false);
			} else {
				setDisabled(true);
			}
			setErrors(valErrors);
			setErrorSelect(valErrorTypes);
		}
	};

	const handleDelete = (type) => {
		setInput({
			...input,
			type: input.type?.filter((t) => t !== type),
		});
		const valErrorTypes = valSelect({
			...input,
			type: input.type?.filter((t) => t !== type),
		});
		const valErrors = validate(input, pokemons);

		if (JSON.stringify(valErrorTypes) === '{}' && JSON.stringify(valErrors) === '{}') {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
		setErrors(valErrors);
		setErrorSelect(valErrorTypes);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(createPokemon(input));
		setInput({
			name: '',
			hp: '',
			attack: '',
			defense: '',
			speed: '',
			height: '',
			weight: '',
			image: '',
			type: [],
		});
		navigate('/home');
	};

	return (
			<div className={style.bgcreate}>
				<div className={style.imgCont}>
					<img
						src={pokedexImg}
						alt="Pokedex"
						className={style.pokedexImg}
					/>
				</div>
				<div className={style.formContent}>
					<h1>Create your pokemon</h1>
					<form
						className={style.formu}
						onSubmit={(e) => handleSubmit(e)}>
						<div>
							<div className={style.inputContainer}>
								<label className={style.labele}>Pokemon name </label>
								<input
									className={style.inputcreate}
									type="text"
									value={input.name}
									name="name"
									placeholder="Insert name..."
									onChange={(e) => handleChange(e)}
								/>
								{errors.name && <p className={style.errors}>{errors.name}</p>}
							</div>

							<div className={style.inputContainer}>
								<label className={style.labele}>Pokemon image </label>
								<input
									className={style.inputcreate}
									type="url"
									value={input.image}
									name="image"
									placeholder="Insert url..."
									onChange={(e) => handleChange(e)}
								/>
								{errors.image && <p className={style.errors}>{errors.image}</p>}
							</div>

							<div className={style.selectContainer}>
								<label className={style.labele}>Choose types</label>
								<select
									className={style.selected}
									disabled={input.type.length > 2}
									defaultValue="title"
									onChange={(e) => handleSelect(e)}>
									<option
										value="title"
										disabled
										name="types">
										Choose types
									</option>
									{pokeTypes?.map((t) => {
										return (
											<option
												value={t.name}
												key={t.id}>
												{t.name}
											</option>
										);
									})}
								</select>
								{input.types?.map((t, index) => (
									<div key={index}>
										<span className={style.options}>{t} </span>
										<span
											className={style.optionsdelete}
											onClick={() => handleDelete(t)}>
											delete
										</span>
									</div>
								))}
								{errorSelect.types && <p className={style.errors}>{errorSelect.types}</p>}
							</div>

							<div className={style.inputContainer}>
								<label className={style.labele}>HP </label>
								<input
									className={style.inputcreate}
									type="number"
									placeholder="1 - 100"
									value={input.hp}
									name="hp"
									onChange={(e) => handleChange(e)}
								/>
								{errors.hp && <p className={style.errors}>{errors.hp}</p>}
							</div>

							<div className={style.inputContainer}>
								<label className={style.labele}>Attack</label>
								<input
									className={style.inputcreate}
									type="number"
									placeholder="1 - 100"
									value={input.attack}
									name="attack"
									onChange={(e) => handleChange(e)}
								/>
								{errors.attack && <p className={style.errors}>{errors.attack}</p>}
							</div>
						</div>

						<div className={style.center}>
							<div className={style.inputContainer}>
								<label className={style.labele}>Defense</label>
								<input
									className={style.inputcreate}
									type="number"
									placeholder="1 - 100"
									value={input.defense}
									name="defense"
									onChange={(e) => handleChange(e)}
								/>
								{errors.defense && <p className={style.errors}>{errors.defense}</p>}
							</div>

							<div className={style.inputContainer}>
								<label className={style.labele}>Speed</label>
								<input
									className={style.inputcreate}
									type="number"
									placeholder="1 - 100"
									value={input.speed}
									name="speed"
									onChange={(e) => handleChange(e)}
								/>
								{errors.speed && <p className={style.errors}>{errors.speed}</p>}
							</div>

							<div className={style.inputContainer}>
								<label className={style.labele}>Height</label>
								<input
									className={style.inputcreate}
									type="number"
									placeholder="1 - 100"
									value={input.height}
									name="height"
									onChange={(e) => handleChange(e)}
								/>
								{errors.height && <p className={style.errors}>{errors.height}</p>}
							</div>

							<div className={style.inputContainer}>
								<label className={style.labele}>Weight</label>
								<input
									className={style.inputcreate}
									type="number"
									placeholder="1 - 100"
									value={input.weight}
									name="weight"
									onChange={(e) => handleChange(e)}
								/>
								{errors.weight && <p className={style.errors}>{errors.weight}</p>}
							</div>

							<div className={style.buttonContainer}>
								<button
									className={style.createButton}
									type="submit"
									// value={'CREATE POKEMON'}
									disabled={disabled}>
									CREATE POKEMON
								</button>
							</div>
						</div>
					</form>
				</div>
		</div>
	);
}
