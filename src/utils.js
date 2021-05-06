const getFromStorageAsync = (values) => {
  if (browser) {
    return browser.storage.sync.get(values);
  }
  return new Promise((resolve) => chrome.storage.sync.get(values, (items) => resolve(items)));
};

const saveToStorageAsync = (values) => {
  if (browser) {
    return browser.storage.sync.set(values);
  }
  return new Promise((resolve) => chrome.storage.sync.set(values, () => resolve()));
};
