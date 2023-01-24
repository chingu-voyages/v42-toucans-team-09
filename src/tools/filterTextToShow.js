const excludedWords = [
  "Arse",
  "Bloody",
  "Bugger",
  "Cow",
  "Crap",
  "Damn",
  "Ginger",
  "Git",
  "God",
  "Goddam",
  "Jesus",
  "Jesus Christ",
  "Minger",
  "Sod-off",
  "Arsehole",
  "Balls",
  "Bint",
  "Bitch",
  "Bollocks",
  "Bullshit",
  "Feck",
  "Munter",
  "Pissed",
  "Shit",
  "Son of a bitch",
  "Tits",
  "Bastard",
  "Beaver",
  "Beef curtains",
  "Bellend",
  "Bloodclaat",
  "Clunge",
  "Cock",
  "Dick",
  "Dickhead",
  "Fanny",
  "Flaps",
  "Gash",
  "Knob",
  "Minge",
  "Prick",
  "Punani",
  "Pussy",
  "Snatch",
  "Twat",
  "Cunt",
  "Fuck",
  "Motherfucker",
];

const excludedCategories = ["explicit", "political", "religion"];

/**
 * Check the text if it can be displayed or not.
 *
 * @param {String} text Text to display to the screen
 * @param {Array<String>} filters List of filter words
 *
 * @returns {Boolean}  Returns true if the text does not contain in any of the filter words, false otherwise
 */
function canBeDisplayed(text, filters) {
  const textToFilter = text.toLowerCase();
  for (let i = 0; i < filters.length; i++) {
    let filter = filters[i];
    filter = filter.toLowerCase();
    if (textToFilter.includes(filter)) {
      return false;
    }
  }
  return true;
}

export { canBeDisplayed, excludedCategories, excludedWords };
