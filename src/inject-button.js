let video = null;
let menu = null;

const injectButtons = async () => {
  const createButton = (name = 'Copy', offset = 0) => {
    const copyButton = document.createElement('button');
    copyButton.innerHTML = name;
    copyButton.className = 'yt-timestamp-button';
    copyButton.onclick = () => {
      navigator.clipboard.writeText(formatTime(video.currentTime - offset));
      copyButton.innerHTML = '✓';
      setTimeout(() => {
        copyButton.innerHTML = name;
      }, 1000)
    };
    menu.insertAdjacentElement('beforeend', copyButton);
  };

  const { offsets } = await getFromStorageAsync({ offsets: [-1, -15] });

  for (const offset of offsets) {
    createButton(offset.toString(), -offset);
  }
};

const searchOnUpdate = () => {
  if (document.querySelector('.yt-timestamp-button')) {
    return;
  }
  const intervalReference = setInterval(() => {
    video = document.querySelector('#movie_player > div.html5-video-container > video');
    menu = document.querySelector('#menu > ytd-menu-renderer');
    if (menu) {
      clearInterval(intervalReference);
      injectButtons();
    }
  }, 500);
};

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'URL') {
    setTimeout(searchOnUpdate, 3000);
  }
});
searchOnUpdate();
