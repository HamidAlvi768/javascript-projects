const jokeDisplay = document.getElementById('display-joke');
const jokeBtn = document.getElementById('getJoke');

// Function to fetch a new joke
async function getJoke() {
    try {
        const response = await fetch('https://api.chucknorris.io/jokes/random');
        const data = await response.json();
        jokeDisplay.textContent = data.value;
    } catch (error) {
        jokeDisplay.textContent = 'Oops! Failed to fetch joke. Please try again.';
    }
}

// Get initial joke
getJoke();

// Get new joke when button is clicked
jokeBtn.addEventListener('click', getJoke);
