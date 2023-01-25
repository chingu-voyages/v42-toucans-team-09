// import {
//   changeBackground
// } from "../main.js"

/* - Background is changhing when it clickes on the icon
- We use google icons so we need to rewrite text content inside element if we want to replace the icon */
const changeBackground = document.querySelector("#change-background");

changeBackground.addEventListener("click", changeBackgroundByClick);

function changeBackgroundByClick() {
  const html=document.documentElement;
  html.classList.toggle("dark");
  if (html.classList.contains("dark")){
    changeBackground.src="img/dark-bg.png"
    changeBackground.alt="Switch to light background color"
  }
  else {
    changeBackground.src="img/light-bg.png"
    changeBackground.alt="Switch to dark background color"
  }
}

// export { changeBackgroundByClick };
