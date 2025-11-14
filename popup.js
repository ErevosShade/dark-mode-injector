const btn = document.getElementById("toggle");

// Load saved state
chrome.storage.sync.get("darkMode", (data) => {
  let enabled = data.darkMode || false;
  updateButton(enabled);

  btn.onclick = () => {
    enabled = !enabled;
    chrome.storage.sync.set({ darkMode: enabled });

    if (enabled) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "enable" });
      });
    } else {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "disable" });
      });
    }

    updateButton(enabled);
  };
});

function updateButton(enabled) {
  btn.textContent = enabled ? "Disable Dark Mode" : "Enable Dark Mode";
  btn.style.background = enabled ? "#444" : "#222";
  btn.style.color = "#fff";
}
