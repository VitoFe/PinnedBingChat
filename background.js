let currentTabId;
let tabId;
let previousTab;

function onError(error) {
  console.error(`Error occurred: ${error.message}`);
}

function setButtonIcon(imageURL) {
  try {
    browser.browserAction.setIcon({ path: imageURL });
  } catch (e) {
    onError(e);
  }
}

async function createPinnedTab() {
  try {
    let tab = await browser.tabs.create({
      url: "https://bing.com/chat",
      pinned: true,
      active: true,
    });
    tabId = tab.id;
  } catch (error) {
    console.error(error);
  }
}

// Handle the search for existing tabs with the specified URL
async function handleSearch(customTabs) {
  if (customTabs.length > 0) {
    tabId = customTabs[0].id;
    let { faviconOption } = await browser.storage.local.get("faviconOption");
    if (faviconOption === "website") {
      setButtonIcon(customTabs[0].favIconUrl);
    } else {
      setButtonIcon("icons/icon-128.png");
    }
  } else {
    await createPinnedTab();
  }

  if (tabId === currentTabId) {
    browser.tabs.update(previousTab, { active: true });
  } else {
    previousTab = currentTabId;
    browser.tabs.update(tabId, { active: true });
  }
}

async function handleClick(tab) {
  currentTabId = tab.id;
  try {
    // Search for existing tabs with the specified URL
    const customTabs = await browser.tabs.query({
      pinned: true,
      url: `*://www.bing.com/*`,
    });
    await handleSearch(customTabs);
  } catch (error) {
    onError(error);
  }
}

// Handle options page
function update(details) {
  if (details.reason === "install" || details.reason === "update") {
    browser.runtime.openOptionsPage();
  }
}

browser.browserAction.onClicked.addListener(async (tab) => {
  await handleClick(tab);
});
browser.runtime.onInstalled.addListener(update);

(() => {
  "use strict";
  const e = navigator.userAgent.toLowerCase().includes("firefox"),
    r = (e, r) =>
      navigator.userAgent.includes("Firefox")
        ? r
          ? `Mozilla/5.0 (Linux; Android 8.1.0; Pixel Build/OPM4.171019.021.D1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.109 Mobile Safari/537.36 ${e}`
          : `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 ${e}`
        : `${navigator.userAgent} ${e}`;
  e &&
    chrome.webRequest.onBeforeSendHeaders.addListener(
      (e) => {
        const { requestHeaders: a } = e;
        if ((console.log(a), a))
          return {
            requestHeaders: a.map((e) => {
              var a;
              return (
                "user-agent" === e.name.toLowerCase() &&
                  ((
                    null === (a = e.value) || void 0 === a
                      ? void 0
                      : a.toLowerCase().includes("mobile")
                  )
                    ? (e.value = r("EdgA/42.0.0.2057", !0))
                    : (e.value = r("Edg/112.0.1722.48", !1))),
                e
              );
            }),
          };
      },
      { urls: ["*://*.bing.com/*"] },
      ["blocking", "requestHeaders"]
    );
})();
