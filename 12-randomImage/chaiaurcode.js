const content = document.querySelector('.content');
const button = document.querySelector('button');

// Number of images to load
const numImages = 12;

// Function to generate random number for image dimensions
function getRandomSize() {
    return Math.floor(Math.random() * 10) + 300;
}

// Function to generate random number for image ID
function getRandomId() {
    return Math.floor(Math.random() * 1000);
}

// Function to load random images
function loadImages() {
    // Clear existing images
    content.innerHTML = '';
    
    for(let i = 0; i < numImages; i++) {
        const width = getRandomSize();
        const height = getRandomSize();
        const imageId = getRandomId();
        
        const img = document.createElement('img');
        img.src = `https://picsum.photos/id/${imageId}/${width}/${height}`;
        img.alt = `Random Image ${i + 1}`;
        
        content.appendChild(img);
    }
}

// Load initial images
loadImages();

// Load new images when button is clicked
button.addEventListener('click', loadImages);
