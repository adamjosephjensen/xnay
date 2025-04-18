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
task 3: update manifest.json for storage
why: ensures storage permission is explicit (already likely present, but double-check).
aider prompt: “in manifest.json, ensure ‘storage’ is included in permissions. confirm content_scripts and other settings are unchanged.”
files: manifest.json
deliverable: updated manifest with required permissions.
check: reload extension, confirm no permission errors in chrome console.
task 4: start dev set collection
why: logs posts for your dev set to eval regex and train ml later, addressing your need for data before regex tweaks.
aider prompt: “in content.js, add logging to chrome.storage.local for all posts processed by filterPosts. log post text (first 200 chars), matched keywords (if any), and whether it was hidden. add a ‘download log’ button to popup.html and popup.js to export logs as json.”
files: content.js, popup.html, popup.js
deliverable: a system to log posts and download as json for labeling.
check: browse x.com, click “download log” in popup, verify json file contains post data.
task 5: test and debug
why: ensures media filters and logging work reliably across x.com.
aider prompt: “in content.js, add console logs to debug media filter application (e.g., ‘hiding image in post’). test selectors for img and video in article[data-testid=’tweet’]. ensure mutationobserver handles dynamic content. fix any bugs in popup.js for settings or log download.”
files: content.js, popup.js
deliverable: bug-free media filtering and logging.
check: test all toggles on x.com timeline/search, confirm logs in console and json export.
