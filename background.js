var tabIsActive = {};

chrome.tabs.onRemoved.addListener(function(tabId){
  delete tabIsActive[tabId];
});

function activateTab(tab){
  chrome.tabs.executeScript({
    file: "corndogify-start.js"
  });
  chrome.browserAction.setIcon(
    {
      path: "icon-on.png",
      tabId: tab.id
    }
  );
  tabIsActive[tab.id] = true;
}

function disableTab(tab){
  chrome.tabs.executeScript({
    file: "corndogify-stop.js"
  });
  chrome.browserAction.setIcon(
    {
      path: "icon-off.png",
      tabId: tab.id
    }
  );
  tabIsActive[tab.id] = false;
}

chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.message == "loaded"){
    if (tabIsActive[sender.tab.id] === true){
      activateTab(sender.tab);
    }
    else {
      tabIsActive[sender.tab.id] = false;
    }
  }
});

chrome.browserAction.onClicked.addListener(function(tab) {
  if (tabIsActive[tab.id] === true){
    disableTab(tab);
  }
  else if (tabIsActive[tab.id] === false){
    activateTab(tab);
  }
});
