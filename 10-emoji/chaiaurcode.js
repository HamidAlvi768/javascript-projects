const emoji = document.querySelector('#emoji');

// Array of emojis
const emojis = [
    '😀', '😂', '😍', '🤩', '😎', '🤓', '🤔', '🤗', '🤭', '🤫',
    '🤥', '😶', '😏', '😒', '🙄', '😬', '🤐', '😌', '😔', '😪',
    '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶'
];

// Function to get random emoji
function getRandomEmoji() {
    return emojis[Math.floor(Math.random() * emojis.length)];
}

// Change emoji on hover
emoji.addEventListener('mouseover', () => {
    emoji.textContent = getRandomEmoji();
    emoji.style.filter = 'grayscale(0)';
});

// Gray scale on mouse out
emoji.addEventListener('mouseout', () => {
    emoji.style.filter = 'grayscale(1)';
});
