const cursor = document.querySelector('.cursor');
let timeout;

// Follow cursor on mousemove
document.addEventListener('mousemove', (e) => {
    cursor.style.top = e.pageY + 'px';
    cursor.style.left = e.pageX + 'px';
    cursor.style.display = 'block';

    // Scale effect on mouse movement
    function mouseStopped() {
        cursor.style.transform = 'scale(1)';
    }
    clearTimeout(timeout);
    cursor.style.transform = 'scale(1.5)';
    timeout = setTimeout(mouseStopped, 100);
});

// Cursor effects on mouseout
document.addEventListener('mouseout', () => {
    cursor.style.display = 'none';
});

// Click effect
document.addEventListener('click', () => {
    cursor.style.transform = 'scale(0.7)';
    setTimeout(() => {
        cursor.style.transform = 'scale(1)';
    }, 100);
});
