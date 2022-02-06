window.bonkHost = {};
window.bonkHost.playerManagement = {};
window.bonkHost.freejoin = false;
window.bonkHost.playerCount = 0;
window.bonkHost.playerNames = [];
window.bonkHost.scores = [];
window.bonkHost.startGameFunction = () => {return;};

window.bonkCommands = window.bonkCommands.concat(["/kick", "/mute", "/unmute", "/unmute", "/lock", "/unlock", "/balance", "/fav", "/unfav", "/curate", "/curateyes", "/curateno", "/hhelp", "/balanceall", "/start", "/freejoin"]);

let hostPlayerMenuCSS = document.createElement('style');
hostPlayerMenuCSS.innerHTML = `
/***HOSTMENU_CSS***/
`;
document.getElementsByTagName('head')[0].appendChild(hostPlayerMenuCSS);

let hostPlayerMenu = document.createElement('div');
document.getElementById('pagecontainer').appendChild(hostPlayerMenu);
hostPlayerMenu.outerHTML = `
/***HOSTMENU_HTML***/
`;

let CUSTOM_COMMANDS = `
if(I8H[5][0] == "/hhelp") {
	u6H[29].showStatusMessage("/balance * -100 to 100 -- Balances everyone","#cc3333",false);
	u6H[29].showStatusMessage("/balanceall -100 to 100 -- Balances everyone","#cc3333",false);
	u6H[29].showStatusMessage("/start -- Starts the game","#cc3333",false);
	u6H[29].showStatusMessage("/freejoin on/off -- Lets people join during the game","#cc3333",false);
}
else if(I8H[5][0] == "/start") {
    window.bonkHost.startGame();
}
else if(I8H[5][0] == "/freejoin") {
    if(["true", "on", "yes", "enable"].includes(I8H[5][1])) {
        window.bonkHost.freejoin = true;
	    F5S("* Freejoin on","#cc3333",true);
    }
    else if(["false", "off", "no", "disable"].includes(I8H[5][1])) {
        window.bonkHost.freejoin = false;
	    F5S("* Freejoin off","#cc3333",true);
    }
    else if(I8H[5].length == 1) {
        window.bonkHost.freejoin = !window.bonkHost.freejoin;
	    F5S("* Freejoin " + (window.bonkHost.freejoin ? "on" : "off"),"#cc3333",true);
    }
    document.getElementById('hostPlayerMenuFreejoin').checked = window.bonkHost.freejoin;
}
`;

let BALANCE_ALL_MESSAGE = `
if(I8H[67] == -2) {
	u6H[29].showStatusMessage("* " + "Everyone" + " has had their buff/nerf set to " + I8H[32], "#cc3333", false);
}
else if(I8H[32] == 0)
`;

let BALANCE_SELECTION = `

u6H[36].bal[I8H[17]] = I8H[32];
u6H[11].sendBalance(I8H[17], I8H[32]);
if (u6H[29]) {
	u6H[29].updatePlayers();
}
I8H[67]=-2;
if (u6H[44][I8H[17]].userName.toLowerCase() == I8H[7].toLowerCase()) {
    I8H[67] = I8H[17];
    break;
}
`;

let SUGGESTION_MODE_BUTTON = `
let space = document.createElement("span");
space.classList.add("newbonklobby_mapsuggest_high");
space.appendChild(document.createTextNode(" "));

let smb = document.createElement("span");
smb.classList.add("newbonklobby_mapsuggest_high");
smb.classList.add("newbonklobby_chat_link");
smb.style.color="#ff0000";
v2k[79].setButtonSounds([smb]);

smb.onclick = () => {
	d9G[73].onclick();
	window.bonkSetMode(w3G[2][d9G[73].suggestID].m.mo);
};
`;

let APPEND_SUGGESTION_MODE_BUTTON = `
if(!!v2k[10].modes[w3G[2][d9G[73].suggestID].m.mo]) {
	d9G[8].appendChild(space);
	smb.appendChild(document.createTextNode("[" + v2k[10].modes[w3G[2][d9G[73].suggestID].m.mo].lobbyName + "]"));
	d9G[8].appendChild(smb);
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

let PLAYER_CLICK_MENU = `
if(playerEntry) {
    playerEntry.parentNode.appendChild(m9G[6]);
}
else` + " ";

let KEEP_SCORES = `
if(window.bonkHost.scores.length > 0 && document.getElementById('hostPlayerMenuKeepScores').checked) {
    k7k[1].scores = window.bonkHost.scores;
}
else` + " ";

document.getElementById('hostPlayerMenuFreejoin').addEventListener('change', (e) => {
    window.bonkHost.freejoin = e.target.checked;
});

document.getElementById('hostPlayerMenuTeamlock').addEventListener('change', () => {
    document.getElementById('newbonklobby_teamlockbutton').onclick();
});

window.bonkHost.playerManagement.addPlayer = (playerEntry, info) => {
    while(window.bonkHost.playerManagement.getPlayer(playerEntry)) {
        window.bonkHost.playerManagement.removePlayer(playerEntry);
    }
    let newPlayerEntry = playerEntry.cloneNode(true);
    newPlayerEntry.classList.remove('newbonklobby_playerentry_half');
    newPlayerEntry.getElementsByClassName("newbonklobby_playerentry_ping")[0].remove();
    newPlayerEntry.getElementsByClassName("newbonklobby_playerentry_host")[0].remove();
    newPlayerEntry.onclick = playerEntry.onclick;
    if(info.team == 0) {
        newPlayerEntry.style.filter = "opacity(0.4)";
    }
    hostPlayerMenuBox.appendChild(newPlayerEntry);
    if(!window.bonkHost.playerNames.includes(newPlayerEntry.children[1].textContent)) {
        window.bonkHost.playerNames.push(newPlayerEntry.children[1].textContent);
    }
}
window.bonkHost.playerManagement.removePlayer = (playerEntry) => {
    if((foundPlayerEntry = window.bonkHost.playerManagement.getPlayer(playerEntry)) && foundPlayerEntry) {
        hostPlayerMenuBox.removeChild(foundPlayerEntry);
    }
    if(window.bonkHost.playerNames.includes(foundPlayerEntry.children[1].textContent)) {
        window.bonkHost.playerNames.splice(window.bonkHost.playerNames.indexOf(foundPlayerEntry.children[1].textContent), 1);
    }
}

window.bonkHost.playerManagement.show = () => {
    if(window.bonkHost.menuFunctions.visible) return;
    if(parent.document.getElementById('adboxverticalleftCurse') != null)
        parent.document.getElementById('adboxverticalleftCurse').style.display = "none";
    document.getElementById('hostPlayerMenu').style.display = "unset";
}

window.bonkHost.playerManagement.hide = () => {
    document.getElementById('hostPlayerMenu').style.display = "none";
    if(parent.document.getElementById('adboxverticalleftCurse') != null)
        parent.document.getElementById('adboxverticalleftCurse').style.removeProperty("display");
}

window.bonkHost.playerManagement.collapse = () => {
    if(document.getElementById('hostPlayerMenu').style.visibility != "hidden") {
        document.getElementById('hostPlayerMenuControls').style.display = "none";
        document.getElementById('hostPlayerMenuControls').visibility = "hidden";
        document.getElementById('hostPlayerMenu').style.minWidth = 0;
        document.getElementById('hostPlayerMenu').style.minHeight = 0;
        document.getElementById('hostPlayerMenu').style.width = 0;
        document.getElementById('hostPlayerMenu').style.height = 0;
        document.getElementById('hostPlayerMenu').style.visibility = "hidden";
        document.getElementById('hostPlayerMenuCollapse').textContent = "+";
    }
    else {
        document.getElementById('hostPlayerMenu').style.visibility = "visible";
        document.getElementById('hostPlayerMenu').style.removeProperty("min-width");
        document.getElementById('hostPlayerMenu').style.removeProperty("min-height");
        document.getElementById('hostPlayerMenu').style.removeProperty("width");
        document.getElementById('hostPlayerMenu').style.removeProperty("height");
        document.getElementById('hostPlayerMenu').style.visibility = "visible";
        document.getElementById('hostPlayerMenuCollapse').textContent = "-";
        setTimeout(() => {document.getElementById('hostPlayerMenuControls').style.removeProperty("display");}, 100);
    }
}

window.bonkHost.playerManagement.getPlayer = (playerEntry, exact = false) => {
    if (exact) {
        let child = [...hostPlayerMenuBox.children].indexOf(playerEntry);
        if(child) return hostPlayerMenuBox.children[child];
    }
    for(let child of hostPlayerMenuBox.children) {
        if(child.children[1].textContent == playerEntry.children[1].textContent) {
            return child;
        }
    }
    return false;
}

window.bonkHost.playerManagement.movePlayer = (playerID, playerCount, team) => {
    window.bonkHost.menuFunctions.visible = true;
    if(team > 0)
        window.bonkHost.bonkHandlers.hostHandlePlayerJoined(playerID, playerCount, team);
    else
        window.bonkHost.bonkHandlers.hostHandlePlayerLeft(playerID);
    window.bonkHost.menuFunctions.updatePlayers();
}

window.bonkHost.startGame = () => {
    window.bonkHost.startGameFunction();
}

/*Autocomplete*/

document.getElementById('newbonklobby_chat_input').onkeydown = e => {
	if (e.keyCode === 9) {
		e.preventDefault();
		e.stopPropagation();
		let chatText = e.target.value.split(' ');
		let length = 0;
		for (let i = 0; i < chatText.length; i++) {
			length += chatText[i].length + 1;
			if (length <= e.target.selectionStart || chatText[i] === "")
				continue;
			console.log(i);
			foundAutocompletes = [];
			foundAutocompletesOffsets = [];
			for (let j = 0; j < window.bonkCommands.length; j++) {
				if (window.bonkCommands[j].toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&').match("^" + chatText[i].toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))) {
					foundAutocompletes.push(window.bonkCommands[j]);
					foundAutocompletesOffsets.push(0);
					console.log(i + " " + window.bonkCommands[j]);
				}
			}
			if (foundAutocompletes.length === 0) {
				for (let j = 0; j < window.bonkHost.playerNames.length; j++) {
					for (let k = i; k >= 0; k--) {
						if (window.bonkHost.playerNames[j].toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&').match("^" + chatText.slice(k, i + 1).join(" ").toLowerCase().replace(/"/g, "").replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))) {
							foundAutocompletes.push(window.bonkHost.playerNames[j]);
							foundAutocompletesOffsets.push(k);
							console.log(i + " " + window.bonkHost.playerNames[j]);
						}
					}
				}
			}
			if (foundAutocompletes.length === 1) {
				let oldlen = chatText.slice(foundAutocompletesOffsets[0], i + 1).join(" ").length;
				for (let j = i; j > foundAutocompletesOffsets[0]; j--) {
					chatText.splice(j, 1);
				}
				if (chatText[0][0] === "/" && i > 0 && foundAutocompletes[0].includes(" ")) {
					chatText[foundAutocompletesOffsets[0]] = `"${foundAutocompletes[0]}" `;
				} else {
					chatText[foundAutocompletesOffsets[0]] = foundAutocompletes[0] + (foundAutocompletesOffsets[0] === (chatText.length - 1) && (chatText[0][0] === "/") && (chatText[foundAutocompletesOffsets[0] + 1] !== "") ? " " : "");
				}
				if(chatText[foundAutocompletesOffsets[0] + 1] === "") {
					chatText.splice(foundAutocompletesOffsets[0] + 1, 1);
				}
				e.target.value = chatText.join(' ');
				e.target.selectionStart = length - oldlen + chatText[foundAutocompletesOffsets[0]].length + ((foundAutocompletesOffsets[0] === chatText.length - 1) && (chatText[0][0] !== "/") ? 0 : 1);
				e.target.selectionEnd = length - oldlen + chatText[foundAutocompletesOffsets[0]].length + ((foundAutocompletesOffsets[0] === (chatText.length - 1)) && (chatText[0][0] !== "/") ? 1 : 0);
				return;
			} else if (foundAutocompletes.length > 1) {
				let maxAutocomplete = "";
				let char = "";
				for (let j = 0; j >= 0; j++) {
					maxAutocomplete += char;
					console.log(char);
					char = "";
					for (let k = 0; k < foundAutocompletes.length; k++) {
						if (char === "") char = foundAutocompletes[k][j];
						else if (foundAutocompletes[k][j] !== char) {
							j = -Infinity;
							break;
						}
					}
				}
                if(maxAutocomplete === "") return;
				let oldlen = chatText[i].length;
				let quotes = (chatText[0][0] === "/" && foundAutocompletes.some(r => r.includes(" ")));
				if (quotes) {
					chatText[i] = `"${maxAutocomplete}"`;
				} else {
					chatText[i] = maxAutocomplete;
				}
				e.target.value = chatText.join(' ');
				e.target.selectionStart = length - oldlen + chatText[i].length - quotes * 2;
				e.target.selectionEnd = length - oldlen + chatText[i].length - quotes * 2;
				return;
			}
		}
	}
}
document.getElementById('ingamechatinputtext').onkeydown = document.getElementById('newbonklobby_chat_input').onkeydown;