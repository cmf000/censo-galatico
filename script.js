async function getResponse(path) {
    let response = await fetch(baseURL + path);
    return response.json();
}

async function getPlanets() {
    path = '/planets';
    let {results} = await getResponse(path);
    planetNames = results.map(planet => planet.name);
    listPlanetsConsole(planetNames);
}

function listPlanetsConsole(planetNames) {
    planetNames.map(name => console.log(name));
}

baseURL = 'https://swapi.dev/api/';

document.addEventListener("DOMContentLoaded", function() {
    getPlanets();
});
