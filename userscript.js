// ==UserScript==
// @name         /***NAME***/
// @version      /***VERSION***/
// @author       Salama
// @description  /***DESCRIPTION***/
// @match        https://bonk.io/gameframe-release.html
// @run-at       document-start
// @grant        none
// @supportURL   https://discord.gg/Dj6usq7ww3
// @updateURL    https://github.com/Salama//***SNAME***//releases/latest/download//***SNAME***/.js
// @downloadURL  https://github.com/Salama//***SNAME***//releases/latest/download//***SNAME***/.js
// @namespace    https://greasyfork.org/users/824888
// ==/UserScript==

// for use as a userscript ensure you have Excigma's code injector userscript
// https://greasyfork.org/en/scripts/433861-code-injector-bonk-io

let injector = (str) => {
	let newStr = str;
	/***CONSTANTS***/
	/***REPLACERS***/
	console.log("/***NAME***/ injector run");
	return newStr;
}

if(!window.bonkCodeInjectors) window.bonkCodeInjectors = [];
window.bonkCodeInjectors.push(bonkCode => {
	try {
		return injector(bonkCode);
	} catch (error) {
		alert(
`Whoops! /***NAME***/ was unable to load.
This may be due to an update to Bonk.io. If so, please report this error!
This could also be because you have an extension that is incompatible with \
/***NAME***/, such as the Bonk Leagues Client. You would have to disable it to use \
/***NAME***/.`);
		throw error;
	}
});

console.log("/***NAME***/ injector loaded");