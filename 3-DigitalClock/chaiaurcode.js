const clock = document.getElementById('clock');

function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
    clock.innerHTML = time;
}

// Update clock immediately and then every second
updateClock();
setInterval(updateClock, 1000);
