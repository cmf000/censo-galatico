async function getResponse(path) {
    let response = await fetch(baseURL + path);
    return response.json();
}

async function getPlanets() {
    path = '/planets';
    let {results} = await getResponse(path);
    planetNames = results.map(planet => planet.name);
    listPlanetsConsole(planetNames);
    return results;
}

function listPlanetsConsole(planetNames) {
    planetNames.map(name => console.log(name));
}

baseURL = 'https://swapi.dev/api/';

document.addEventListener("DOMContentLoaded", async function() {
    let planets = await getPlanets();
    let planetsList = document.getElementById('planets-list');
    listPlanets(planets, planetsList);
});

function listPlanets(planets, list) {
    planets.forEach(planet => {
        let planetItem = document.createElement('ul');
        planetItem.innerHTML = `<button>${planet.name}</button>`;
        list.appendChild(planetItem);
    });
}

