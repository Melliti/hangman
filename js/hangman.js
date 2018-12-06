var pokemonInfo = new Array;
var pokemonName = "";

function formatStr(pokemonName) {
   var a = [], start=0;
   while(start<pokemonName.length) {
      a.push(pokemonName.slice(start, start+1));
      start+=1;
   }
   return a.join(" ");
}

function createHangman() {
    var i = 0;

    while (i != pokemonInfo[0].length - 1)
    {
        pokemonName += '_';
        i++;
    }
    pokemonName = pokemonName.replace(pokemonName.charAt(0), pokemonInfo[0][0]);
    pokemonName = pokemonName.replace(/.$/, pokemonInfo[0][i]);
    //pokemonName[i - 1] = pokemonInfo[0][i - 1];
    console.log(pokemonName);
}

function randomPokemon() {
    // 802 = number of pokemon in the API
    var selectedPokemon = 0;
    selectedPokemon = Math.floor((Math.random() * 802) + 1);
    return selectedPokemon;
}

function pickPokemon() {
    var reader = new XMLHttpRequest();
    var divName = document.getElementById('name');
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
                createHangman();
                pokemonName = formatStr(pokemonName);
                divName.innerHTML = '<p class=\"center-align\">' + pokemonName + '</p>';
                return pokemonInfo;
            }
        }
    }
}