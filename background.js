chrome.webRequest.onBeforeRequest.addListener(
	(req) => {
	if (req.url.includes("/js/alpha2s.js") && !req.url.includes("?"))
		return {
		redirectUrl: chrome.runtime.getURL("runInjectors.js")
		};
	},
	{ urls: ["*://bonk.io/*"] },
	["blocking"]
);