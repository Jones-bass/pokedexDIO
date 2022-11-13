
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151;
const limit = 12;
let offset = 0;


function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
        <span class="number">${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <span class="number">Altura ${pokemon.height}</span>
        <span class="number">${pokemon.weight.toFixed(2)}kg</span>

        <ol class="types">
        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        </ol>


        <div class="detail">
        
    
        <ol class="types">
        ${pokemon.stats.map((type) => `
            <li class="type">${type.stat.name}
                    <progress max="100" value="${type.base_stat}"></progress>`).join('')}
                </li>
            </ol>


        <div>
            <img src="${pokemon.photo}" alt="${pokemon.name}">

        </div>
        </div>
    </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
