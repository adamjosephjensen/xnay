console.log("Xnay loaded");
let allKeywords = [];
let hideImages = false;
let hideVideos = false;

// Filters tweets by checking for keywords and media settings
function filterPosts() {
  console.log("Filtering posts with keywords:", allKeywords);  // Debug log
  console.log("Media settings: hideImages=", hideImages, "hideVideos=", hideVideos);  // Debug log
  const posts = document.querySelectorAll('article[data-testid="tweet"]');
  
  posts.forEach(post => {
    const text = post.innerText.toLowerCase();
    const shouldHideByKeyword = allKeywords.some(keyword => text.includes(keyword.toLowerCase()));
    
    // Apply keyword filtering
    if (shouldHideByKeyword) {
      post.style.diplay = "none";
    }
    
    // Apply media filtering
    const imagesInPost = post.querySelectorAll('img').length > 0;
    const videosInPost = post.querySelectorAll('video').length > 0;
    
    if (hideImages) {
      post.querySelectorAll('img').forEach(img => img.style.display = 'none');
    } else {
      post.querySelectorAll('img').forEach(img => img.style.display = '');  // Reset
    }
    
    if (hideVideos) {
      post.querySelectorAll('video').forEach(video => video.style.display = 'none');
    } else {
      post.querySelectorAll('video').forEach(video => video.style.display = '');  // Reset
    }
    
    console.log(`Post text: "${text.substring(0, 50)}..." shouldHideByKeyword: ${shouldHideByKeyword}, images: ${imagesInPost}, videos: ${videosInPost}`);  // Debug log
  });
}

// Loads keywords and settings from storage and applies post filtering
function loadKeywordsAndFilter() {
  console.log("Loading keywords and settings from storage...");  // Debug log
  chrome.storage.sync.get(["userKeywords", "hideImages", "hideVideos"], (data) => {
    allKeywords = data.userKeywords || [];
    hideImages = data.hideImages || false;
    hideVideos = data.hideVideos || false;
    
    console.log("Keywords and settings loaded:", { allKeywords, hideImages, hideVideos });  // Debug log
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
