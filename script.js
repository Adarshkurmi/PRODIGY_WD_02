let timerDisplay = document.querySelector('.timerDisplay');
let stopBtn = document.getElementById('stopBtn');
let startBtn = document.getElementById('startBtn');
let resetBtn = document.getElementById('resetBtn');
let pauseBtn = document.createElement("button"); // Create Pause button
let lapBtn = document.createElement("button"); // Create Lap button
let lapsList = document.createElement("ul"); // Create Lap list

// Add buttons to the page
pauseBtn.innerText = "Pause";
pauseBtn.className = "btn";
pauseBtn.style.backgroundColor = "orange";
document.querySelector(".buttons").appendChild(pauseBtn);

lapBtn.innerText = "Lap";
lapBtn.className = "btn";
lapBtn.style.backgroundColor = "purple";
document.querySelector(".buttons").appendChild(lapBtn);

document.body.appendChild(lapsList); // Add Lap list to the page

let msec = 0;
let secs = 0;
let mins = 0;
let timerId = null;
let isRunning = false;

startBtn.addEventListener('click', function() {
    if (!isRunning) {
        isRunning = true;
        timerId = setInterval(startTimer, 10);
    }
});

stopBtn.addEventListener('click', function() {
    clearInterval(timerId);
    isRunning = false;
});

pauseBtn.addEventListener('click', function() {
    if (isRunning) {
        clearInterval(timerId);
        isRunning = false;
        pauseBtn.innerText = "Resume";
    } else {
        isRunning = true;
        timerId = setInterval(startTimer, 10);
        pauseBtn.innerText = "Pause";
    }
});

lapBtn.addEventListener('click', function() {
    if (isRunning) {
        let lapTime = timerDisplay.innerHTML;
        let lapItem = document.createElement("li");
        lapItem.innerText = lapTime;
        lapsList.appendChild(lapItem);
    }
});

resetBtn.addEventListener('click', function() {
    clearInterval(timerId);
    timerDisplay.innerHTML = `00 : 00 : 00`;
    msec = secs = mins = 0;
    isRunning = false;
    pauseBtn.innerText = "Pause"; // Reset pause button text
    lapsList.innerHTML = ""; // Clear lap times
});

function startTimer() {
    msec++;
    if (msec === 100) {
        msec = 0;
        secs++;
        if (secs === 60) {
            secs = 0;
            mins++;
        }
    }

    let msecString = msec < 10 ? `0${msec}` : msec;
    let secsString = secs < 10 ? `0${secs}` : secs;
    let minsString = mins < 10 ? `0${mins}` : mins;

    timerDisplay.innerHTML = `${minsString} : ${secsString} : ${msecString}`;
}
