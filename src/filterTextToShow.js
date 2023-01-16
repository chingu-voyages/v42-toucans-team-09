/**
 * Check the text if it can be displayed or not.
 *
 * @param {String} text Text to display to the screen
 * @param {Array<String>} filters List of filter words
 *
 * @returns {Boolean}  Returns true if the text does not contain in any of the filter words, false otherwise
 */
function canBeDisplayed(text, filters) {
  filters.map((filter) => {
    if (text.includes(filter)) {
      return false;
    }
  });
  return true;
}

export {canBeDisplayed};
