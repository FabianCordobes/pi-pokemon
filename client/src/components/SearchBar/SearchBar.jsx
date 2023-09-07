// import React, { useState } from 'react';
// import { useDispatch } from "react-redux";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import style from './SearchBar.module.css';
// import axios from 'axios';
import { getPokemonByName } from '../../redux/actions';
import { Link } from 'react-router-dom';

const SearchBar = () => {
	const [name, setName] = useState('');
	const dispatch = useDispatch();

	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch(getPokemonByName(name));
	};

	const handleChange = (event) => {
		event.preventDefault();
		setName(event.target.value);
	};

	// const add = () => {
	// 	dispatch(getPokemonByName(name));
	// 	setName('');
	// };

	return (
		<div>
			{/* <label>Insert : </label> */}
			<form
				className={style.form}
				onSubmit={handleSubmit}>
				<input
					className={style.input}
					type="text"
					onChange={(e) => handleChange(e)}
					value={name}
					name="id"
					placeholder="Insert name..."
				/>
				<Link to={`/pokemon/search/${name}`}>
					<button
						className={style.button}
						type="submit"
						value={'Search'}
						onClick={() => {
							setName('');
						}}>
						Search
					</button>
				</Link>
			</form>
		</div>
	);
};

export default SearchBar;
