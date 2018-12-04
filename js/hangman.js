function randomPokemon() {
    var selectedPokemon = 0;
    selectedPokemon = Math.floor((Math.random() * 802) + 1);
    return selectedPokemon;
}

function pickPokemon() {
    var reader = new XMLHttpRequest();
    var pokemonInfo = new Array;
    reader.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + randomPokemon() + '/', true);
    reader.send('null');
    reader.onreadystatechange = function () {
        if(reader.readyState === 4)
        {
            if(reader.status === 200 || reader.status == 0)
            {
                var pokemonObj = JSON.parse(reader.responseText);
                pokemonInfo[0] = pokemonObj.name;
                pokemonInfo[1] = pokemonObj.sprites.front_default;
                pokemonInfo[2] = pokemonObj.sprites.front_shiny;
                return pokemonInfo;
            }
        }
    }
}