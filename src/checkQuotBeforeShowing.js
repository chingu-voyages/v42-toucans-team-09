import { apiCall } from "./api.js";
import { showQuote } from "./main.js";

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
  return results.result[randomInt].value;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//check the result on categories that excluded

function checkExcludedCategories(data) {
  const quoteCategory = data.categories;
  if (
    quoteCategory !== "explicit" &&
    quoteCategory !== "political" &&
    quoteCategory !== "religion"
  ) {
    return 0;
  }
}

export { checkSingleQuote, selectQuotFromObject };
