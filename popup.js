const btn = document.getElementById("toggleBtn");

// Load saved state
chrome.storage.sync.get("darkMode", (data) => {
    let enabled = data.darkMode === true;
    updateButton(enabled);
}); 
// updated to avoid edge cases with data type -- > More precise and safer

  btn.onclick = () => {
    enabled = !enabled;
    chrome.storage.sync.set({ darkMode: enabled });
    updateButton(enabled);

    // Send message to active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: enabled ? "enable" : "disable"
        });
    });
  };
});

function updateButton(enabled) {
  btn.textContent = enabled ? "Disable Dark Mode" : "Enable Dark Mode";
  btn.style.background = enabled ? "#444" : "#222";
  btn.style.color = "#fff";
}
