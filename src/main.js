import { apiCall, fetchCategories } from "./api/api.js";
import { changeBackgroundByClick } from "./tools/changeBackground.js";
import { refreshAvailableCategories } from "./api/refreshCategories.js";
import {
  clearInputField,
  categoryReset,
  typedTextTracking,
  checkChoosenOptionInTheForm,
} from "./tools/actionsWithForm.js";
import {
  checkSingleQuote,
  selectQuotFromObject,
} from "./tools/checkQuotBeforeShowing.js";

const urlRandom = "https://api.chucknorris.io/jokes/random";
const categoriesUrl = "https://api.chucknorris.io/jokes/categories";
const changeBackground = document.querySelector("#change-background");
const randomButton = document.querySelector("#random-btn");
const form = document.querySelector("#form");
const generateButton = document.querySelector(".generate-btn");
const formInput = document.querySelector("#form-input");
const quotes = document.querySelector("#quotes-text");
const categorySelect = document.getElementById("categories");
const generatedFactsNumber = document.getElementById("generated-facts-number");
const quotesHistory = document.getElementById("quotes-history");

// instance of the ArrayStorage object
const storage = [];

let generatedFactsCounter = 0;

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
  const nothingToShow = `<span style="font-size:30px;">🤔</span>
  <br/><br/>
  It seems like Chuck Norris doesn't have this power yet.
  </br></br>
  <small>Let's try another word:)</small>`;

  if (result.total > 0) {
    const randomSearch = selectQuotFromObject(result);
    if (randomSearch) {
      generatedFactsCounter += 1;
      storage.push(randomSearch);
      showQuote(randomSearch);
    } else {
      showQuote(nothingToShow);
    }
  } else if (result.id) {
    const canBeDisplayed = checkSingleQuote(result);
    // if quote can be displayed show it
    if (canBeDisplayed) {
      generatedFactsCounter += 1;
      storage.push(result.value);
      showQuote(result.value);
    } else {
      apiCall(urlRandom);
    }
  } else {
    showQuote(nothingToShow);
  }
}

/*Add quote to the page */
function showQuote(result) {
  quotes.innerHTML = `<dotlottie-player
  autoplay
  loop
  mode="normal"
  src="../img/animation/1.lottie"
  style="width: 200px"
>
</dotlottie-player>
`;
  setTimeout(function () {
    quotes.innerHTML = result;
    generatedFactsNumber.textContent = generatedFactsCounter;
    quotesHistory.innerHTML = "";
    for (let i = storage.length; i > storage.length - 6; i--) {
      const quote = storage[i];
      const quoteHystoryElement = document.createElement("div");
      // TODO: you can add some style with tailwind here
      quoteHystoryElement.className =
        "flex gap-x-3 sm:gap-x-10 md:gap-x-16 xl:gap-x-36 items-center w-full lg:w-4/5 xl:w-2/3";
      quoteHystoryElement.innerHTML = `
    <div class="text-base sm:text-2xl md:text-3xl lg:text-4xl">☑️</div>
    <p class="grow text-center md:text-xl break-words">${quote}</p>`;
      if (quote !== undefined) {
        quotesHistory.append(quoteHystoryElement);
      }
    }
  }, 2000);
}

/*function shows welcome quote and refresh categories when the page is loading */
(function onLoad() {
  quotes.innerHTML = `<span class="text-slate-400 text-3xl md:text-4xlbreak-normal">👋To get started click generate random, search or category below ⬇️</span>`;

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
