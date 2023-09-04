import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import style from './Navbar.module.css';
import SearchBar from '../SearchBar/SearchBar';
import title from '/Images/pokemon_title.png';

const Navbar = () => {
	const [scrollingDirection, setScrollingDirection] = useState('down');
	const [prevScrollPos, setPrevScrollPos] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollPos = window.pageYOffset;

			if (currentScrollPos > prevScrollPos) {
				console.log('Scrolling down');
				setScrollingDirection('down');
			} else {
				console.log('Scrolling up');
				setScrollingDirection('up');
			}

			setPrevScrollPos(currentScrollPos);
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [prevScrollPos]);

	return (
		<nav
			id="navbar"
			className={`${style.nav} ${scrollingDirection === 'down' ? style.hidden : ''}`}>
			<div className={style.logoContainer}>
				<img
					src={title}
					alt="Title"
				/>
			</div>
			<div className={style.linkContainer}>
				<NavLink
					to="/home"
					activeClassName={style.activeLink}>
					<h1>Home</h1>
				</NavLink>
			</div>
			<SearchBar />
			<div className={style.linkContainer}>
				<NavLink
					to="/create"
					activeClassName={style.activeLink}>
					<h1>Create Pokemon</h1>
				</NavLink>
			</div>
		</nav>
	);
};

export default Navbar;
