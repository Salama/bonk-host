window.bonkHost = {};
window.bonkHost.freejoin = false;

let CUSTOM_COMMANDS = `
if(t7V[7][0] == "/hhelp") {
	j0V[69][t7V[3][644]]("/balance * -100 to 100 -- Balances everyone",S9L.C1E(1870),false);
	j0V[69][t7V[3][644]]("/balanceall -100 to 100 -- Balances everyone",S9L.C1E(1870),false);
	j0V[69][t7V[3][644]]("/start -- Starts the game",S9L.C1E(1870),false);
	j0V[69][t7V[3][644]]("/freejoin on/off -- Lets people join during the game",S9L.C1E(1870),false);
}
else if(t7V[7][0] == "/start") {
	document.getElementById("newbonklobby_startbutton").click();
}
else if(t7V[7][0] == "/freejoin") {
    if(["true", "on", "yes", "enable"].includes(t7V[7][1])) {
        window.bonkHost.freejoin = true;
	    d8I("* Freejoin on",S9L.C1E(1870),true);
    }
    else if(["false", "off", "no", "disable"].includes(t7V[7][1])) {
        window.bonkHost.freejoin = false;
	    d8I("* Freejoin off",S9L.C1E(1870),true);
    }
    else if(t7V[7].length == 1) {
        window.bonkHost.freejoin = !window.bonkHost.freejoin;
	    d8I("* Freejoin " + (window.bonkHost.freejoin ? "on" : "off"),S9L.C1E(1870),true);
    }
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
	window.bonkSetMode(G7p[7][Y7p[34].suggestID].m.mo);
};
`;

let APPEND_SUGGESTION_MODE_BUTTON = `
if(!!P1R[43].modes[G7p[7][Y7p[34].suggestID].m.mo]) {
	Y7p[9].appendChild(space);
	smb.appendChild(document.createTextNode("[" + P1R[43].modes[G7p[7][Y7p[34].suggestID].m.mo].lobbyName + "]"));
	Y7p[9].appendChild(smb);
}
`;

let modeStuff = newStr.match(
    new RegExp(
        "(var .{2,4}=\\[arguments\\];.{2,4}\\[\\d{1,2}\\]=.{2,5};).{1,300}\
\\+\\+;\
if.{5,60}=0;\\}\
(.{5,50}=.{5,50})\
\\[.{2,4}\\[\\d{1,4}\\]\\];\
(.{5,200}=true.{5,200}\\(\\);)\
\\}\\}"
    )
);
// 1 is var m7p = [arguments]; m7p[4] = y3uu;
// 2 is G7p[0][2]["mo"] = P1R[43]["lobbyModes"]
// 3 is code that updates the mode
let modeVar =
    modeStuff[2].split("=")[0].match(/.{2,4}\[\d{1,2}\]\[\d{1,2}\]/g)[0] +
    `["mo"]`;
let modesObject =
    modeStuff[2].split("=")[1].match(/.{2,4}\[\d{2,4}\]/g)[0] + `["modes"]`;

window.modeDropdownCreated = false;
window.createModeDropdown = () => {
    if (window.modeDropdownCreated) return;
    window.modeDropdownCreated = true;
    const dropdown = document.createElement("div");
    dropdown.classList = "dropdown-container";
    const mds = dropdown.style;
    mds.color = "#ffffff";
    mds.position = "absolute";
    mds.right = "15px";
    mds.bottom = "55px";
    mds.width = "116px";
    mds.height = "30px";
    mds.display = "flex";
    mds.textAlign = "center";
    mds.flexDirection = "column-reverse";

    document.getElementById("newbonklobby_modebutton").remove();
    title = document.createElement("div");
    title.classList = "dropdown-title dropdown_classic";
    title.innerText = "MODE";
    title.style.fontSize = "18px";
    title.id = "newbonklobby_modebutton";
    title.style.position = "unset";
    dropdown.appendChild(title);

    const options = [];
    let dropdownOpen = false;

    function toggleVisibility(e) {
        dropdownOpen = !dropdownOpen;
        for (const o of options) {
            o.style.visibility = dropdownOpen ? "" : "hidden";
        }
        e.stopImmediatePropagation();
    }

    for (const mode of Object.keys(window.bonkModesObject)) {
        const option = document.createElement("div");
        option.classList = "dropdown-option dropdown_classic";
        option.style.display = "block";
        option.style.visibility = "hidden";
        option.style.fontSize = "15px";
        option.innerText = window.bonkModesObject[mode].lobbyName;
        option.onclick = (e) => {
            window.bonkSetMode(mode);
            toggleVisibility(e);
        };
        options.push(option);
        dropdown.appendChild(option);
    }

    title.addEventListener("click", toggleVisibility);

    document.getElementById("newbonklobby_settingsbox").appendChild(dropdown);
};