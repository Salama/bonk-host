function hostInjector(str){

	let newStr = str;

	//Remove round limit
	document.getElementById('newbonklobby_roundsinput').removeAttribute("maxlength");
	newStr = newStr.replace(/...\[[0-9]\]\[[0-9]\]\[...\[[0-9]\]\[[0-9]?[0-9]?[0-9]\]\]=Math\[...\[[0-9]\]\[[0-9]?[0-9]?[0-9]\]\]\(Math\[...\[[0-9]\]\[[0-9]?[0-9]?[0-9]\]\]\(1,...\[[0-9]\]\[[0-9]\]\[...\[[0-9]\]\[[0-9]?[0-9]?[0-9]\]\]\),9\);/, '');

	//Disable teams when switching modes it was automatically enabled
	newStr = newStr.replace('G7p[0][2][m7p[4][702]]=S9L.W1E(116);', 'G7p[0][2][m7p[4][702]]=S9L.W1E(116);this.autoForcedTeams=!G7p[0][2][m7p[4][114]];');
	newStr = newStr.replace('G7p[0][2][m7p[4][702]]=S9L.C1E(107);', 'G7p[0][2][m7p[4][702]]=S9L.C1E(107);'+AUTO_NO_TEAMS);

	if(str === newStr) throw "Injection failed!";
	console.log("Bonk Host injector run");
	return newStr;
}

const AUTO_NO_TEAMS = `
if(this.autoForcedTeams) {
	this.autoForcedTeams = false;
	G7p[0][2][m7p[4][114]] = false;
	G7p[5][m7p[4][828]](G7p[0][2][m7p[4][114]]);
	G7p[1][m7p[4][647]]();
}`;

if(!window.bonkCodeInjectors)
window.bonkCodeInjectors = [];
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
