export default class SearchCountries {
  constructor() {
    this.querySearch = '';
  }
  fetchCountries() {
    return fetch(`https://restcountries.com/v2/name/${this.querySearch}`)
      .then(response => response.json())
      .then((data) => { return data })
  }
  
  get query() {
    return this.querySearch;
  }
  set query(newQuery) {
    this.querySearch = newQuery;
  }
}