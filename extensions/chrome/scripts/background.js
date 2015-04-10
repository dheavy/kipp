// Reference to our active tab.
var tabId,
    i = 0,
    limit = 3;

// Enable the creation of the "finalize" popup window.
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request && request.action === 'finalize' && request.url) {
    // Open pop-up with final view from CASE.
    chrome.windows.create({
      url: request.url,
      type: 'popup',
      width: 640,
      height: 480,
      focused: true
    });
  }
});

/*chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (tab.url.indexOf('https://mypleasure.local') != false || tab.url.indexOf('https://still-mountain-6425.herokuapp.com') != false) {
    if (tab.status == 'complete') {
      i++;
      console.log(i)
      if (i == limit) {

        i = 0;
        chrome.tabs.remove(tabId);
      }
    }
  }
});*/

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