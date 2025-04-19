console.log("Xnay loaded");
let allKeywords = [];

// Filters tweets by checking for keywords and blurring those that match
function filterPosts() {
  const posts = document.querySelectorAll('article[data-testid="tweet"]');
  posts.forEach(post => {
    const text = post.innerText.toLowerCase();
    const shouldHide = allKeywords.some(keyword => 
      text.includes(keyword.toLowerCase())
    );
    post.style.filter = shouldHide ? "blur(5px)" : "none"; // Reset or blur
  });
}

// Loads keywords from storage and applies post filtering
function loadKeywordsAndFilter() {
  chrome.storage.sync.get(["userKeywords"], ({ userKeywords = [] }) => {
    allKeywords = [
      ...Object.values(blockKeywords).flat(),
      ...userKeywords
    ];
    filterPosts();
  });
}

// Initial load
loadKeywordsAndFilter();

// Handle dynamic content
const observer = new MutationObserver(filterPosts);
observer.observe(document.body, { childList: true, subtree: true });

// Listen for updates
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "updateFilter") {
    loadKeywordsAndFilter();
  }
});
