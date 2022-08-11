
const body = document.body; 
const suggestionsDiv = document.querySelector("#suggestions-section");
const searchButton = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search");

// function expressions need to be defined before called in the fetch call below. 
const renderData = (data) => {
    // first line is instead of innerHTML = '' to empty the div; 
    suggestionsDiv.textContent = "";

    data.forEach(element => {
        const div = document.createElement('div');
        const p = document.createElement('p'); 
        
        p.textContent = `${element}`;
        
        div.appendChild(p);
        suggestionsDiv.appendChild(div);
    })
}

searchButton.addEventListener('click', () => {
    fetch('/suggestions', renderData);
})