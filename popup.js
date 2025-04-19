document.getElementById("save").addEventListener("click", () => {
  const keywords = document.getElementById("customKeywords").value
    .split("\n")
    .filter(k => k.trim());
  
  const settings = {
    userKeywords: keywords,
    hideImages: document.getElementById("hideImages").checked
  };
  
  chrome.storage.sync.set(settings, () => {
    alert("Keywords and settings saved!");
    chrome.runtime.sendMessage({ action: "updateFilter" });
  });
});

// Load existing keywords and settings
chrome.storage.sync.get(["userKeywords", "hideImages"], (data) => {
  if (data.userKeywords) {
    document.getElementById("customKeywords").value = data.userKeywords.join("\n");
  }
  
  if (data.hideImages !== undefined) {
    document.getElementById("hideImages").checked = data.hideImages;
  }
});
