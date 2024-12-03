chrome.runtime.onInstalled.addListener(() => {
  console.log("VEXO Escalator 1.0 initialized");
});

// Handle extension icon click
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: initializeVEXO,
  });
});

// Handle external messages
chrome.runtime.onMessageExternal.addListener(
  (request, sender, sendResponse) => {
    if (request.type === "VEXO_INIT") {
      // Handle initialization
      sendResponse({ status: "initialized" });
    }
  }
);

// Handle permission requests
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "REQUEST_PERMISSIONS") {
    chrome.permissions.request(
      {
        permissions: ["mediaDevices"],
      },
      (granted) => {
        sendResponse({ granted });
      }
    );
    return true;
  }
});
