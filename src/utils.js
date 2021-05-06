const getFromStorageAsync = (values) => {
  return new Promise((resolve) => chrome.storage.sync.get(values, (items) => resolve(items)));
};

const saveToStorageAsync = (values) => {
  return new Promise((resolve) => chrome.storage.sync.set(values, () => resolve()));
};
