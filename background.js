let timer;
let startTime;
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({pageTimes: {}});

    // set up a listener for when the user changes tabs
    chrome.tabs.onActivated.addListener((activeInfo) => {
        // console.log('tab changed', activeInfo);
        // get the tab that was just activated
        chrome.tabs.get(activeInfo.tabId, (tab) => {
            clearInterval(timer);
            

            // if the tab host is reddit.com
            if (tab.url.includes('reddit.com')) {
                // get the current time
                startTime = Date.now();
                timer = setInterval(() => {
                     // get the current time
                const endTime = Date.now();
                // get the time spent on the previous tab
                chrome.storage.local.get(['pageTimes'], (result) => {
                    // console.log('result', result);
                    // if there is no result, set the time spent to 0
                    if (!result || !result.pageTimes) {
                        chrome.storage.local.set({pageTimes: {["reddit.com"]: 0}});
                    } else {
                        // if there is a result, get the time spent on the previous tab
                        const timeSpent = result.pageTimes["reddit.com"] || 0;
                        // add the time spent on the previous tab to the current time
                        const newTimeSpent = timeSpent + (endTime - startTime);
                        // save the new time spent on the previous tab
                        

                        console.log('newTimeSpent', newTimeSpent / 1000)
                    }

                    // startTime = null;
                });
                }, 1000);
            }
        });
    });
  });