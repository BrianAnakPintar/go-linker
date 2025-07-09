chrome.omnibox.onInputEntered.addListener((alias) => {
  chrome.storage.local.get("urls", (data) => {
    const urls = data.urls || {};
    const longUrl = urls[alias];
    if (longUrl) {
	  console.log(longUrl);
      chrome.tabs.update({ url: longUrl });
    } else {
      chrome.tabs.update({ url: "https://www.google.com/search?q=" + encodeURIComponent(alias) });
    }
  });
});
