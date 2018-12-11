var pokemonInfo = new Array;
var pokemonName = "";
var attempt = 8;

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
        if (pokemonInfo[0] == '-')
            pokemonName += '-';
        else
            pokemonName += '_';
        i++;
    }
    pokemonName += '_';
    pokemonName = pokemonName.replace(pokemonName.charAt(0), pokemonInfo[0][0]);
    pokemonName = pokemonName.replace(/.$/, pokemonInfo[0][i]); 
}

function randomPokemon() {
    // 802 = number of pokemon in the API
    var selectedPokemon = 0;
    selectedPokemon = Math.floor((Math.random() * 802) + 1);
    return selectedPokemon;
}

function pickPokemon() {
    var reader = new XMLHttpRequest();
    var divForName = document.getElementById('name');
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
                pokemonName = formatStr(pokemonName).toUpperCase();
                divForName.innerHTML = '<p class=\"center-align\">' + pokemonName + '</p>';
                return pokemonInfo;
            }
        }
    }
}

function checkLetter() {
    var answer = document.getElementById("letter").value;
    var indices = indexesOf(pokemonInfo[0].toUpperCase(), answer.toUpperCase());
    if (indices.length > 0)
        replaceAt(indices, answer);
    if (indices.length == 0)
        attempt--;
    if (attempt == 0)
        isLost();
    document.getElementById("letter").value = "";
    isWin(answer);
}

function checkName() {
    var answer = document.getElementById("fullName").value;
    console.log(pokemonInfo[0] + " " + isWin(answer));
    if (isWin(answer))
        if (--attempt == 0)
            isLost();
    var answer = document.getElementById("fullName").value = "";
}

function isLost() {
    document.getElementById("userInput").style.display = "none";
}

function isWin(answer) {
    if (answer.toUpperCase() == pokemonInfo[0].toUpperCase()
        || !pokemonName.includes("_"))
        {
            var divForSprite = document.getElementById("sprite");
            console.log(pokemonInfo[1]);
            divForSprite.innerHTML = '<img src=\"' + pokemonInfo[1] +  '\" id=\"pokemonSprite\">';
            var img = document.getElementById("pokemonSprite");
            img.style.display = "block";
            img.style.margin = "0 auto";
            return 0;
        }
    return 1;
}

function indexesOf(str, content) {
    var indices = [];
    console.log(str, content);
    for(var idx = 1; idx < str.length - 1; idx++)
        if (str[idx] === content)
            indices.push(idx);
    return indices;
}

function replaceAt(indices, letter) {
    
    indices.forEach(elem => {
        pokemonName = pokemonName.substr(0, elem * 2) + letter.toUpperCase() + pokemonName.substr(elem * 2 + 1);
    });

    var divForName = document.getElementById('name');
    divForName.innerHTML = '<p class=\"center-align\">' + pokemonName + '</p>';
}