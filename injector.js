function hostInjector(str){

	let newStr = str;

	//Remove round limit
	document.getElementById('newbonklobby_roundsinput').removeAttribute("maxlength");
	newStr = newStr.replace(/...\[[0-9]\]\[[0-9]\]\[...\[[0-9]\]\[[0-9]?[0-9]?[0-9]\]\]=Math\[...\[[0-9]\]\[[0-9]?[0-9]?[0-9]\]\]\(Math\[...\[[0-9]\]\[[0-9]?[0-9]?[0-9]\]\]\(1,...\[[0-9]\]\[[0-9]\]\[...\[[0-9]\]\[[0-9]?[0-9]?[0-9]\]\]\),9\);/, '');

	//Disable teams when switching modes it was automatically enabled
	newStr = newStr.replace('G7p[0][2][m7p[4][702]]=S9L.W1E(116);', 'G7p[0][2][m7p[4][702]]=S9L.W1E(116);this.autoForcedTeams=!G7p[0][2][m7p[4][114]];');
	newStr = newStr.replace('G7p[1][m7p[4][663]]();', 'G7p[1][m7p[4][663]]();'+AUTO_NO_TEAMS);

	//Add mode mutton to map suggestion message
	newStr = newStr.replace('P1R[99][Y7p[2][624]]([Y7p[34]]);', 'P1R[99][Y7p[2][624]]([Y7p[34]]);' + SUGGESTION_MODE_BUTTON);
	//Append mode button
	newStr = newStr.replace('Y7p[9][Y7p[2][455]](Y7p[34]);', 'Y7p[9][Y7p[2][455]](Y7p[34]);'+APPEND_SUGGESTION_MODE_BUTTON);
	//Handle new mode argument
	newStr = newStr.replace('G7p[0][2][m7p[4][118]]=P1R[43][m7p[4][984]][m7p[8]];', 'G7p[0][2][m7p[4][118]]= typeof(m7p[0][0]) == "object" ? P1R[43][m7p[4][984]][m7p[8]] : m7p[0][0];');
	
	//Balance all
	newStr = newStr.replace('t7V[6][t7V[3][645]]()', 't7V[6][t7V[3][645]]() || t7V[6] === "*" || t7V[7][0] == "/balanceall"');
	newStr = newStr.replace('t7V[7][0] == S9L.W1E(1868)', 't7V[7][0] == S9L.W1E(1868) || t7V[7][0] == "/balanceall"');
	newStr = newStr.replace('t7V[67]=t7V[97];break;', BALANCE_SELECTION);
	newStr = newStr.replace('parseInt(t7V[7][2]);', 'parseInt(t7V[7][t7V[7][0] == "/balanceall" ? 1 : 2]);')
	newStr = newStr.replace('if(t7V[95] == 0)', BALANCE_ALL_MESSAGE);
	if(str === newStr) throw "Injection failed!";
	console.log("Bonk Host injector run");
	return newStr;
}

const BALANCE_ALL_MESSAGE = `
if(t7V[67] == -2) {
	j0V[69].showStatusMessage(S9L.C1E(1875) + "Everyone" + S9L.C1E(1877) + t7V[95], S9L.C1E(1870), false);
}
else if(t7V[95] == 0)
`;

const BALANCE_SELECTION = `

j0V[23].bal[t7V[97]] = t7V[95];
j0V[94][t7V[3][646]](t7V[97], t7V[95]);
if (j0V[69]) {
	j0V[69][t7V[3][647]]();
}
t7V[67]=-2;
if(j0V[44][t7V[97]][t7V[3][568]][t7V[3][645]]() == t7V[6][t7V[3][645]]()) {
t7V[67]=t7V[95];
break;
}
`;
const AUTO_NO_TEAMS = `
if(typeof(this) == "object" && this.autoForcedTeams && G7p[0][2].mo != S9L.C1E(116)) {
	this.autoForcedTeams = false;
	G7p[0][2][m7p[4][114]] = false;
	G7p[5][m7p[4][790]](G7p[0][2][m7p[4][702]],G7p[0][2][m7p[4][118]]);
	G7p[1][m7p[4][663]]();
	G7p[5][m7p[4][828]](G7p[0][2][m7p[4][114]]);
	G7p[1][m7p[4][647]]();
}`;

const SUGGESTION_MODE_BUTTON = `
let space = document.createElement("span");
space.classList.add("newbonklobby_mapsuggest_high");
space.appendChild(document.createTextNode(" "));

let smb = document.createElement("span");
smb.classList.add("newbonklobby_mapsuggest_high");
smb.classList.add("newbonklobby_chat_link");
smb.style.color="#ff0000";
P1R[99].setButtonSounds([smb]);

smb.onclick = () => {
	Y7p[34].onclick();
	v4W(G7p[7][Y7p[34].suggestID].m.mo);
};
`;

const APPEND_SUGGESTION_MODE_BUTTON = `
if(!!P1R[43].modes[G7p[7][Y7p[34].suggestID].m.mo]) {
	Y7p[9].appendChild(space);
	smb.appendChild(document.createTextNode("[" + P1R[43].modes[G7p[7][Y7p[34].suggestID].m.mo].lobbyName + "]"));
	Y7p[9].appendChild(smb);
}
`;

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
