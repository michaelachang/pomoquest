// Fullscreen
var elem = document.documentElement;
document.getElementById('btn-fs').addEventListener('click', function () {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
});

// Settings Modal
document.getElementById('btn-settings').addEventListener('click', function () {
    document.getElementById('overlay').classList.add('is-visible');
    document.getElementById('settings').classList.add('is-visible');
});

document.getElementById('close-btn').addEventListener('click', function () {
    document.getElementById('overlay').classList.remove('is-visible');
    document.getElementById('settings').classList.remove('is-visible');
});
document.getElementById('overlay').addEventListener('click', function () {
    document.getElementById('overlay').classList.remove('is-visible');
    document.getElementById('settings').classList.remove('is-visible');
});