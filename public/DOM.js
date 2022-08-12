
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

searchInput.addEventListener('input', () => {
    fetchPost('/suggestions', renderData);
})

// fetchGet('https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=821b552f&app_key=2006c5cfad389d3b8ef9180f62b66a69&title_only=Dentist', (data) => {
//     console.log(data)
// })
