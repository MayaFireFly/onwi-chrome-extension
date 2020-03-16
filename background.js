chrome.runtime.onInstalled.addListener(function() {

  chrome.storage.sync.set({start: 'start'}, function() {
    console.log('The extension start');
  });
  
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function(){
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'host1'},                 //<==your host here
        }),
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'host2'},                 //<==and other your host here
        }),
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'host3'},                 //<==and here 3th
        })
      ],
      actions: [
        new chrome.declarativeContent.ShowPageAction()
      ]
    }]);
  });    

  chrome.manifest = chrome.app.getDetails();

  var injectIntoTab = function (tab){
    var scripts = chrome.manifest.content_scripts[0].js;
    var i = 0, s = scripts.length;
    for( ; i < s; i++ ){
        chrome.tabs.executeScript(tab.id, {
            file: scripts[i]
        });
    }
  }

  chrome.windows.getAll({
    populate: true
  }, function (windows){
    var i = 0, w = windows.length, currentWindow;
    for( ; i < w; i++ ) {
        currentWindow = windows[i];
        var j = 0, t = currentWindow.tabs.length, currentTab;
        for( ; j < t; j++ ) {
            currentTab = currentWindow.tabs[j];
            if(currentTab.url.match(/https?:\/\/(www\.)?(host1|host2|host3)\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi)){    //<==your host here
                injectIntoTab(currentTab);
            }
        }
    }
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){     
  chrome.windows.create({
    url:request.link,
    focused: true,
    incognito: true
  }); 
});

chrome.runtime.onUpdateAvailable.addListener(function(details){
  chrome.runtime.reload();
});