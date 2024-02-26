document.addEventListener('DOMContentLoaded', async function() {
    const pokemonsList = document.querySelector('.pokemons');

    try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=9');
        const pokemonData = response.data.results;

        for (const pokemon of pokemonData) {
            const pokemonDetails = await axios.get(pokemon.url);
            const { id, name, types, sprites, abilities } = pokemonDetails.data;

            const listItem = document.createElement('li');
            listItem.classList.add('pokemon');

            const numberSpan = document.createElement('span');
            numberSpan.classList.add('number');
            numberSpan.textContent = `#${id.toString().padStart(3, '0')}`;

            const nameSpan = document.createElement('span');
            nameSpan.classList.add('name');
            nameSpan.textContent = name;

            const typesList = document.createElement('ol');
            typesList.classList.add('types');
            types.forEach(type => {
                const typeItem = document.createElement('li');
                typeItem.classList.add('type');
                typeItem.textContent = type.type.name;
                typesList.appendChild(typeItem);
            });

            const detailDiv = document.createElement('div');
            detailDiv.classList.add('detail');

            const img = document.createElement('img');
            img.src = sprites.other['dream_world'].front_default;
            img.alt = name;

            listItem.appendChild(numberSpan);
            listItem.appendChild(nameSpan);
            listItem.appendChild(detailDiv);

            detailDiv.appendChild(typesList);
            detailDiv.appendChild(img);

            // Adiciona um evento de clique para mostrar os detalhes do Pokémon
            listItem.addEventListener('click', function() {
                redirectToPokemonDetails(id, abilities);
            });

            pokemonsList.appendChild(listItem);
        }
    } catch (error) {
        console.error('Error fetching Pokemon data:', error.message);
    }
});

// Função para redirecionar para a página de detalhes do Pokémon
function redirectToPokemonDetails(id, abilities) {
    const abilitiesParam = abilities.map(ability => ability.ability.name).join(',');
    window.location.href = `/pokemon-details.html?id=${id}&abilities=${abilitiesParam}`;
}
