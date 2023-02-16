const getFromStorageAsync = (values) => {
  return new Promise((resolve) => chrome.storage.sync.get(values, (items) => resolve(items)));
};

const saveToStorageAsync = (values) => {
  return new Promise((resolve) => chrome.storage.sync.set(values, () => resolve()));
};

const formatTime = (seconds) => new Date(seconds * 1000).toISOString().substring(11, 19);
