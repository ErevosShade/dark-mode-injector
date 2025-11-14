document.addEventListener("DOMContentLoaded", function() {
    const btn = document.getElementById("toggleBtn");

    chrome.storage.sync.get("darkMode", function(data) {
        let enabled = data.darkMode === true;
        updateButton(enabled);

        btn.onclick = function() {
            enabled = !enabled;
            chrome.storage.sync.set({ darkMode: enabled });
            updateButton(enabled);

            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
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
});
