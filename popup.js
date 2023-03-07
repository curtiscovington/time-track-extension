// popup.js


const msToTime = (duration) => {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = parseInt((duration / 1000) % 60),
        minutes = parseInt((duration / (1000 * 60)) % 60),
        hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

const checkTime = () => {
    // Get the tracked time from storage
chrome.storage.local.get(['pageTimes'], function(result) {
    // Display the tracked time
    if (!result || !result.pageTimes) {
      return;
    }
    var timeSpent = result.pageTimes['reddit.com'];
    document.getElementById('time-spent').innerText = msToTime(timeSpent);
  });
}

checkTime();

// Check the time every second
setInterval(checkTime, 1000);

