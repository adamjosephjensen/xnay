document.getElementById("save").addEventListener("click", () => {
  const keywords = document.getElementById("customKeywords").value
    .split("\n")
    .filter(k => k.trim());
  chrome.storage.sync.set({ userKeywords: keywords }, () => {
    alert("Keywords saved!");
  });
});

// Load existing keywords
chrome.storage.sync.get(["userKeywords"], ({ userKeywords }) => {
  if (userKeywords) {
    document.getElementById("customKeywords").value = userKeywords.join("\n");
  }
});

// notify extension that user has changed the keywords
document.getElementById("save").addEventListener("click", () => {
  const keywords = document.getElementById("customKeywords").value
    .split("\n")
    .filter(k => k.trim());
  chrome.storage.sync.set({ userKeywords: keywords }, () => {
    alert("Keywords saved!");
    chrome.runtime.sendMessage({ action: "updateFilter" });
  });
});
