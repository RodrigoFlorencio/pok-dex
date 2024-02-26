// pokemon-details.js

document.addEventListener('DOMContentLoaded', function() {
    // Obtém os detalhes do Pokémon da URL
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get('id');

    // Chama a função para carregar os detalhes do Pokémon
    loadPokemonDetails(pokemonId);
});

// Função para carregar os detalhes do Pokémon
async function loadPokemonDetails(id) {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const { name, types, sprites } = response.data;

        const pokemonDetailsContainer = document.querySelector('.pokemons');
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

        pokemonDetailsContainer.appendChild(listItem);
    } catch (error) {
        console.error('Error fetching Pokemon details:', error.message);
    }
}
