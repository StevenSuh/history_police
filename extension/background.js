const URL = 'https://us-central1-history-police.cloudfunctions.net';

chrome.history.onVisited.addListener(function (historyItem) {
  fetch(`${URL}/history`, {
    method: 'POST',
    body: JSON.stringify(historyItem),
    headers: {
      'Content-Type': 'application/json',
    },
  });
});

chrome.management.onDisabled.addListener(function (extensionInfo) {
  if (extensionInfo.name.indexOf("History Police") > -1) {
    fetch(`${URL}/disabled`, {
      method: 'GET',
    });
  }
});

chrome.runtime.setUninstallURL(`${URL}/uninstall`);