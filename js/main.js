// Settings
var workInterval = document.getElementById('workInterval');
var breakInterval = document.getElementById('breakInterval');
var longBreakInterval = document.getElementById('longBreakInterval');
var longBreakEvery = document.getElementById('longBreakEvery');

// Timer
var cycleCounter; // Keeps track of cycles for long breaks
var timerSeconds; // What's displayed on the timer
var intervalType; // types: work, break, longBreak
var hasPlayed = false;
var isPlaying = false;
var t = false;

// Controls
const btnStop = document.getElementById('btn-stop');
const btnPlay = document.getElementById('btn-play');
const btnSkip = document.getElementById('btn-skip');

reset();

btnPlay.addEventListener('click', function () {
    togglePlay();
});

btnStop.addEventListener('click', function () {
    reset();
    updateTimer();
});

btnSkip.addEventListener('click', function () {
    isPlaying ? togglePlay() : false;
    cycleCounter++;
    setTimer();
});

// Settings
workInterval.addEventListener('input', function () {
    setTimeout(function () {
        if (!hasPlayed) {
            setTimer();
        }
    }, 80);
});

breakInterval.addEventListener('input', function () {
    setTimeout(function () {
        if (!hasPlayed) {
            setTimer();
        }
    }, 80);
});

longBreakInterval.addEventListener('input', function () {
    setTimeout(function () {
        if (!hasPlayed) {
            setTimer();
        }
    }, 80);
});

// Functions
function togglePlay() {
    if (!hasPlayed) {
        hasPlayed = true;
        switch (intervalType) {
            case 'work':
                workInterval.disabled = true;
                break;
            case 'break':
                breakInterval.disabled = true;
                break;
            case 'longBreak':
                longBreakInterval.disabled = true;
                break;
        }
    }

    if (isPlaying) {
        isPlaying = false;
        pauseTimer();

    } else {
        isPlaying = true;
        playTimer();
    }
}

function playTimer() {
    hasPlayed = true;
    t = setInterval(function () {
        timer--;
        updateTimer();
        if (timer == 0) {
            clearInterval(t);
            t = false;
            cycleCounter++;
            setTimer();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(t);
    t = false;
}

function setTimer() {
    hasPlayed = false;
    enableAll();
    if (cycleCounter % (longBreakEvery.value * 2) == 0) {
        timer = longBreakInterval.value * 60;
        intervalType = 'longBreak'
    } else if (cycleCounter % 2 == 0) {
        timer = breakInterval.value * 60;
        intervalType = 'break';
    } else {
        timer = workInterval.value * 60;
        intervalType = 'work';
    }
    updateTimer();
}

function enableAll() {
    longBreakInterval.disabled = false;
    breakInterval.disabled = false;
    workInterval.disabled = false;
}

function updateTimer() {
    var mins = Math.floor(timer / 60);
    var secs = timer % 60;
    secs < 10 ? secs = "0" + secs.toString() : secs = secs;
    document.getElementById("timer").innerHTML = mins + ":" + secs;
}

function reset() {
    pauseTimer();
    enableAll();
    hasPlayed = false;
    isPlaying = false;
    cycleCounter = 1;
    intervalType = 'work';

    workInterval.value = 25;
    breakInterval.value = 5;
    longBreakInterval.value = 15;
    longBreakEvery.value = 3;
    timer = workInterval.value * 60;
}

// Fullscreen
const doc = document.documentElement;
document.getElementById('btn-fs').addEventListener('click', function () {
    if (doc.requestFullscreen) {
        doc.requestFullscreen();
    } else if (doc.mozRequestFullScreen) { /* Firefox */
        doc.mozRequestFullScreen();
    } else if (doc.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        doc.webkitRequestFullscreen();
    } else if (doc.msRequestFullscreen) { /* IE/Edge */
        doc.msRequestFullscreen();
    }
});

// Settings Modal
const btnOpen = document.getElementById('btn-settings');
const btnClose = document.getElementById('btn-close');
const overlay = document.getElementById('overlay');
const modal = document.getElementById('settings');

btnOpen.addEventListener('click', function () {
    overlay.classList.add('is-visible');
    modal.classList.add('is-visible');
});
btnClose.addEventListener('click', function () {
    overlay.classList.remove('is-visible');
    modal.classList.remove('is-visible');
});
overlay.addEventListener('click', function () {
    overlay.classList.remove('is-visible');
    modal.classList.remove('is-visible');
});
