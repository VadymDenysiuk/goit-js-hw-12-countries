
import countiesTpl from '../template/countries.hbs'
import countiesListTpl from '../template/countries-list.hbs'
import _debounce from 'lodash.debounce'
import SearchCountries from '/js/fetchCountries'
import '@pnotify/core/dist/BrightTheme.css'; 
import { error, defaultModules } from '@pnotify/core';


const refs = {
  input: document.querySelector('input'),
  list: document.querySelector('.countries-list'),
}
refs.input.addEventListener('input', _debounce(onInput, 500))

const searchCountries = new SearchCountries()

function onInput(e) {
  const searchQuery = searchCountries.query = e.target.value;
  searchCountries.fetchCountries(searchQuery).then(countries => {
    if (countries.length >= 10) {
      cleanCountriesContainer() 
      error({
        title: 'Error',
        text: 'Enter more letters for a more accurate result.',
        delay: 2000,

      });
      return;
    }
    else if (countries.length >= 2 && countries.length < 10) {
      cleanCountriesContainer()
      appendCountriesListMarkup(countries)
      return;
    }
    else if (countries.length === 1) {
      cleanCountriesContainer();
      appendCountriesMarkup(countries);
      return;
    }
    else {
      cleanCountriesContainer() 
    } 

  })

}

function appendCountriesMarkup(countries) {
  refs.list.insertAdjacentHTML('beforeend', countiesTpl(countries))
}
function appendCountriesListMarkup(countries) {
  refs.list.insertAdjacentHTML('beforeend', countiesListTpl(countries))
}
function cleanCountriesContainer() {
  refs.list.innerHTML = ''
}