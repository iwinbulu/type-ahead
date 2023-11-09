const citySearch = {
  endpoint:
    "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json",
  cities: [],
  searchInput: document.querySelector(".search"),
  suggestions: document.querySelector(".suggestions"),

  init() {
    this.fetchData();
    this.setupEventListeners();
  }, // This method is a common convention used to initialize or set up an object or a module when it's first created. In this context, it's part of the citySearch object and is responsible for two main tasks:

  // 1. The fetchData() method is called to retrieve city data from the specified endpoint (this.endpoint). It uses the Fetch API to make a network request and fetch the data. The retrieved data is then processed and added to the cities array of the citySearch object.
  fetchData() {
    fetch(this.endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => this.cities.push(...data))
      .catch((error) => console.error("Error fetching data:", error));
  },

  findMatches(wordToMatch) {
    return this.cities.filter((place) => {
      const regex = new RegExp(wordToMatch, "gi");
      return place.city.match(regex) || place.state.match(regex);
    });
  },

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },

  displayMatches() {
    const matchArray = this.findMatches(this.searchInput.value);

    const html = matchArray
      .map((place) => {
        const regex = new RegExp(this.searchInput.value, "gi");
        const cityName = place.city.replace(
          regex,
          `<span class="highlight">${this.searchInput.value}</span>`
        );
        const stateName = place.state.replace(
          regex,
          `<span class="highlight">${this.searchInput.value}</span>`
        );
        return `
      <li>
          <span class="name">${cityName}, ${stateName}</span>
          <span class="population">${this.numberWithCommas(
            place.population
          )}</span>
      </li>
      `;
      })
      .join("");

    this.suggestions.innerHTML = html;
  },

  // 2. The setupEventListeners() method is called to attach event listeners to the search input element (this.searchInput). Two event listeners are set up: one for the change event and another for the keyup event. These listeners are responsible for calling the displayMatches() method whenever the user interacts with the search input.
  setupEventListeners() {
    this.searchInput.addEventListener("change", () => this.displayMatches());
    this.searchInput.addEventListener("keyup", () => this.displayMatches());
  },
};

// Initialize the citySearch object
citySearch.init();
// By calling init() when you create an instance of the citySearch object, you ensure that the necessary setup tasks are executed, making the object ready for use. It's a convenient way to organize and structure the initialization process of an object or module.
