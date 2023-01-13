const urlRandom = "https://api.chucknorris.io/jokes/random";
const categoriesUrl = "https://api.chucknorris.io/jokes/categories";
const changeBackground = document.querySelector("#change-background");
const randomButton = document.querySelector("#random-btn");
const form = document.querySelector("#form");
const generateButton = document.querySelector(".generate-btn");
const formInput = document.querySelector("#form-input");
const quotes = document.querySelector("#quotes-text");
const categorySelect = document.getElementById("categories");
let allCategories = [];
//It's a value of input text
let value = "";

categorySelect.addEventListener("change", () => {
  refreshAvailableCategories();
  //It cleans input field and value variable
  formInput.value = "";
  value = "";
});

/* - Background is changhing when it clickes on the icon
- We use google icons so we need to rewrite text content inside element if we want to replace the icon */

changeBackground.addEventListener("click", () => {
  changeBackground.classList.toggle("nightlight");
  if (changeBackground.classList.contains("nightlight")) {
    //change icon
    changeBackground.textContent = "sunny";
    //Change background image
    document.body.style.backgroundImage =
      "url('images/night-desert-background.png')";
    // Change background color btn in dark mode
    randomButton.classList.add("dark-btn");
    generateButton.classList.add("dark-btn");
    formInput.classList.add("dark-select-btn");
    categorySelect.classList.add("dark-select-btn");
  } else {
    changeBackground.textContent = "nightlight";
    document.body.style.backgroundImage = "url('images/desert-background.jpg')";
    // Change background color btn to light mode
    randomButton.classList.remove("dark-btn");
    generateButton.classList.remove("dark-btn");
    formInput.classList.remove("dark-select-btn");
    categorySelect.classList.remove("dark-select-btn");
  }
});

/*when the random buttom is clicking api call is creating */
randomButton.addEventListener("click", (e) => {
  e.preventDefault();
  //It cleans input field
  formInput.value = "";
  //As we click random btn It's reset the chosen category
  categorySelect.selectedIndex = 0;
  apiCall(urlRandom);
});

/* Saving the input text to value variable. */

formInput.addEventListener("input", (e) => {
  /* Input Value not text register sensitive and remove space in the beginning and in the end of each frase*/
  value = e.target.value.trim().toLowerCase();
  /*When input field isn't empty, it's reset the chosen category to "Chose category"*/
  if (value !== "") {
    categorySelect.selectedIndex = 0;
  }
});

//Actions with form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  //value  of the category
  const category = categorySelect.options[categorySelect.selectedIndex].value;
  /*if category equals "Choose category" and input field is empty - call Random quiet. If Input field empty and category not previous one we call API by category otherwise by value*/
  if (category === "none" && value === "") {
    apiCall(urlRandom);
  } else if (value === "" && category !== "none") {
    createApiCallByCategory(category);
  } else if (value !== "") {
    createApiCallByInput(value);
  } else {
    apiCall(urlRandom);
  }
});

// ======================= FUNCTIONS ======================== //
function createApiCallByCategory(category) {
  console.log(category);
  let url = `https://api.chucknorris.io/jokes/random?category=${category}`;
  apiCall(url);
}

function createApiCallByInput(value) {
  console.log(value);
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
  const results = result;
  /**When we get the object with many facts from input search we choose the random fact from the
    random integers */
  //call function for random integers
  const randomInt = getRandomInt(results.total);
  //check excluded category
  let checkCategory = checkExcludedCategories(results.result[randomInt]);
  //quote change until return 0 that means no match
  do {
    randomInt;
  } while (checkCategory !== 0);
  //return quote
  return (res = results.result[randomInt].value);
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
