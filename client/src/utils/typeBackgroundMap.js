
const typeBackGroundMap = {
   grass: 'grass-bg',
   fire: 'fire-bg',
   bug: 'bug-bg',
   dark: 'dark-bg',
   dragon: 'dragon-bg',
   electric: 'electric-bg',
   fairy: 'fairy-bg',
   fighting: 'fighting-bg',
   ghost: 'ghost-bg',
   flying: 'flying-bg',
   ground: 'ground-bg',
   psychic: 'psychic-bg',
   rock: 'rock-bg',
   shadow: 'shadow-bg',
   steel: 'steel-bg',
   unknown: 'unknown-bg',
   water: 'water-bg',
   normal: 'normal-bg',
   poison: 'poison-bg',
   ice: 'ice-bg',
}

export function getBackgroundClass(firstType) {
   
   return typeBackGroundMap[firstType] || 'default-bg'
}