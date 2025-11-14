// Helper to inject dark.css contents as a <style> tag
function injectCSS() {
    if (document.getElementById('dm-injector-style')) return; // Already injected
    fetch(chrome.runtime.getURL('dark.css'))
        .then(resp => resp.text())
        .then(css => {
            const style = document.createElement('style');
            style.id = 'dm-injector-style';
            style.textContent = css;
            document.head.appendChild(style);
        });
}

function removeCSS() {
    const style = document.getElementById('dm-injector-style');
    if (style) style.remove();
}

// On load, check storage and inject/remove CSS
chrome.storage.sync.get("darkMode", (data) => {
    if (data.darkMode) injectCSS();
    else removeCSS();
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "enable") injectCSS();
  if (msg.action === "disable") removeCSS();
});
// --------------
// Updated code cuz earlier one doesnt not directly inject / remove css but 
// instead sends messages to another ( back..js or a service worker ) to run api like chrome.scripting.insert or remove css
// Now content js handles everything . Read storage --> recive msg --> add/ remove style element
