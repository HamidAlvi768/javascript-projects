const container = document.querySelector('.container');
const button = document.querySelector('.btn');

// Function to fetch and display a random cat image
async function getCatImage() {
    try {
        const response = await fetch('https://api.thecatapi.com/v1/images/search');
        const data = await response.json();
        
        const imageUrl = data[0].url;
        const imageDiv = document.createElement('div');
        imageDiv.classList.add('image-container');
        
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Random Cat';
        
        // Add remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');
        removeBtn.addEventListener('click', () => {
            imageDiv.remove();
        });
        
        imageDiv.appendChild(img);
        imageDiv.appendChild(removeBtn);
        container.appendChild(imageDiv);
    } catch (error) {
        console.error('Error fetching cat image:', error);
    }
}

// Get initial cat image
getCatImage();

// Get new cat image when button is clicked
button.addEventListener('click', getCatImage);
