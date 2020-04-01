chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ color: '#3aa757' }, function() {
    console.log('The color is green.');
  });
});
chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  chrome.declarativeContent.onPageChanged.addRules(
    [
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {
              hostEquals: 'volldigital.atlassian.net',
              pathEquals: '/secure/RapidBoard.jspa'
            }
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ],
    function() {
      console.log('Rules added.');
    }
  );
});
