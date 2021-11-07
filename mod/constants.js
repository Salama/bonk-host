let CUSTOM_COMMANDS = `
if(t7V[7][0] == "/hhelp") {
	j0V[69][t7V[3][644]]("/balance * -100 to 100",S9L.C1E(1870),false);
	j0V[69][t7V[3][644]]("/balanceall -100 to 100",S9L.C1E(1870),false);
	j0V[69][t7V[3][644]]("/start",S9L.C1E(1870),false);
}
else if(t7V[7][0] == "/start") {
	document.getElementById("newbonklobby_startbutton").click();
}
`;

let BALANCE_ALL_MESSAGE = `
if(t7V[67] == -2) {
	j0V[69].showStatusMessage(S9L.C1E(1875) + "Everyone" + S9L.C1E(1877) + t7V[95], S9L.C1E(1870), false);
}
else if(t7V[95] == 0)
`;

let BALANCE_SELECTION = `

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
let AUTO_NO_TEAMS = `
if(typeof(this) == "object" && this.autoForcedTeams && G7p[0][2].mo != S9L.C1E(116)) {
	this.autoForcedTeams = false;
	G7p[0][2][m7p[4][114]] = false;
	G7p[5][m7p[4][790]](G7p[0][2][m7p[4][702]],G7p[0][2][m7p[4][118]]);
	G7p[1][m7p[4][663]]();
	G7p[5][m7p[4][828]](G7p[0][2][m7p[4][114]]);
	G7p[1][m7p[4][647]]();
}`;

let SUGGESTION_MODE_BUTTON = `
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

let APPEND_SUGGESTION_MODE_BUTTON = `
if(!!P1R[43].modes[G7p[7][Y7p[34].suggestID].m.mo]) {
	Y7p[9].appendChild(space);
	smb.appendChild(document.createTextNode("[" + P1R[43].modes[G7p[7][Y7p[34].suggestID].m.mo].lobbyName + "]"));
	Y7p[9].appendChild(smb);
}
`;