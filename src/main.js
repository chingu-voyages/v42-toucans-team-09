import { apiCall, fetchCategories } from "./api.js";
import { changeBackgroundByClick } from "./changeBackground.js";
import { refreshAvailableCategories } from "./refreshCategories.js";
import {
  clearInputField,
  categoryReset,
  typedTextTracking,
  checkChoosenOptionInTheForm,
} from "./actionsWithForm.js";
import {
  checkSingleQuote,
  selectQuotFromObject,
} from "./checkQuotBeforeShowing.js";

const urlRandom = "https://api.chucknorris.io/jokes/random";
const categoriesUrl = "https://api.chucknorris.io/jokes/categories";
const changeBackground = document.querySelector("#change-background");
const randomButton = document.querySelector("#random-btn");
const form = document.querySelector("#form");
const generateButton = document.querySelector(".generate-btn");
const formInput = document.querySelector("#form-input");
const quotes = document.querySelector("#quotes-text");
const categorySelect = document.getElementById("categories");

categorySelect.addEventListener("change", () => {
  clearInputField();
});

changeBackground.addEventListener("click", changeBackgroundByClick);

/* Animate quote text when a quote is generated */
const animateSlider = document.querySelector(".slide-text");
document.querySelectorAll(".animate").forEach((btn) => {
  btn.addEventListener("click", function () {
    animateSlider.classList.remove("slide-text");
    setTimeout(animateQuote, 0.1);
  });
});

function animateQuote() {
  animateSlider.classList.add("slide-text");
}

/*when the random buttom is clicking api call is creating */
randomButton.addEventListener("click", (e) => {
  e.preventDefault();
  clearInputField();
  categoryReset();
  apiCall(urlRandom);
});

formInput.addEventListener("input", typedTextTracking);

form.addEventListener("submit", checkChoosenOptionInTheForm);

function checkData(result) {
  if (result.total > 0) {
    showQuote(selectQuotFromObject(result));
  } else if (result.id) {
    checkSingleQuote(result);
  } else {
    showQuote(`Oops....`);
  }
}

/*Add quote to the page */
function showQuote(result) {
  quotes.textContent = result;
}

/*function generate random quote and refresh categories when the page is loading */
(function onLoad() {
  apiCall(urlRandom);
  refreshAvailableCategories();
})();

export {
  urlRandom,
  quotes,
  categoriesUrl,
  randomButton,
  generateButton,
  formInput,
  categorySelect,
  changeBackground,
};

export { checkData, fetchCategories, showQuote };
