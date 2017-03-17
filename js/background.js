chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({endlessRepeatEnabled: true})
})

chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    if(tab.url.match('youtube\.com\/*')) {
      chrome.tabs.insertCSS(activeInfo.tabId, {
        file: '../css/styles.css'
      });
      chrome.tabs.executeScript(activeInfo.tabId, {
        file: './content.js'
      });
    }
  })
})
