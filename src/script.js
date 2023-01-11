const urlRandom = "https://api.chucknorris.io/jokes/random";
const categoriesUrl = "https://api.chucknorris.io/jokes/categories";
const changeBackground = document.querySelector("#change-background");
const randomButton = document.querySelector("#random-btn");
const generateButton = document.querySelector("#generate-btn");
const quotes = document.querySelector("#quotes-text");
const categorySelect = document.getElementById("categories");
let allCategories = [];

refreshAvailableCategories();

categorySelect.addEventListener("change", () => {
  refreshAvailableCategories();
});

changeBackground.addEventListener("click", () => {
  changeBackground.classList.toggle("nightlight");
  if (changeBackground.classList.contains("nightlight")) {
    changeBackground.textContent = "sunny";
    document.body.style.backgroundImage =
      "url('images/night-desert-background.png')";
    // Change background color btn in dark mode
    randomButton.classList.add('dark-btn');
    generateButton.classList.add('dark-btn');
    filterSelect.classList.add('dark-select-btn');
    categorySelect.classList.add('dark-select-btn');
  } else {
    changeBackground.textContent = "nightlight";
    document.body.style.backgroundImage = "url('images/desert-background.jpg')";
    // Change background color btn to light mode
    randomButton.classList.remove('dark-btn');
    generateButton.classList.remove('dark-btn');
    filterSelect.classList.remove('dark-select-btn');
    categorySelect.classList.remove('dark-select-btn');
  }
});

randomButton.addEventListener("click", (e) => {
  e.preventDefault();
  apiCall(urlRandom);
});

(function onLoad() {
  apiCall(urlRandom);
})();


// ======================= FUNCTIONS ======================== //

/**
 * Show an error message in the console
 */
function handleErrors(error) {
  quotBox.innerHTML = `
  Oops! Something went wrong. Please reload the page and try again.`;
  console.error(error.message);
}

/**
 * Fetch all available categories
 */
async function fetchCategories() {
  try {
    let res = await fetch(categoriesUrl);
    return await res.json();
  } catch (err) {
    handleErrors(err);
  }
}

/**
 * Add options to the category select element with all available categories,
 * excluding "explicit", "political" and "religion".
 */
function displayCategories() {
  console.log(allCategories);
  for (let i = 0; i < allCategories.length; i++) {
    let category = allCategories[i];
    if (["explicit", "political", "religion"].includes(category)) {
      continue;
    }
    let option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  }
}

/**
 * Refreshes the available categories from Chunck Norris API
 * and displays them to the screen
 */
function refreshAvailableCategories() {
  // Get all categories available from API
  fetchCategories().then((categories) => {
    allCategories = categories;
    // filter categories and display it to the screen
    displayCategories();
  });
}

function showQuote(result, url) {
  console.log(url);
  console.log(result.value);
  quotes.textContent = result.value;
}

function apiCall(url) {
  const getData = async (url) => {
    console.log(url);
    const response = await fetch(url);
    const json = await response.json();
    return json;
  };

  getData(url)
    .then((data) => {
      showQuote(data, url);
    })
    .catch((error) => handleErrors(error));
}

