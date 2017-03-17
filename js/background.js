chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({endlessRepeatEnabled: true})
})

chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, runContent)
})

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if(changeInfo.url) {
    runContent(tab)
  }
})

function runContent (tab) {
  if(tab.url.match('youtube\.com\/*')) {
    chrome.tabs.insertCSS(tab.tabId, {
      file: './css/styles.css'
    });
    chrome.tabs.executeScript(tab.tabId, {
      file: './js/content.js'
    });
  }
}
