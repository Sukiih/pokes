
//para obtener pokemon especifico
async function getPokemon(pokemon = '') {
    let url;
    
    // obtener al pokemon por id o por nombre
    if (pokemon) {
        url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    } else {
        let pokemonName = document.getElementById('pokemonName').value.toLowerCase(); 
        url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    }
    
    try {
        let res = await fetch(url);
        if (!res.ok) throw new Error('Pokémon not found');
        
        let data = await res.json();
        
        // mostramos los datos del poke
        displayPokemon(data);
    } catch (error) {
        console.error(error);

        document.querySelector('.card-title').innerHTML = 'Error';
        document.querySelector('.card-text').innerHTML = 'Ingresa un id o el nombre de un pokémon';
        document.querySelector('.card').style.display = 'block';
    }
}

function displayPokemon(data) {
    let cardTitle = document.querySelector('.card-title');
    let cardText = document.querySelector('.card-text');
    let card = document.querySelector('.card');
    
    // Mostrar datos del Pokémon 
    cardTitle.innerHTML = data.name.charAt(0).toUpperCase() + data.name.slice(1); 
    cardText.innerHTML = ` 
        <img src="${data.sprites.front_default}" alt="${data.name}">
        <p>Altura: ${data.height} decimetros</p>
        <p>Peso: ${data.weight} hectogramos</p>
    `;

    card.style.display = 'block';
}

//para obtener un pokemon random
function getRandomPokemon() {
    // son 807 pokemones
    let randomId = Math.floor(Math.random() * 807) + 1;
    getPokemon(randomId);

    // Limpia el input
    document.getElementById('pokemonName').value = '';
}
