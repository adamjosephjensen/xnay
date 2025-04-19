console.log("Xnay loaded");
let allKeywords = [];

// Filters tweets by checking for keywords and blurring those that match
function filterPosts() {
  console.log("Filtering posts with keywords:", allKeywords);  // Debug log
  const posts = document.querySelectorAll('article[data-testid="tweet"]');
  posts.forEach(post => {
    const text = post.innerText.toLowerCase();
    const shouldHide = allKeywords.some(keyword => 
      text.includes(keyword.toLowerCase())
    );
    post.style.filter = shouldHide ? "blur(5px)" : "none";  // Reset or blur
    console.log(`Post text: "${text.substring(0, 50)}..." shouldHide: ${shouldHide}`);  // Debug log for each post
  });
}

// Loads keywords from storage and applies post filtering
function loadKeywordsAndFilter() {
  console.log("Loading keywords from storage...");  // Debug log
  chrome.storage.sync.get(["userKeywords"], ({ userKeywords = [] }) => {
    // Removed undefined blockKeywords to fix error
    allKeywords = [
      ...userKeywords  // Only use userKeywords for now
    ];
    console.log("Keywords loaded:", allKeywords);  // Debug log
    filterPosts();
  });
}

// Initial load
loadKeywordsAndFilter();

// Handle dynamic content
const observer = new MutationObserver(() => {
  console.log("Mutation observed, re-filtering posts...");  // Debug log
  filterPosts();
});
observer.observe(document.body, { childList: true, subtree: true });

// Listen for updates
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Received message:", message);  // Debug log
  if (message.action === "updateFilter") {
    loadKeywordsAndFilter();
  }
});
