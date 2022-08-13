
const suggestionsDiv = document.querySelector("#suggestions-section");
const searchButton = document.querySelector(".search-btn");
const searchInput = document.querySelector("#search");


const jobContainer = document.querySelectorAll('.job');
const jobsList = document.querySelector(".jobs-list");
const jobsViewElements = document.querySelector(".job-view-elements");
const jobsContainer = document.querySelector(".jobs-container");
const resultsContainer = document.querySelector('.results');
const loader2 = document.querySelector('.preloader2');
const notFound = document.querySelector('.error-not-found');

// function expressions need to be defined before called in the fetch call below. 
const renderData = (data) => {
    // first line is instead of innerHTML = '' to empty the div; 
    suggestionsDiv.textContent = "";
    const ul = document.createElement('ul');
    suggestionsDiv.appendChild(ul)
    data.forEach(element => {
        const li = document.createElement('li');
        li.textContent = `${element}`
        ul.appendChild(li)
        li.addEventListener('click', () => {
            console.log('mai')
        })
    })
}
searchInput.addEventListener('input', () => {
    suggestionsDiv.style.display = 'block'
    fetchPost('/suggestions', renderData);
})

searchButton.addEventListener('click', () => { 
    suggestionsDiv.style.display = 'none'

})
/* API SECTION */

const renderJobs = (data) => {
    
    data.results.forEach((element, index) => {
        
        const jobDiv = document.createElement('div');
        jobDiv.classList.add('job');

        // first div
        const detailsContainerDiv = document.createElement('div'); 
        const companyImageContainerDiv = document.createElement('div'); 
        const companyImage = document.createElement('img'); 
        const detailsDiv = document.createElement('div'); 
        const jobTitle = document.createElement('p'); 
        const companyName = document.createElement('p'); 
        const companyLocation = document.createElement('p'); 

        detailsContainerDiv.classList.add('details-container');
        companyImageContainerDiv.classList.add('companyimg-container');
        companyImage.classList.add('company-img');
        detailsDiv.classList.add('details');
        jobTitle.classList.add('job-title');
        companyName.classList.add('company-name');
        companyLocation.classList.add('company-location');

        companyImage.src = `https://dummyimage.com/320x320/ffffff/2076d8&text=${element.company.display_name.charAt(0)}`;
        jobTitle.textContent = element.title;
        companyName.textContent = element.company.display_name;
        companyLocation.textContent = element.location.area[1];
        jobDiv.setAttribute('name', 'jobs');


        companyImageContainerDiv.appendChild(companyImage);
        detailsContainerDiv.appendChild(companyImageContainerDiv);

        detailsDiv.appendChild(jobTitle);
        detailsDiv.appendChild(companyName);
        detailsDiv.appendChild(companyLocation);
        detailsContainerDiv.appendChild(detailsDiv);

        // second div 

        const descriptionContainer = document.createElement('div'); 
        const jobDescription = document.createElement('p'); 
        const jobDatesApply = document.createElement('div'); 
        const jobDate = document.createElement('div'); 
        const jobApply = document.createElement('div'); 

        descriptionContainer.classList.add('description-container');
        jobDescription.classList.add('job-description');
        jobDatesApply.classList.add('job-dates-apply');
        jobDate.classList.add('job-date');
        jobApply.classList.add('btn');
        jobApply.classList.add('job-apply');

        jobDescription.textContent = element.description;
        let dateCreated = new Date(element.created).toString();
        jobDate.textContent = dateCreated.substring(0, dateCreated.indexOf('('));
        jobApply.textContent = 'Apply';
        jobApply.href = element.redirect_url;



        descriptionContainer.appendChild(jobDescription);

        jobDatesApply.appendChild(jobDate);
        jobDatesApply.appendChild(jobApply);
        descriptionContainer.appendChild(jobDatesApply);


        jobDiv.appendChild(detailsContainerDiv);
        jobDiv.appendChild(descriptionContainer);
        jobsList.append(jobDiv);
    
        jobDiv.addEventListener('click', (event) => {
            const allJobsDivs = document.getElementsByName('jobs');
            renderJobDetails(data, index);
            jobsViewElements.style.display = "block";
            jobsViewElements.classList.add('slow-animation'); 
            jobDiv.style.backgroundColor = '#fff'; 

            setTimeout(() => {
                jobsViewElements.classList.remove('slow-animation');
            }, 600);


            allJobsDivs.forEach((element, index2) => {
                if (index2 !== index) {
                    element.style.backgroundColor = '#F4F4F5'; 
                }
            })
            
        })  

        if (index == 0) {
            jobsViewElements.classList.add('animation'); 
            jobsList.classList.add('animation'); 
            renderJobDetails(data, index);
            jobDiv.style.backgroundColor = '#fff'; 
            jobsViewElements.style.display = "block";

            setTimeout(() => {
                jobsViewElements.classList.remove('animation');
                jobsList.classList.remove('animation');
            }, 800);
        }
     

    })
    jobsContainer.style.display = "flex";
    resultsContainer.style.display = 'block';
    notFound.style.display = 'none';
    loader2.style.display = "none";

    if (Object.keys(data.results).length === 0 ) {
        resultsContainer.style.display = 'none';
        notFound.style.display = 'flex';
    }

}

const renderJobDetails = (data, index) => {
    
    const viewCompanyImage = document.querySelector('.view-company-img');
    const viewJobTitle = document.querySelector('.view-job-title')
    const viewCompanyName = document.querySelector('.view-company-name')
    const viewCompanyLocation = document.querySelector('.view-company-location')
    const viewApply = document.querySelector('.view-apply')

    const viewDescription = document.querySelector('.view-job-description')
    const viewSalary = document.querySelector('#salary')
    const fullLocation = document.querySelector('#full-location');
    const contractType = document.querySelector('#contract-type');
    const jobTime = document.querySelector('#job-time');

    viewCompanyImage.src =  `https://dummyimage.com/320x320/ffffff/2076d8&text=${data.results[index].company.display_name.charAt(0)}`;
    viewJobTitle.textContent = data.results[index].title;
    viewCompanyName.textContent = data.results[index].company.display_name;
    viewCompanyLocation.textContent = data.results[index].location.area[1];
    viewApply.href = data.results[index].redirect_url;

    viewDescription.textContent = data.results[index].description;
    viewSalary.textContent = `${Math.floor(data.results[index].salary_min)} £`;
    fullLocation.textContent = data.results[index].location["area"].join(", ");
    if (data.results[index].contract_type) {
        contractType.textContent = data.results[index].contract_type.slice(0,1).toUpperCase() + data.results[index].contract_type.slice(1);
    }
    if (data.results[index].contract_time) {
        jobTime.textContent = data.results[index].contract_time.slice(0,1).toUpperCase() + data.results[index].contract_time.slice(1).replace('_', '-');
    }

}

searchButton.addEventListener('click', () => {
    fetchGet(`https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=821b552f&app_key=2006c5cfad389d3b8ef9180f62b66a69&title_only=${searchInput.value}`, renderJobs)
    jobsList.textContent = '';
    loader2.style.display = "flex";
});
    
