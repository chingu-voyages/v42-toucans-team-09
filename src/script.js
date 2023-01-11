const urlRandom = "https://api.chucknorris.io/jokes/random";
const categoriesUrl = "https://api.chucknorris.io/jokes/categories";
const changeBackground = document.querySelector("#change-background");
const randomButton = document.querySelector("#random-btn");
const form = document.querySelector("#form");
const formInput = document.querySelector("#form-input");
const quotes = document.querySelector("#quotes-text");
const categorySelect = document.getElementById("categories");
let allCategories = [];
let value;

categorySelect.addEventListener("change", () => {
  refreshAvailableCategories();
  formInput.value = "";
  value = "";
});

/* - Background is changhing when it clickes on the icon
- We use google icons so we need to rewrite text content inside element if we want to replace the icon */

changeBackground.addEventListener("click", () => {
  changeBackground.classList.toggle("nightlight");
  if (changeBackground.classList.contains("nightlight")) {
    changeBackground.textContent = "sunny";
    document.body.style.backgroundImage =
      "url('images/night-desert-background.png')";
  } else {
    changeBackground.textContent = "nightlight";
    document.body.style.backgroundImage = "url('images/desert-background.jpg')";
  }
});

/*when the random buttom is clicking api call is creating */
randomButton.addEventListener("click", (e) => {
  e.preventDefault();
  formInput.value = "";
  categorySelect.selectedIndex = 0;
  apiCall(urlRandom);
});

/* Saving the input text to value variable. */

formInput.addEventListener("input", (e) => {
  /* Input Value not text register sensitive and remove space in the beginning and in the end of each frase*/
  value = e.target.value.trim().toLowerCase();
  /*When input the category becomes "Any", because we search by category or by input text*/
  if (value !== "") {
    categorySelect.selectedIndex = 0;
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  //value  of the category
  const category = categorySelect.options[categorySelect.selectedIndex].value;
  //if category any that meams
  if (value === "") {
    createApiCallByCategory(category);
  } else {
    createApiCallByInput(value);
  }
});

// ======================= FUNCTIONS ======================== //
function createApiCallByCategory(category) {
  let url = `https://api.chucknorris.io/jokes/random?category=${category}`;
  category === "none" ? apiCall(urlRandom) : apiCall(url);
}

function createApiCallByInput(value) {
  let url = `https://api.chucknorris.io/jokes/search?query=${value}`;
  apiCall(url);
}
/**
 * Show an error message in the console
 */
function handleErrors(error) {
  quotes.innerHTML = `
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
  // console.log(allCategories);
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

/*Add quote to the page */

function showQuote(result) {
  quotes.textContent = result;
}

function checkData(result) {
  if (result.total) {
    showQuote(selectQuotFromObject(result));
  } else {
    checkSingleQuote(result);
  }
}

function checkSingleQuote(result) {
  //check excluded category
  let checkQuote = checkExcludedCategories(result);
  //if 0 that means no match if not call random Api one more time
  if (checkQuote !== 0) {
    apiCall(urlRandom);
  } else {
    showQuote(result.value);
  }
}

function selectQuotFromObject(result) {
  /**When we get the object with many facts from input search we choose the random fact from the
    random integers */

  //call function for random integers
  const randomInt = getRandomInt(result.total);
  //check excluded category
  //quote change until return 0 that means no match
  let checkCategory = checkExcludedCategories(result.result[randomInt]);
  do {
    randomInt;
  } while (checkCategory !== 0);
  //return quote
  return (res = result.result[randomInt].value);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//check the result on categories that excluded

function checkExcludedCategories(data) {
  const quoteCategory = data.categories;
  const categoriesExcluded = ["explicit", "political", "religion"];
  const result = categoriesExcluded.filter(
    (category) => quoteCategory[0] === category
  );
  //return array length if 0 that means no match
  return result.length;
}

function apiCall(url) {
  const getData = async (url) => {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  };

  getData(url)
    .then((data) => {
      checkData(data);
    })
    .catch((error) => handleErrors(error));
}

/*function generate random quote when the page is loading */

(function onLoad() {
  apiCall(urlRandom);
  refreshAvailableCategories();
})();
