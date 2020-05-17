let timeStamp = new Date().getTime();
let apiKey = "PUBLIC_KEY";
let privateKey = "PRIVATE_KEY";
let hash = md5(timeStamp + privateKey + apiKey);
let urlImage = "";
let nameHero = "";
let heroDescription = "";
let countHero = 1;
let avengers = ['Iron%20Man', 'Hulk', 'Captain%20America', 'Thor', 'Black%20Widow', 'Hawkeye', 'Nick%20Fury', 'Maria%20Hill'];


function marvelConection(inputNameHero) {
    fetch(`http://gateway.marvel.com/v1/public/characters?name=${inputNameHero}&ts=${timeStamp}&apikey=${apiKey}&hash=${hash}`)
        .then((response) => {
            if (!response.ok) throw new Error('Erro ao executar requisição: ' + response.status);
            return response.json();
        }).then((data) => {
            nameHero = data.data.results[0].name;
            heroDescription = data.data.results[0].description;
            urlImage = data.data.results[0].thumbnail.path + '/portrait_uncanny.jpg';
            if (countHero == 5) {
                document.getElementById('arrowRight').style.visibility = "visible";
                nextWrap();
            }
            if (countHero <= 8) {
                createSingleHero(nameHero, heroDescription, urlImage);
                countHero++;
            } else {
                alert("Only 8 characters at a time");
            }
        }).catch((error) => {
            console.error(error.message);
            alert('Character not found');
        });
}

function treatHeroName(inputNameHero) {
    for (let index = 0; index < inputNameHero.length; index++) {
        if (inputNameHero.charAt(index) == " ") {
            inputNameHero = inputNameHero.replace(inputNameHero.substring(index, index + 1), "%20");
        }
    }
    return inputNameHero;
}

function createSingleHero(nameHero, heroDescription, urlImage) {
    let wrap = document.getElementById("wrap");
    let singleHero = document.createElement('div');
    let imgHero = document.createElement('div');
    let heroName = document.createElement('h1');

    singleHero.setAttribute('class', 'singleHero');
    singleHero.setAttribute('description', heroDescription);
    singleHero.setAttribute('url', urlImage);

    imgHero.setAttribute('id', 'imgHero');
    imgHero.style.backgroundImage = "url(" + urlImage + ")";
    singleHero.appendChild(imgHero);

    heroName.setAttribute('id', 'nameHero');
    heroName.innerHTML = nameHero;
    singleHero.appendChild(heroName);

    wrap.appendChild(singleHero);
}

window.onload = () => {
    addEvents();
    for (const key in avengers) {
        marvelConection(avengers[key]);
    }
}

function addEvents() {
    document.getElementById('wrap').addEventListener('click', () => {
        document.getElementById('nameHeroDescription').innerText = event.path[1].innerText;
        let heroDescription = event.path[1].attributes[1].nodeValue;
        if (heroDescription == "") {
            document.getElementById('heroDescription').innerText = "This character has no description.";
        } else {
            document.getElementById('heroDescription').innerText = heroDescription;
        }
        document.getElementById('imgHeroDescription').style.backgroundImage = "url(" + event.path[1].attributes[2].nodeValue + ")";
        document.getElementById('hero').style.display = "flex";
    });

    let searchInput = document.getElementById("search-input");
    searchInput.addEventListener("click", () => {
        searchInput.style.width = '100%';
    });
    searchInput.addEventListener('keypress', (e) => {
        if (e.which == 13) {
            searchBtn.click();
        }
    });

    let searchBtn = document.getElementById("search-btn");
    searchBtn.addEventListener("click", () => {
        inputNameHero = searchInput.value;
        if (inputNameHero != "") {
            inputNameHero = treatHeroName(inputNameHero);
            if (countHero == 9) {
                var elemento = document.getElementById("wrap");
                while (elemento.firstChild) {
                    elemento.removeChild(elemento.firstChild);
                }
                document.getElementById('arrowLeft').style.visibility = "hidden";
                document.getElementById('arrowRight').style.visibility = "hidden";
                countHero = 1;
            }
            marvelConection(inputNameHero);
            searchInput.value = "";
            searchInput.style.width = '50%';
        } else {
            alert('enter the name of the character!');
        }

    });

    document.getElementById('exit').addEventListener('click', () => {
        document.getElementById('hero').style.display = "none";
    });

}

function previousWrap() {
    let heroes = document.getElementsByClassName('singleHero');
    heroes[0].style.margin = '0 2vw';
    document.getElementById('arrowLeft').style.visibility = "hidden";
    document.getElementById('arrowRight').style.visibility = "visible";
}

function nextWrap() {
    let heroes = document.getElementsByClassName('singleHero')
    heroes[0].style.margin = '0 0 0 -83vw';
    document.getElementById('arrowLeft').style.visibility = "visible";
    document.getElementById('arrowRight').style.visibility = "hidden";
}
