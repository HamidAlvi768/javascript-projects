const userInput = document.getElementById('user-input');
const userCard = document.getElementById('user-card');

// Debounce function
function debounce(func, delay) {
    let timeoutId;
    
    return function (...args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// Function to fetch user data
async function fetchUser(username) {
    if (!username) {
        userCard.innerHTML = '';
        return;
    }

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();

        if (data.message === 'Not Found') {
            userCard.innerHTML = '<p>No user found</p>';
            return;
        }

        userCard.innerHTML = `
            <div class="card">
                <img src="${data.avatar_url}" alt="${data.login}" />
                <div class="card-info">
                    <h2>${data.name || data.login}</h2>
                    <p>${data.bio || 'No bio available'}</p>
                    <ul>
                        <li>Followers: ${data.followers}</li>
                        <li>Following: ${data.following}</li>
                        <li>Public Repos: ${data.public_repos}</li>
                    </ul>
                    <a href="${data.html_url}" target="_blank">View Profile</a>
                </div>
            </div>
        `;
    } catch (error) {
        userCard.innerHTML = '<p>Error fetching user data</p>';
    }
}

// Create debounced version of fetchUser
const debouncedFetchUser = debounce(fetchUser, 500);

// Add input event listener
userInput.addEventListener('input', (e) => {
    debouncedFetchUser(e.target.value);
});
