import { useDispatch, useSelector } from 'react-redux';
import {
	//   clearPokemonDetails,
	filterByOrigin,
	filterByType,
	sortBy,
} from '../../redux/actions';
// import { useState } from 'react';

const Filters = () => {
	const dispatch = useDispatch();
	const allTypes = useSelector((state) => state.types);
	// const msg = useSelector((state) => state.msg);
	// const [currentPage, setCurrentPage] = useState(1);
   
   
	const handleFilterByOrigin = (event) => {
      dispatch(filterByOrigin(event.target.value));
		// setCurrentPage(1);
	};
   
	const handleFilterByType = (event) => {
      dispatch(filterByType(event.target.value));
		// setCurrentPage(1);
	};
   
   // const [order, setOrder] = useState('');

	const handleSort = (event) => {
		dispatch(sortBy(event.target.value));
		// setCurrentPage(1);
		// setOrder(event.target.value);
	};

	return (
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
					{/* {msg.length && alert(msg)} */}
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
	);
};

export default Filters;
