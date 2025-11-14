let darkEnabled = false;

// Load state from storage
chrome.storage.sync.get("darkMode", (data) => {
  darkEnabled = data.darkMode || false;
  if (darkEnabled) enableDarkMode();
});

function enableDarkMode() {
  chrome.runtime.sendMessage({ action: "injectCSS" });
}

function disableDarkMode() {
  chrome.runtime.sendMessage({ action: "removeCSS" });
}

// Listen for toggle from popup
chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "enable") enableDarkMode();
  if (request.action === "disable") disableDarkMode();
});
