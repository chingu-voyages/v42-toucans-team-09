import { canBeDisplayed, excludedWords } from "./filterTextToShow.js";

function checkSingleQuote(result) {
  //check excluded words
  return canBeDisplayed(result.value, excludedWords);
}

/**
 * When we get the object with many facts from input search
 * we choose the random fact from the random integers
 */
function selectQuotFromObject(data) {
  const results = data;
  let quotes = results.result;
  let filterQuotes = Array("");

  // Check all quote in quotes
  for (let index = 0; index < quotes.length; index++) {
    const quote = quotes[index];
    // Removes quote if it can't be displayed (have dirty words)
    if (canBeDisplayed(quote.value, excludedWords)) {
      filterQuotes.push(quote.value);
    }
  }

  //call function for random integers
  let randomInt = getRandomInt(filterQuotes.length);

  //return quote
  return filterQuotes[randomInt] || null;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export { checkSingleQuote, selectQuotFromObject };
