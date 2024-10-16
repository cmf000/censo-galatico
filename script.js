async function getResponse(path) {
    let response = await fetch(baseURL + path);
    return response.json();
}

async function getPlanets() {
    path = '/planets';
    let { results } = await getResponse(path);
    planetNames = results.map(planet => planet.name);
    return results;
}

function listPlanetsConsole(planetNames) {
    planetNames.map(name => console.log(name));
}

function listPlanetDetails(planet, planetDetails) {
    let planetDetailsCard = document.createElement('div');
    let planetDetailsCardHeader = document.createElement('h2');
    let planetDetailsCardBody = document.createElement('ul');
    planetDetailsCard.classList.add('card');
    planetDetailsCard.appendChild(planetDetailsCardHeader);
    planetDetailsCard.appendChild(planetDetailsCardBody);
    
    planetDetailsCardHeader.innerHTML = `${planet.name}`
    const detailsBody = [
        `Clima: ${planet.climate}`,
        `População: ${planet.population}`,
        `Tipo de terreno: ${planet.terrain}`
    ];

    detailsBody.forEach (detail => {
        let detailItem = document.createElement('li');
        detailItem.textContent = detail;
        planetDetailsCard.appendChild(detailItem);
    });
    planetDetails.appendChild(planetDetailsCard);
}

function listPlanets(planets, planetsBar, planetDetails) {
    let planetsList = document.createElement('ul');
    planets.forEach(planet => {
        let planetItem = document.createElement('li');
        planetItem.innerHTML = `<button class="sidebar-button">${planet.name}</button>`;
        planetItem.addEventListener('click', () => {
            planetDetails.innerHTML = '';
            listPlanetDetails(planet, planetDetails);
        })
        planetsList.appendChild(planetItem);
    });
    planetsBar.appendChild(planetsList);
}

function search(searchInput, planetDetails, planets) {
    let text = searchInput.value.trim().toLowerCase();
    if (!text || text.length === 0) {
        planetDetails.innerHTML = "";
    } else {
        let filteredPlanets = planets.filter(planet => planet.name.trim().toLowerCase().includes(text));
        if (filteredPlanets.length > 0) {
            planetDetails.innerHTML = "";
            filteredPlanets.forEach(planet => {
            listPlanetDetails(planet, planetDetails)
            })
        }
    }
}

async function init() {
    let planets = await getPlanets();
    let planetsBar = document.getElementById('planets-bar');
    let planetDetails = document.getElementById('planet-cards-list');
    let searchButton = document.getElementById('search-planet-button');
    let searchInput = document.getElementById('search-planet-text');
    searchInput.value = "";
    listPlanets(planets, planetsBar, planetDetails);
    searchButton.addEventListener('click', () => search(searchInput, planetDetails, planets));

}

baseURL = 'https://swapi.dev/api';

document.addEventListener("DOMContentLoaded", init);

