document.addEventListener('DOMContentLoaded', () => {
    const countriesList = document.getElementById('countries-list');
    const modal = document.getElementById('modal');
    const countryInfo = document.getElementById('country-info');
    const closeBtn = document.querySelector('.close-btn');
  
    async function fetchCountries() {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countries = await response.json();
  
        const sortedCountries = countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
  
        renderCountries(sortedCountries);
      } catch (error) {
        console.error('Error al obtener los países:', error);
      }
    }
  
    function renderCountries(countries) {
      countriesList.innerHTML = ''; 
      countries.forEach(country => {
        const countryDiv = document.createElement('div');
        countryDiv.classList.add('country');
        countryDiv.innerHTML = `
          <img src="${country.flags.svg}" alt="Bandera de ${country.name.common}">
          <div class="country-name">${country.name.common}</div>
        `;
  
        countryDiv.addEventListener('click', () => showCountryDetails(country));
  
        countriesList.appendChild(countryDiv);
      });
    }
  
    function showCountryDetails(country) {
      modal.classList.remove('hidden');
      countryInfo.innerHTML = `
        <h2>${country.name.common}</h2>
        <img src="${country.flags.svg}" alt="Bandera de ${country.name.common}">
        <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'Desconocida'}</p>
        <p><strong>Población:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Superficie:</strong> ${country.area.toLocaleString()} km²</p>
        <p><strong>Conducen por el lado:</strong> ${country.car.side === 'left' ? 'Izquierdo' : 'Derecho'}</p>
      `;
    }

    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  
    fetchCountries();
  });