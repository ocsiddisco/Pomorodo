const minElement = document.querySelector("#minutes");
const secElement = document.querySelector("#seconds");
const settingsElement = document.querySelector("#settings");
const startElement = document.querySelector("#start");
const progressBar = document.querySelector("#ring");

// keep track click
let toggleSettings = false;
let minutes = document.querySelector("#minutes").innerHTML;
let seconds = document.querySelector("#seconds").innerHTML;
let speed = 1000;
let progress = null;
let progressStart = 0;
let progressEnd = parseInt(minutes) * 60 + parseInt(seconds);
let degTravel = 360 / progressEnd;
let secRem = 0;
let minRem = 0;
let isPaused = false;


function resetValues() {
    if (progress) {
        clearInterval(progress);
    }
    minutes = document.querySelector("#minutes").innerHTML;
    seconds = document.querySelector("#seconds").innerHTML;
    toggleSettings = false;
    minElement.contentEditable = false;
    secElement.contentEditable = false;
    progress = null;
    progressStart = 0;
    progressEnd = parseInt(minutes) * 60 + parseInt(seconds);
    degTravel = 360 / progressEnd;
}

// handle the change of color - circle


function progressTrack() {
    progressStart++;
    secRem = Math.floor((progressEnd - progressStart) % 60);
    minRem = Math.floor((progressEnd - progressStart) / 60);

    secElement.innerHTML = secRem.toString().length == 2 ? secRem : `0${secRem}`;
    minElement.innerHTML = minRem.toString().length == 2 ? minRem : `0${minRem}`;

    progressBar.style.background = `conic-gradient(
        #9d0000 ${progressStart * degTravel}deg,
        #17171a ${progressStart * degTravel}deg
        )`;

    if (progressStart == progressEnd) {
        progressBar.style.background = `conic-gradient(
            #00aa51 360deg,
            #00aa51 360deg
        )`;
        clearInterval(progress);
        startElement.innerHTML = "start";
        progress = null;
        progressStart = 0;
    }
}


function startStopProgress() {
    if (!progress) {
        progress = setInterval(progressTrack, speed);      
    } else if ((progress) && (isPaused == true) ) {
        clearInterval(progress);
    } else if ((progress) && (isPaused == false) ) {
        clearInterval(progress);
        progress = setInterval(progressTrack, speed);
    }
}

startElement.onclick = function () {
    if (startElement.innerHTML === "start") {
        if (!(parseInt(minutes) === 0 && parseInt(seconds) === 0 ) || !(( (isNaN(minutes)) || (isNaN(seconds)) )) ) {
            isPaused = false;
            startElement.innerHTML = "stop";
            startStopProgress ();
        } else {
            alert("Enter the Time Value in your timer!")
        }
    } else {
        isPaused = true;
        startElement.innerHTML = "start";
        startStopProgress();
    }
}

settingsElement.onclick = function() {
    if (!toggleSettings) {
        toggleSettings = true;
        minElement.contentEditable = true;
        minElement.style.borderBottom = `1px dashed #ffffff50`;
        secElement.contentEditable = true;
        secElement.style.borderBottom = `1px dashed #ffffff50`;
    }
}

minElement.onblur = function () {
    resetValues();
  };
  
secElement.onblur = function () {
    resetValues();
  };
