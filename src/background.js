chrome.action.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage();
});

chrome.tabs.onUpdated.addListener(
  (tabId, changeInfo) => {
    if (changeInfo.url && changeInfo.url.includes('youtube.com/watch')) {
      chrome.tabs.sendMessage(tabId, {
        type: 'URL',
        payload: changeInfo.url,
      });
    }
  },
);
