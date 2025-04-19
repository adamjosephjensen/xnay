document.getElementById("save").addEventListener("click", () => {
  const keywords = document.getElementById("customKeywords").value
    .split("\n")
    .filter(k => k.trim());
  
  const settings = {
    userKeywords: keywords,
    hideImages: document.getElementById("hideImages").checked,
    hideVideos: document.getElementById("hideVideos").checked
  };
  
  chrome.storage.sync.set(settings, () => {
    alert("Keywords and settings saved!");
    chrome.runtime.sendMessage({ action: "updateFilter" });
  });
});

// Load existing keywords and settings
chrome.storage.sync.get(["userKeywords", "hideImages", "hideVideos"], (data) => {
  if (data.userKeywords) {
    document.getElementById("customKeywords").value = data.userKeywords.join("\n");
  }
  
  if (data.hideImages !== undefined) {
    document.getElementById("hideImages").checked = data.hideImages;
  }
  
  if (data.hideVideos !== undefined) {
    document.getElementById("hideVideos").checked = data.hideVideos;
  }
});
