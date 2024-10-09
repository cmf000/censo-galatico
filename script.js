baseURL = 'https://swapi.dev/api/';

async function getResponse(path) {
    let response = await fetch(baseURL + path);
    return response.json();
}

async function getPlanets() {
    path = '/planets';
    let {results} = await getResponse(path);
    planets = results.map(planet => planet.name);
    console.log(planets)
    return planets;
}