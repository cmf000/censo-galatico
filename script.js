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
    let planetDetailsList = document.createElement('ul');
    const details = [
        `Nome: ${planet.name}`,
        `Clima: ${planet.climate}`,
        `População: ${planet.population}`,
        `Tipo de terreno: ${planet.terrain}`
    ];

    details.forEach (detail => {
        let detailItem = document.createElement('li');
        detailItem.textContent = detail;
        planetDetailsList.appendChild(detailItem);
    });
    planetDetails.appendChild(planetDetailsList);
}

function listPlanets(planets, planetsBar, planetDetails) {
    let planetsList = document.createElement('ul');
    planets.forEach(planet => {
        let planetItem = document.createElement('li');
        planetItem.innerHTML = `<button class="planet-button">${planet.name}</button>`;
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
    let planetsBar = document.getElementById('planets');
    let planetDetails = document.getElementById('planet-details');
    let searchButton = document.getElementById('search-planet');
    let searchInput = document.getElementById('search-text');
    searchInput.value = "";
    listPlanets(planets, planetsBar, planetDetails);
    searchButton.addEventListener('click', () => search(searchInput, planetDetails, planets));

}

baseURL = 'https://swapi.dev/api/';

document.addEventListener("DOMContentLoaded", init);

