let currentPage = 1;
let currentQuery = '';

document.getElementById('searchButton').addEventListener('click', function() {
    currentQuery = document.getElementById('searchQuery').value;
    currentPage = 1; 
    if (currentQuery) {
        fetchImages(currentQuery, currentPage);
    }
});

document.getElementById('showMoreButton').addEventListener('click', function() {
    currentPage++;
    if (currentQuery) {
        fetchImages(currentQuery, currentPage);
    }
});

async function fetchImages(query, page) {
    const apiKey = 'D5q1YQhVCoT5SE31U9svdM9jzDYZqTeRtrr8e8MEeww'; 
    const url = `https://api.unsplash.com/search/photos?query=${query}&page=${page}&client_id=${apiKey}&per_page=12`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayResults(data.results, page === 1); 
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

function displayResults(images, clearResults) {
    const resultsContainer = document.getElementById('results');
    if (clearResults) {
        resultsContainer.innerHTML = '';
    }

    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.urls.small;
        imgElement.alt = image.description || 'Image result';

        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-result';
        imageContainer.appendChild(imgElement);

        resultsContainer.appendChild(imageContainer);
    });

   
    document.getElementById('showMoreButton').style.display = images.length > 0 ? 'block' : 'none';

    
    document.querySelector('.container').style.backgroundColor = images.length > 0 ? '#fff' : '#1e1e1e';
    document.body.style.backgroundColor = images.length > 0 ? '#fff' : '#121212';
    document.body.style.color = images.length > 0 ? '#000' : '#fff';
}
