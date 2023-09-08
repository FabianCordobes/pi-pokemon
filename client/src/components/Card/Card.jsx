import { getImageSrc } from '../../utils/icons';
import style from './Card.module.css';
import { getBackgroundClass } from '../../utils/typeBackgroundMap';
import Loading from '../Loading/Loading';

const Card = ({ name, image, type }) => {
	// Convierte los valores de type a minúsculas
	const typeLowerCase = type.map((typeName) => typeName.toLowerCase());

	// Obtiene las rutas de imagen
	const typeImages = getImageSrc(typeLowerCase);

	// Obtiene la clase de fondo basada en el primer tipo
	const firstType = typeLowerCase[0];
	const bgColorClass = getBackgroundClass(firstType);

	return (
		<div className={`${style.cardContainer} ${style[bgColorClass]}`}>
			<h2>{name}</h2>
			<img
				className={style.cardImg}
				src={image}
				alt={name}
			/>

			<div className={style.cardTypeContainer}>
				{typeImages.map((typeImage, index) => (
					<div
						key={index}
						className={style.cardTypeImg}>
						<img
							src={typeImage}
							alt={`Type ${index + 1}`}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default Card;
