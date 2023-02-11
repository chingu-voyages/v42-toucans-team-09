import { canBeDisplayed, excludedWords } from "../tools/filterTextToShow.js";

const start = performance.now();

// your code here
const val = canBeDisplayed("JESUS IN THE CHURCH", excludedWords);
val ? console.log("All are good! ✅") : console.log("Exluded word founded ❌");

const end = performance.now();
const time = end - start;
console.log(`Execution time: ${time} milliseconds`);
