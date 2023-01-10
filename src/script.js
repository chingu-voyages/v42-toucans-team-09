const categorySelect = document.getElementById("categories");
let allCategories = [];

// Get all categories avaible from API
fetchCategories().then((categories) => {
    allCategories = categories
    // filter categories and display it to the screen
    displayCategories();
})


// ======================= FUNCTIONS ======================== //

/**
 * Show an error message in the console
 */
function handleError(error) {
    console.error(error);
}

/**
 * Fetch all available categories
 */
async function fetchCategories() {
    try {
        let res = await fetch("https://api.chucknorris.io/jokes/categories");
        return await res.json();
    } catch (err) {
        handleError(err);
    }
}

/** 
 * Add options to the category select element with all available categories,
 * excluding "explicit", "political" and "religion". 
 */
function displayCategories() {
    console.log(allCategories);
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