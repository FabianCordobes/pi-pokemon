import bug from '../assets/icons/pokemon_types/type_bug.png';
import dark from '../assets/icons/pokemon_types/type_dark.png';
import dragon from '../assets/icons/pokemon_types/type_dragon.jpg';
import electric from '../assets/icons/pokemon_types/type_electric.png';
import fighting from '../assets/icons/pokemon_types/type_fight.png';
import fire from '../assets/icons/pokemon_types/type_fire.png';
import flying from '../assets/icons/pokemon_types/type_flying.png';
import ghost from '../assets/icons/pokemon_types/type_ghost.png';
import grass from '../assets/icons/pokemon_types/type_grass.png';
import ground from '../assets/icons/pokemon_types/type_ground.png';
import ice from '../assets/icons/pokemon_types/type_ice.png';
import normal from '../assets/icons/pokemon_types/type_normal.png';
import poison from '../assets/icons/pokemon_types/type_poison.png';
import psychic from '../assets/icons/pokemon_types/type_psych.png';
import rock from '../assets/icons/pokemon_types/type_rock.png';
import steel from '../assets/icons/pokemon_types/type_steel.png';
import water from '../assets/icons/pokemon_types/type_water.png';
import fairy from '../assets/icons/pokemon_types/type_fairy.png';
import unknown from '../assets/icons/pokemon_types/type_unknown.png';
import shadow from '../assets/icons/pokemon_types/type_shadow.png';

export function getImageSrc(types) {
	const typeImages = [];

	const typeImageMap = {
		unknown: unknown,
		shadow: shadow,
		fairy: fairy,
		dragon: dragon,
		fighting: fighting,
		bug: bug,
		dark: dark,
		electric: electric,
		fire: fire,
		flying: flying,
		ghost: ghost,
		grass: grass,
		ground: ground,
		ice: ice,
		normal: normal,
		poison: poison,
		psychic: psychic,
		rock: rock,
		steel: steel,
		water: water,
	};

	types.forEach((type) => {
		const imageSrc = typeImageMap[type];
		if (imageSrc) {
			typeImages.push(imageSrc);
		}
	});

	return typeImages;
}
