const typedTextSpan = document.querySelector('.typed-text');
const cursor = document.querySelector('.cursor');

const words = ['Awesome', 'Fun', 'Cool', 'Life', 'Famous', 'Weird'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typedTextSpan.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextSpan.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    // Blinking cursor effect
    cursor.classList.toggle('blinking');

    // Speed control
    let typeSpeed = isDeleting ? 100 : 200;

    // If word is complete
    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 1000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; // Pause before starting new word
    }

    setTimeout(type, typeSpeed);
}

// Start the typing effect
window.addEventListener('load', () => {
    type();
});
