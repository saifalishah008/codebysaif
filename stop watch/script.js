let startTime = 0;
let elapsedTime = 0;
let interval;
let running = false;

const display = document.getElementById("time-display");
const laps = document.getElementById("laps");

// Format time into HH:MM:SS.mmm
function formatTime(ms) {
    let hours = Math.floor(ms / 3600000);
    ms %= 3600000;
    let minutes = Math.floor(ms / 60000);
    ms %= 60000;
    let seconds = Math.floor(ms / 1000);
    let milliseconds = ms % 1000;

    return (
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0") + "." +
        String(milliseconds).padStart(3, "0")
    );
}

// Start
document.getElementById("start").onclick = function () {
    if (!running) {
        running = true;
        startTime = Date.now() - elapsedTime;
        interval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            display.textContent = formatTime(elapsedTime);
        }, 10);
    }
};

// Pause
document.getElementById("pause").onclick = function () {
    running = false;
    clearInterval(interval);
};

// Reset
document.getElementById("reset").onclick = function () {
    running = false;
    clearInterval(interval);
    elapsedTime = 0;
    display.textContent = "00:00:00.000";
    laps.innerHTML = "";
};

// Lap
document.getElementById("lap").onclick = function () {
    if (running) {
        const li = document.createElement("li");
        li.textContent = formatTime(elapsedTime);
        laps.appendChild(li);
    }
};