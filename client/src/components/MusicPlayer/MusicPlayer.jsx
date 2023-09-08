import React, { useState, useEffect } from 'react';
import audioList from '../../utils/audioData';
import style from './MusicPlayer.module.css';
const playIcon = '/Images/play_icon.jpg'; // Ruta de la imagen de reproducción
const pauseIcon = '/Images/pause_icon.jpg'; // Ruta de la imagen de pausa
const nextIcon = '/Images/next_icon.jpg'; // Ruta de la imagen de pausa
const prevIcon = '/Images/prev_icon.jpg'; // Ruta de la imagen de pausa

const MusicPlayer = () => {
	const [audioIndex, setAudioIndex] = useState(0);
	const [audio] = useState(new Audio());
	const [isPlaying, setIsPlaying] = useState(false);

	useEffect(() => {
		// Actualiza la fuente del audio al cambiar de pista
		audio.src = audioList[audioIndex].src;

		// Reproduce o pausa el audio según el estado de reproducción actual
		if (isPlaying) {
			audio.play();
		} else {
			audio.pause();
		}
	}, [audioIndex]);

	const playAudio = () => {
		audio.currentTime = 0;
		audio.play();
		setIsPlaying(true);
	};

	const pauseAudio = () => {
		audio.pause();
		setIsPlaying(false);
	};

	const nextTrack = () => {
		if (audioIndex < audioList.length - 1) {
			setAudioIndex(audioIndex + 1);
		} else {
			setAudioIndex(0);
		}
	};

	const prevTrack = () => {
		if (audioIndex > 0) {
			setAudioIndex(audioIndex - 1);
		} else {
			setAudioIndex(audioList.length - 1);
		}
	};

	return (
		<div className={style.musicPlayer}>
			<h2>{audioList[audioIndex].title}</h2>
			<div>
				<button
					onClick={prevTrack}
					className={style.playButton}>
					<img
						src={prevIcon}
						alt="Preview Track"
					/>
				</button>
				<button
					onClick={isPlaying ? pauseAudio : playAudio}
					className={style.playButton}>
					<img
						src={isPlaying ? pauseIcon : playIcon}
						alt={isPlaying ? 'Pause Music' : 'Play Music'}
					/>
				</button>
				<button
					onClick={nextTrack}
					className={style.playButton}>
					<img
						src={nextIcon}
						alt="Next Track"
					/>
				</button>
			</div>
		</div>
	);
};

export default MusicPlayer;
