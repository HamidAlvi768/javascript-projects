const inputField = document.getElementById('input-field');
const outputField = document.getElementById('output-field');
const buttons = document.querySelectorAll('.btn');

// Update output as user types
inputField.addEventListener('input', () => {
    outputField.textContent = inputField.value;
});

// Add click event listeners to all buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const text = inputField.value;
        
        if (button.classList.contains('uppercase')) {
            outputField.textContent = text.toUpperCase();
        }
        else if (button.classList.contains('lowercase')) {
            outputField.textContent = text.toLowerCase();
        }
        else if (button.classList.contains('capitalize')) {
            outputField.textContent = text.split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ');
        }
        else if (button.classList.contains('bold')) {
            outputField.style.fontWeight = 
                outputField.style.fontWeight === 'bold' ? 'normal' : 'bold';
        }
        else if (button.classList.contains('italic')) {
            outputField.style.fontStyle = 
                outputField.style.fontStyle === 'italic' ? 'normal' : 'italic';
        }
        else if (button.classList.contains('underline')) {
            outputField.style.textDecoration = 
                outputField.style.textDecoration === 'underline' ? 'none' : 'underline';
        }
    });
});
