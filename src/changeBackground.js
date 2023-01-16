import {
  randomButton,
  generateButton,
  formInput,
  categorySelect,
  changeBackground,
} from "./main.js";

/* - Background is changhing when it clickes on the icon
- We use google icons so we need to rewrite text content inside element if we want to replace the icon */

function changeBackgroundByClick() {
  changeBackground.classList.toggle("nightlight");
  if (changeBackground.classList.contains("nightlight")) {
    //change icon
    changeBackground.textContent = "sunny";
    //Change background image
    document.body.style.backgroundImage =
      "url('images/night-desert-background.png')";
    // Change background color btn in dark mode
    randomButton.classList.add("dark-btn");
    generateButton.classList.add("dark-btn");
    formInput.classList.add("dark-select-btn");
    categorySelect.classList.add("dark-select-btn");
  } else {
    changeBackground.textContent = "nightlight";
    document.body.style.backgroundImage = "url('images/desert-background.jpg')";
    // Change background color btn to light mode
    randomButton.classList.remove("dark-btn");
    generateButton.classList.remove("dark-btn");
    formInput.classList.remove("dark-select-btn");
    categorySelect.classList.remove("dark-select-btn");
  }
}

export { changeBackgroundByClick };
