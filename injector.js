function hostInjector(str){
	let newStr = str;

	/***CONSTANTS***/
	/***REPLACERS***/

	if(str === newStr) throw "Injection failed!";
	console.log("Bonk Host injector run");
	return newStr;
}

if(!window.bonkCommands) window.bonkCommands = [];

if(!window.bonkCodeInjectors) window.bonkCodeInjectors = [];
window.bonkCodeInjectors.push(bonkCode => {
	try {
		return hostInjector(bonkCode);
	} catch (error) {
		alert(
`Whoops! Bonk Host was unable to load.
This may be due to an update to Bonk.io. If so, please report this error!
This could also be because you have an extension that is incompatible with \
Bonk Host, such as the Bonk Leagues Client. You would have to disable it to use \
Bonk Host.
		`);
		throw error;
	}
});

console.log("Bonk Host injector loaded");
