async function getResponse(url) {
    let response = await fetch(url);
    return response.json();
}

async function getPlanets() {
    path = '/planets';
    const { results: planets } = await getResponse(baseURL + path);
    return planets;
}

async function getResident(path) {
    const resident = await getResponse(path);
    return resident;
}

async function getResidents(planet) {
    path = planet
}

function listPlanetsConsole(planets) {
    planets.map(planet => console.log(planet.name));
}

function listPlanetDetails(planet, planetDetails, residents) {
    let planetDetailsCard = document.createElement('button');
    let planetDetailsCardHeader = document.createElement('h2');
    let planetDetailsCardList = document.createElement('ul');
    let planetResidentsContainer = document.createElement('div');
    let toggleIconContainer = document.createElement('span');
    planetDetailsCard.classList.add('card');
    planetDetailsCardList.classList.add('card-body');
    planetResidentsContainer.classList.add('card-body');
    planetResidentsContainer.classList.add('residents');
    planetResidentsContainer.classList.add('hidden');
    toggleIconContainer.classList.add('card-body');
    toggleIconContainer.classList.add('toggle-icon');
    planetDetailsCard.appendChild(planetDetailsCardHeader);
    planetDetailsCard.appendChild(planetDetailsCardList);
    planetDetailsCard.appendChild(planetResidentsContainer);
    planetDetailsCard.appendChild(toggleIconContainer);
    toggleIconContainer.innerHTML = '▼';
    appendResidentsTable(planetResidentsContainer, residents)


    toggleIconContainer.addEventListener ('click', () => {
        if (planetResidentsContainer.classList.contains('hidden')) {
            planetResidentsContainer.classList.remove('hidden')
            toggleIconContainer.innerHTML = '▲';
        } else {
            planetResidentsContainer.classList.add('hidden');
            toggleIconContainer.innerHTML = '▼';
        }
    })  

    planetDetailsCardHeader.innerHTML = `${planet.name}`
    const detailsBody = [
        `Clima: ${planet.climate}`,
        `População: ${planet.population}`,
        `Tipo de terreno: ${planet.terrain}`
    ];

    detailsBody.forEach (detail => {
        let detailItem = document.createElement('li');
        detailItem.textContent = detail;
        planetDetailsCardList.appendChild(detailItem);
    });
    planetDetails.appendChild(planetDetailsCard);
}

function appendResidentsTable(planetResidentsContainer, residents) {
    let table = document.createElement('div');
    let header = document.createElement('div');
    let header_row = document.createElement('div');
    let body = document.createElement('div');
    let nameCell = document.createElement('div');
    let birthYearCell = document.createElement('div');
    table.classList.add('residents-table');
    header.classList.add('table-header');
    header_row.classList.add('header-row');
    nameCell.classList.add('table-cell');
    birthYearCell.classList.add('table-cell');
    body.classList.add('table-body');
    planetResidentsContainer.appendChild(table);
    table.appendChild(header);
    header.appendChild(header_row);
    header_row.appendChild(nameCell);
    header_row.appendChild(birthYearCell);
    table.appendChild(body);
    nameCell.innerHTML = 'Nome';
    birthYearCell.innerHTML = 'Data de Nascimento';

    residents.forEach (resident => {
        let row = document.createElement('div');
        let nameCell = document.createElement('div');
        let birthYearCell = document.createElement('div');
        row.classList.add('table-row');
        nameCell.classList.add('table-cell');
        birthYearCell.classList.add('table-cell');
        nameCell.innerHTML = resident.name;
        birthYearCell.innerHTML = resident.birth_year;
        row.appendChild(nameCell);
        row.appendChild(birthYearCell);
        body.appendChild(row);
    })

}

async function listPlanets(planets, planetsBar, planetDetails) {
    let planetsList = document.createElement('ul');

    for (let planet of planets) {
        let planetItem = document.createElement('li');
        let residents = await Promise.all(planet.residents.map(residentURL => getResident(residentURL)));
        planetItem.innerHTML = `<button class="sidebar-button">${planet.name}</button>`;
        
        planetItem.addEventListener('click', () => {
            planetDetails.innerHTML = '';
            listPlanetDetails(planet, planetDetails, residents);
        });
        
        planetsList.appendChild(planetItem);
    }
    
    planetsBar.appendChild(planetsList);
}


async function search(searchInput, planetDetails, planets) {
    let text = searchInput.value.trim().toLowerCase();
    if (!text || text.length === 0) {
        planetDetails.innerHTML = "";
    } else {
        let filteredPlanets = planets.filter(planet => planet.name.trim().toLowerCase().includes(text));
        if (filteredPlanets.length > 0) {
            planetDetails.innerHTML = "";
            filteredPlanets.forEach(async planet => {
            let residents = await Promise.all(planet.residents.map(residentURL => getResident(residentURL)));
            listPlanetDetails(planet, planetDetails, residents);
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

