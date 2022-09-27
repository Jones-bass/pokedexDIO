
const pokeApi = {} //constante glogal

function convertPokeApiDetailToPokemon(pokeDetail) { //Conervetendo pokeAPI para o nosso modelo e estrutura
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json()) //convertendo p JSON
        .then((jsonBody) => jsonBody.results) // Lista Pokemon
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) //Buscando uma nova lista de detalhes dos pokemons
        .then((detailRequests) => Promise.all(detailRequests)) //Lista de detalhes ja convertido em JSON
        .then((pokemonsDetails) => pokemonsDetails)
    }
