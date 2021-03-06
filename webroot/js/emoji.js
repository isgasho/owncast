import { EmojiButton } from 'https://cdn.skypack.dev/@joeattardi/emoji-button'

fetch('/emoji')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Network response was not ok ${response.ok}`);
    }
    return response.json();
  })
  .then(json => {
    setupEmojiPickerWithCustomEmoji(json);
  })
  .catch(error => {
    this.handleNetworkingError(`Emoji Fetch: ${error}`);
  });

function setupEmojiPickerWithCustomEmoji(customEmoji) {
  const picker = new EmojiButton({
    zIndex: 100,
    theme: 'dark',
    custom: customEmoji,
    initialCategory: 'custom',
    showPreview: false,
    position: {
      top: '50%',
      right: '100'
    }
  });
  const trigger = document.querySelector('#emoji-button');

  trigger.addEventListener('click', () => picker.togglePicker(picker));
  picker.on('emoji', emoji => {
    if (emoji.url) {
      const url = location.protocol + "//" + location.host + "/" + emoji.url;
      const name = url.split('\\').pop().split('/').pop();
      document.querySelector('#message-body-form').innerHTML += "<img class=\"emoji\" alt=\"" + name + "\" src=\"" + url + "\"/>";
    } else {
      document.querySelector('#message-body-form').innerHTML += emoji.emoji;
    }
  });
}
