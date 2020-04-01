/**
 * JIRA
 */

let app = document.getElementById('app');
let tabId;

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  tabId = tabs[0].id;
  chrome.tabs.executeScript(
    tabId,
    {
      file: 'app.js'
    },
    function(returnValues) {
      render(returnValues[0]);
    }
  );
});

function render(groups = []) {
  console.log('groups', groups);
  groups.forEach(group => {
    let headline = document.createElement('h3');
    let text = document.createElement('div');

    headline.innerText = group.Name;
    text.innerHTML = `
      <strong>Storypunkte</strong>: ${group.Storypunkte}<br>
      <strong>Tickets</strong>: ${group.Tickets}<br>
      <strong>Tickets mit Punkten</strong>: ${group.Tickets_mit_Punkten}<br>
      <strong>Tickets ohne Punkte</strong>: ${group.Tickets_ohne_Punkte}<br>
    `;

    app.appendChild(headline);
    app.appendChild(text);
  });
}

/**
 * HAPPY MODUS
 */

let happyButton = document.getElementById('happy');

// color happy button
chrome.storage.sync.get('color', function(data) {
  happyButton.style.backgroundColor = data.color;
  happyButton.setAttribute('value', data.color);
});

happyButton.onclick = function(element) {
  // if null ist passed, we get all configs
  chrome.storage.sync.get(null, function(config) {
    console.log(config);

    // pass global config to site. Then execute script which needs it.
    chrome.tabs.executeScript(
      tabId,
      {
        code: `
          if (!window.jiraliciousConfig) {
            var jiraliciousConfig = ${JSON.stringify(config)};
            jiraliciousConfig.originalColor = document.body.style.backgroundColor;
          }
        `
      },
      function() {
        chrome.tabs.executeScript(tabId, { file: 'happy.js' });
      }
    );
  });
};
