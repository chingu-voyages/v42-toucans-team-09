import { quotes, categoriesUrl, checkData } from "./main.js";

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
 * Show an error message in the console
 */

function handleErrors(error) {
  quotes.innerHTML = `
  Oops! Something went wrong. Please reload the page and try again.`;
  console.error(error.message);
}

export { apiCall, fetchCategories };
