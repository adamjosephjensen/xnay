console.log("Xnay loaded");
let allKeywords = [];
let hideImages = false;

// Filters tweets by checking for keywords and media settings
function filterPosts() {
  console.log("Filtering posts with keywords:", allKeywords);  // Debug log
  console.log("Media settings: hideImages=", hideImages);  // Debug log
  const posts = document.querySelectorAll('article[data-testid="tweet"]');
  
  posts.forEach(post => {
    const text = post.innerText.toLowerCase();
    const shouldHideByKeyword = allKeywords.some(keyword => text.includes(keyword.toLowerCase()));
    
    // Apply keyword filtering
    if (shouldHideByKeyword) {
      post.style.display = "none";  // Fixed typo from diplay to display
    }
    
    // Apply image filtering: Check for images in the post body
    const bodyImages = post.querySelectorAll('div[data-testid="tweetPhoto"] img').length > 0;
    
    if (hideImages && bodyImages) {
      post.innerHTML = '<p>post hidden</p>';  // Replace the entire post with a simple paragraph
    }
    
    console.log(`Post text: "${text.substring(0, 50)}..." shouldHideByKeyword: ${shouldHideByKeyword}, bodyImages: ${bodyImages}`);  // Debug log
  });
}

// Loads keywords and settings from storage and applies post filtering
function loadKeywordsAndFilter() {
  console.log("Loading keywords and settings from storage...");  // Debug log
  chrome.storage.sync.get(["userKeywords", "hideImages"], (data) => {
    allKeywords = data.userKeywords || [];
    hideImages = data.hideImages || false;
    
    console.log("Keywords and settings loaded:", { allKeywords, hideImages });  // Debug log
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
