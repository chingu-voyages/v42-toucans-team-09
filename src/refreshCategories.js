import { fetchCategories } from "./api.js";
import { categorySelect } from "./main.js";

let allCategories = [];
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

export { refreshAvailableCategories };
