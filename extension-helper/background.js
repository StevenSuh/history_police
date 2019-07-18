const URL = 'https://us-central1-history-police.cloudfunctions.net';
let history = false;

chrome.history.onVisited.addListener(function (historyItem) {
  if (history) {
    fetch(`${URL}/history`, {
      method: 'POST',
      body: JSON.stringify(historyItem),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
});

chrome.management.onDisabled.addListener(function (extensionInfo) {
  if (extensionInfo.name.indexOf("History Police") > -1) {
    history = true;

    fetch(`${URL}/disabled`, {
      method: 'GET',
    });
  }
});

chrome.management.onEnabled.addListener(function (extensionInfo) {
  if (extensionInfo.name.indexOf("History Police") > -1) {
    history = false;
  }
});

chrome.runtime.setUninstallURL(`${URL}/uninstall`);