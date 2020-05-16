let timeStamp = new Date().getTime();
let apiKey = "3a17ede23448f1a4556e95f4da4426f0";
let hash = md5(timeStamp + "071ec58258b57252f96f47a82f2ad9501d9ccdf93a17ede23448f1a4556e95f4da4426f0");
var urlImage = "";
var nameHero = "";
let heroMarvel = [];


function marvelConection(inputNameHero) {
    fetch(`http://gateway.marvel.com/v1/public/characters?name=${inputNameHero}&ts=${timeStamp}&apikey=${apiKey}&hash=${hash}`)
        .then((response) => {
            if (!response.ok) throw new Error('Erro ao executar requisição: ' + response.status);
            return response.json();
        }).then((data) => {
            heroMarvel.push(data.data);
            console.log(data.data.results[0])
            urlImage = data.data.results[0].thumbnail.path + '/portrait_uncanny.jpg';
            nameHero = data.data.results[0].name;
            createSingleHero(urlImage, nameHero);
        }).catch((error) => {
            console.error(error.message);
            alert('Character not found');
        });
}

let searchInput = document.getElementById("search-input");
searchInput.addEventListener("click", () => {
    searchInput.style.width = '100%';
});

let searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", () => {
    inputNameHero = searchInput.value;
    if (inputNameHero != "") {
        inputNameHero = treatHeroName(inputNameHero);
        marvelConection(inputNameHero);
        searchInput.value = "";
        searchInput.style.width = '50%';
    } else {
        alert('enter the name of the character!');
    }

});

function treatHeroName(inputNameHero) {
    for (let index = 0; index < inputNameHero.length; index++) {
        if (inputNameHero.charAt(index) == " ") {
            inputNameHero = inputNameHero.replace(inputNameHero.substring(index, index + 1), "%20");
        }
    }
    return inputNameHero;
}

function createSingleHero(urlImage, nameHero) {
    let wrap = document.getElementById("wrap");
    let singleHero = document.createElement('div');
    let imgHero = document.createElement('div');
    let heroName = document.createElement('h1');

    singleHero.setAttribute('class', 'singleHero');

    imgHero.setAttribute('id', 'imgHero');
    imgHero.style.backgroundImage = "url(" + urlImage + ")";
    singleHero.appendChild(imgHero);

    heroName.setAttribute('id', 'nameHero');
    heroName.innerHTML = nameHero;
    singleHero.appendChild(heroName);

    wrap.appendChild(singleHero);
}

