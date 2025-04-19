task 1: add media filter toggles to popup
why: lets users control image/video visibility (hide or only show).
aider prompt: “in popup.html, add checkboxes for ‘hide images,’ ‘hide videos,’ ‘images only,’ ‘videos only’ with labels. update popup.js to save these settings to chrome.storage.sync and load them on popup open. style checkboxes with basic css for clarity.”
files: popup.html, popup.js
deliverable: popup ui with four checkboxes that persist settings.
check: open extension popup, toggle checkboxes, close/reopen to confirm settings stick.
task 2: implement media filtering in content.js
why: applies user-selected media filters to x posts (hides or shows images/videos).
aider prompt: “in content.js, read media filter settings from chrome.storage.sync (hideImages, hideVideos, imagesOnly, videosOnly). update filterPosts to hide img and video elements in article[data-testid=’tweet’] based on settings. if imagesOnly or videosOnly is true, hide posts without the selected media type. ensure existing keyword filtering still works.”
files: content.js
deliverable: media filters that hide or isolate images/videos in posts.
check: on x.com, toggle “hide videos” in popup, confirm videos blur or disappear while images remain.
