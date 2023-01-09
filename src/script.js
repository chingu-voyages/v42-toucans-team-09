const filter = document.getElementById('filter'),
textToSearch = document.getElementById('text-to-search'),
categories = document.getElementById('categories');

filter.addEventListener('change', () => {
    if (filter.selectedIndex === 0) {
        textToSearch.className = '';
        categories.className = 'mask';
    } else {
        textToSearch.className = 'mask';
        categories.className = '';
    }
})