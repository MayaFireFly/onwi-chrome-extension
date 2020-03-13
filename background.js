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
  
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){     
    chrome.windows.create({
      url:request.link,
      focused: true,
      incognito: true
    }); 
  });
});