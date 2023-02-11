import { fetchCategories } from "./api.js";
import { categorySelect } from "../main.js";

let allCategories = [];
const excludedCategories = ["explicit", "political", "religion"];

/**
 * Add options to the category select element with all available categories,
 * excluding "explicit", "political" and "religion".
 */
function displayCategories() {
  for (let i = 0; i < allCategories.length; i++) {
    let category = allCategories[i];
    if (excludedCategories.includes(category)) {
      continue;
    }
    let option = document.createElement("option");
    option.value = category;
    option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
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

export { refreshAvailableCategories };
