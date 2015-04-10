// Reference to our active popup.
var popupId = null;

// Once the popup window displayed a "complete" status twice,
// it means the user has gone through the all acquisition process.
// These variable will monitor this incrementation.
var i = 0,
    limit = 2;

// Enable the creation of the "finalize" popup window.
// Stores the ID of the popup window so we can manipulate/close it later.
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request && request.action === 'finalize' && request.url) {
    // Open pop-up with final view from CASE.
    chrome.windows.create({
      url: request.url,
      type: 'popup',
      width: 640,
      height: 480,
      focused: true
    }, function (win) {
      popupId = win.id;
    });
  }
});

// Reset variables for later use, when popup window is closed.
chrome.windows.onRemoved.addListener(function (winId) {
  if (winId === popupId) {
    popupId = null;
    i = 0;
  }
})

// Monitor the popup window: ensure it closes itself after the acquisition process.
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    chrome.tabs.get(tabId, function (tab) {
      if (tab.windowId === popupId) {
        if (tab.status == 'complete') {
          i++;
          if (i == limit) {
            i = 0;
            setTimeout(function () {
              chrome.windows.remove(popupId);
            }, 2000);
          }
        }
      }
    });
});

/**
 * Activate KIPP on current tab when user clicks extension button in browser.
 */
chrome.browserAction.onClicked.addListener(function (tab) {

  i = 0;

  // Activate KIPP on current tab.
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    tabId = tabs[0].id;
    chrome.tabs.sendMessage(tabId, { sendOnMission: true }, function (response) {
      if (response && response.result) console.log(response.result);
    });
  });

});