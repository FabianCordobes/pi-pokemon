const URL_POKE = 'https://pokeapi.co/api/v2/pokemon';
const URL_TYPE = 'https://pokeapi.co/api/v2/type';

const URL_SERVER = `http://localhost:${process.env.PORT}`;


function capitalize (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowercase (string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}

function startsWithCapital(string){
    return string.charAt(0) === string.charAt(0).toUpperCase()
}


module.exports = {
    URL_POKE,
    URL_TYPE,
    URL_SERVER,
    capitalize,
    lowercase,
    startsWithCapital
}