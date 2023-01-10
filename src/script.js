const urlRandom = "https://api.chucknorris.io/jokes/random";
const changeBackground = document.querySelector("#change-background");
const randomButton = document.querySelector("#random-btn");
const quotes = document.querySelector("#quotes-text");

changeBackground.addEventListener("click", () => {
  changeBackground.classList.toggle("nightlight");
  if (changeBackground.classList.contains("nightlight")) {
    changeBackground.textContent = "sunny";
    document.body.style.backgroundImage = "url('')";
  } else {
    changeBackground.textContent = "nightlight";
    document.body.style.backgroundImage = "url('images/desert-background.jpg')";
  }
});

randomButton.addEventListener("click", (e) => {
  e.preventDefault();
  apiCall(urlRandom);
});

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

function handleErrors(error) {
  quotBox.innerHTML = `
  Oops! Something went wrong. Please reload the page and try again.`;
  console.error(error.message);
}

(function onLoad() {
  apiCall(urlRandom);
})();
