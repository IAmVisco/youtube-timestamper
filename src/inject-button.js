let video = null;
let menu = null;

const formatTime = (seconds) => new Date(seconds * 1000).toISOString().substr(11, 8);

const injectButtons = async () => {
  const createButton = (name = 'Copy', offset = 0) => {
    const copyButton = document.createElement('button');
    copyButton.innerHTML = name;
    copyButton.className = 'yt-timestamp-button';
    copyButton.onclick = () => {
      navigator.clipboard.writeText(formatTime(video.currentTime - offset));
    };
    menu.insertAdjacentElement('beforeend', copyButton);
  };

  const res = await getFromStorageAsync({ offsets: [-1, -15] });

  for (const offset of res.offsets) {
    createButton(offset.toString(), offset);
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
chrome.runtime.onMessage.addListener(
  (request) => {
    if (request.message === 'URL') {
      setTimeout(searchOnUpdate, 3000);
    }
  });
searchOnUpdate();
