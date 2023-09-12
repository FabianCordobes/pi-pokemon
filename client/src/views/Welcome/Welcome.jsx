import { useEffect } from 'react';
import style from './Welcome.module.css';
import { Link } from 'react-router-dom';
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';
function Welcome() {
	const handleClickVideo = () => {
		const video = document.getElementById('video');
		video.muted = !video.muted;
	};

	setTimeout(function () {
		document.getElementById('afterIntro').style.opacity = 1;
	}, 25000);

	useEffect(() => {
		var value = '-500px';
		document.getElementById('navbar').style.transform = `translate(0,${value})`;
	}, []);

	return (
		<div className={style.hero}>
			<div
				onChange={handleClickVideo}>
				<ToggleSwitch label=" " />
				<p
					id="parrafo"
					className={style.parrafo}>
					MUSIC
				</p>
			</div>
			<video
				id="video"
				autoPlay
				muted
				loop
				src="/Videos/intro_pokemon.mp4"
				style={{
					position: 'absolute',
					width: '90vW',
					left: '50%',
					top: '50%',
					height: '100vh',
					objectFit: 'cover',
					transform: 'translate(-50%, -50%)',
					zIndex: '-1',
				}}></video>
			<div
				className={style.content}
				id="afterIntro">
				<button className={style.btn}>
					<Link
						to="/home"
						className={style.linkToHome}></Link>
				</button>
				<p className={style.footerP}>© 2023 Fabian C. Todos los derechos reservados.</p>
			</div>
		</div>
	);
}

export default Welcome;
