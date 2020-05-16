let timeStamp = new Date().getTime();
let apiKey = "3a17ede23448f1a4556e95f4da4426f0";
let hash = md5(timeStamp + "071ec58258b57252f96f47a82f2ad9501d9ccdf93a17ede23448f1a4556e95f4da4426f0");
const maxCharacters = 1500;

//marvelConection();

function marvelConection() {
    fetch(`http://gateway.marvel.com/v1/public/characters?name=iron%20man&ts=${timeStamp}&apikey=${apiKey}&hash=${hash}`)
        .then((response) => {
            if (!response.ok) throw new Error('Erro ao executar requisição: ' + response.status);
            return response.json();
        }).then((data) => {
            console.log(data.data);
        }).catch((error) => {
            console.error(error.message);
        });
}


document.getElementById("search-btn").addEventListener("click", () => {
    let searchInput = document.getElementById('search-input');
    searchInput.style.width = '100%';
    searchInput.style.visibility = 'visible';
    searchInput.focus();
});

/*
<div class="singleHero">
    <div id="imgHero"></div>
    <h1 id="name">IRON MAN</h1>
</div>
*/
let groupWrap = [];

let urlImage = 'http://i.annihil.us/u/prod/marvel/i/mg/9/c0/527bb7b37ff55/portrait_uncanny.jpg';
let nameHero = 'IRON MAN';

let contWrap = 1;
function createWrap(urlImage, nameHero) {
    let slideShow = document.getElementById("slideshow");
    let wrap = document.createElement('div');
    for (let index = 0; index < 5; index++) {
        let singleHero = document.createElement('div');
        let imgHero = document.createElement('div');
        let heroName = document.createElement('h1');

        let singleWrap = 'wrap' + contWrap;
        wrap.setAttribute('id', singleWrap);
        wrap.setAttribute('class', 'wrap');
        singleHero.setAttribute('class', 'singleHero');

        imgHero.setAttribute('id', 'imgHero');
        imgHero.style.backgroundImage = "url(" + urlImage + ")";
        singleHero.appendChild(imgHero);

        heroName.setAttribute('id', 'nameHero');
        heroName.innerHTML = nameHero;
        singleHero.appendChild(heroName);
        wrap.appendChild(singleHero);
    }
    slideShow.appendChild(wrap);
    groupWrap.push(wrap);
    contWrap++;
}
