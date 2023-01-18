import { categorySelect, formInput, urlRandom } from "./main.js";
import { apiCall } from "./api.js";

//It's a value of input text
let valueInputField = "";

//It clear input field and value variable
function clearInputField() {
  formInput.value = "";
  valueInputField = "";
}

//As we click random btn or input some text It's reset the chosen category
function categoryReset() {
  categorySelect.selectedIndex = 0;
}

function typedTextTracking(e) {
  e.preventDefault();
  /* Input Value not text register sensitive and remove space in the beginning and in the end of each frase*/
  valueInputField = e.target.value.trim().toLowerCase();
  if (valueInputField !== "") {
    categoryReset();
  }
}

function checkChoosenOptionInTheForm(e) {
  e.preventDefault();
  //value  of the category
  const category = categorySelect.options[categorySelect.selectedIndex].value;
  /*if category equals "Choose category" and input field is empty - call Random quiet. If Input field empty and category not previous one we call API by category otherwise by value*/
  if (category === "none" && valueInputField === "") {
    apiCall(urlRandom);
  } else if (valueInputField === "" && category !== "none") {
    createApiCallByCategory(category);
  } else if (valueInputField !== "") {
    createApiCallByInput(valueInputField);
  } else {
    apiCall(urlRandom);
  }
}

function createApiCallByCategory(category) {
  let url = `https://api.chucknorris.io/jokes/random?category=${category}`;
  apiCall(url);
}

function createApiCallByInput(value) {
  let url = `https://api.chucknorris.io/jokes/search?query=${value}`;
  apiCall(url);
}

export {
  clearInputField,
  categoryReset,
  typedTextTracking,
  checkChoosenOptionInTheForm,
  valueInputField,
};
