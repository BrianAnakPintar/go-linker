document.addEventListener("DOMContentLoaded", () => {
  const siteDisplay = document.getElementById("current-site");
  const input = document.getElementById("customlink");
  const button = document.getElementById("create-link");

  // Get current tab's URL
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];
    if (currentTab?.url) {
      siteDisplay.textContent = currentTab.url;
    } else {
      siteDisplay.textContent = "Unable to detect current site.";
    }
  });

  document.getElementById("settings-button").addEventListener("click", () => {
    // Example: open a new tab with settings page (settings.html must exist)
    chrome.runtime.openOptionsPage();
  });

  button.addEventListener("click", () => {
    const customName = input.value.trim();

    if (!customName) {
      alert("Please enter a name for your go link.");
      return;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = tabs[0]?.url;

      if (!url) {
        alert("Unable to detect the current site.");
        return;
      }

      // Fetch existing URLs
      chrome.storage.local.get("urls", (data) => {
        const urls = data.urls || {};

        // Add or overwrite the alias
        urls[customName] = url;

        // Save updated object
        chrome.storage.local.set({ urls }, () => {
          input.value = "";
          alert(`Link "go ${customName}" saved for:\n${url}`);
        });
      });
    });
  });
});
