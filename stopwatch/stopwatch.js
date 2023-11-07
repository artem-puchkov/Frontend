const elem = document.getElementById('stopwatch');

let seconds = 0;

function updateTime() {
    seconds+= 1;
    console.log(seconds);
}

let interval;

function startStopwatch() {
    if(!interval) {
        interval = setInterval(updateTime, 1000);
    } else {
        clearInterval(interval);
        interval = null;
    }
}

elem.addEventListener('click', startStopwatch);