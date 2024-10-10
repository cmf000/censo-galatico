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

baseURL = 'https://swapi.dev/api/';

document.addEventListener("DOMContentLoaded", async function () {
    let planets = await getPlanets();
    let planetsBar = document.getElementById('planets');
    let planetDetails = document.getElementById('planet-details')
    listPlanets(planets, planetsBar, planetDetails);
});

function listPlanetDetails(planet, planetDetails) {
    planetDetails.innerHTML = '';
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
        planetItem.addEventListener('click', () => listPlanetDetails(planet, planetDetails));
        planetsList.appendChild(planetItem);
    });
    planetsBar.appendChild(planetsList);
}

