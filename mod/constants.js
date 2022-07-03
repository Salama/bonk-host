window.bonkHost = {};
window.bonkHost.playerManagement = {};
window.bonkHost.freejoin = false;
window.bonkHost.playerCount = 0;
window.bonkHost.playerNames = [];
window.bonkHost.scores = [];
window.bonkHost.bans = [];
window.bonkHost.startGameFunction = () => {return;};
window.bonkHost.inGame = false;

window.bonkCommands = window.bonkCommands.concat(["/kick", "/mute", "/unmute", "/lock", "/unlock", "/balance", "/fav", "/unfav", "/curate", "/curateyes", "/curateno", "/hhelp", "/balanceall", "/start", "/freejoin", "/host"]);

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
let salamaHostCmdArgs = I8H[5];
if(salamaHostCmdArgs[0] == "/hhelp") {
	window.bonkHost.menuFunctions.showStatusMessage("/balance * -100 to 100 -- Balances everyone","#cc3333",false);
	window.bonkHost.menuFunctions.showStatusMessage("/balanceall -100 to 100 -- Balances everyone","#cc3333",false);
	window.bonkHost.menuFunctions.showStatusMessage("/start -- Starts the game","#cc3333",false);
	window.bonkHost.menuFunctions.showStatusMessage("/freejoin on/off -- Lets people join during the game","#cc3333",false);
	window.bonkHost.menuFunctions.showStatusMessage('/host "user name" -- Givest host to the player',"#cc3333",false);
}
else if(salamaHostCmdArgs[0] == "/start" && !u6H[64]) {
    window.bonkHost.startGame();
}
else if(salamaHostCmdArgs[0] == "/freejoin" && !u6H[64]) {
    if(["true", "on", "yes", "enable"].includes(salamaHostCmdArgs[1])) {
        window.bonkHost.freejoin = true;
	    F5S("* Freejoin on","#cc3333",true);
    }
    else if(["false", "off", "no", "disable"].includes(salamaHostCmdArgs[1])) {
        window.bonkHost.freejoin = false;
	    F5S("* Freejoin off","#cc3333",true);
    }
    else if(salamaHostCmdArgs.length == 1) {
        window.bonkHost.freejoin = !window.bonkHost.freejoin;
	    F5S("* Freejoin " + (window.bonkHost.freejoin ? "on" : "off"),"#cc3333",true);
    }
    document.getElementById('hostPlayerMenuFreejoin').checked = window.bonkHost.freejoin;
}
else if(salamaHostCmdArgs[0] == "/host" && !u6H[64]) {
    if (window.bonkHost.menuUsage.getLSID() != window.bonkHost.menuUsage.hostID) {
        window.bonkHost.menuFunctions.showStatusMessage("* Must be room host to use this command", "#cc3333", false);
        return;
    }
    let id = window.bonkHost.players.findIndex(e => {return e && e.userName.toLowerCase() === salamaHostCmdArgs[1].toLowerCase()});
    if(id !== -1) {
        window.bonkHost.menuUsage.sendHostChange(id);
    }
    else {
	    F5S("* Giving host failed, username " + salamaHostCmdArgs[1] + " not found in this room","#cc3333",true);
    }
}
`;

let BALANCE_ALL_MESSAGE = `
if(I8H[67] == -2) {
	window.bonkHost.menuFunctions.showStatusMessage("* " + "Everyone" + " has had their buff/nerf set to " + I8H[32], "#cc3333", false);
}
else if(I8H[32] == 0)
`;

let BALANCE_SELECTION = `

u6H[36].bal[I8H[17]] = I8H[32];
window.bonkHost.menuUsage.sendBalance(I8H[17], I8H[32]);
if (window.bonkHost.menuFunctions) {
	window.bonkHost.menuFunctions.updatePlayers();
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
    let title = document.createElement("div");
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

let SET_STATE = `
document.getElementById("hostPlayerMenuKeepPositions").parentNode.parentNode.style.filter = (u6H[36].map.s.re ? "" : "brightness(0.5)");
document.getElementById("hostPlayerMenuKeepPositions").style.pointerEvents = (u6H[36].map.s.re ? "" : "none");
document.getElementById("hostPlayerMenuKeepPositions").parentNode.parentNode.title = (u6H[36].map.s.re ? "" : "Enable respawns to use");
if(I8yy.bonkHost.state && window.bonkHost.keepState && u6H[36].map.s.re) {
    for(let i = 0; i < I8yy.bonkHost.state.discs.length; i++) {
        if(I8yy.bonkHost.state.discs[i] != undefined) {
            W6H[2].discs[i] = I8yy.bonkHost.state.discs[i];
            if(u6H[36].mo=='sp') {
                W6H[2].discs[i].a1a -= 2*30*3;
            }
        }
    }
    for(let i = 0; i < I8yy.bonkHost.state.discDeaths.length; i++) {
        if(I8yy.bonkHost.state.discDeaths[i] != undefined) {
            W6H[2].discDeaths[i] = I8yy.bonkHost.state.discDeaths[i];
        }
    }
    W6H[2].physics=I8yy.bonkHost.state.physics;
    W6H[2].seed=I8yy.bonkHost.state.seed;
    W6H[2].rc=I8yy.bonkHost.state.rc;
    W6H[2].ftu=60;
    W6H[2].shk=I8yy.bonkHost.state.shk;
    W6H[2].projectiles=I8yy.bonkHost.state.projectiles;
    W6H[2].capZones=I8yy.bonkHost.state.capZones;
    window.bonkHost.keepState=false;
}W6H[2][
`;

let FREEJOIN = `
if(window.bonkHost.freejoin||u6H[64]) {
    let team = u6H[44].filter(e => {return e != null && u6H[44].indexOf(e) !== s6H[0][0] && e.team != 0}).map(e => {return e.team}).reduce((a, b) => {return a == b ? a : false});
    team = team ? team : 0;
    u6H[44][s6H[0][0]].team = team;
    s6H[0][4] = team;
`;

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
    newPlayerEntry.onmouseenter = playerEntry.onmouseenter;
    if(
        info.team === 0 ||
        (document.getElementById("newbonklobby_teams_middletext").textContent === "TEAMS ON" && info.team === 1) ||
        (document.getElementById("newbonklobby_teams_middletext").textContent === "TEAMS OFF" && info.team > 1) ||
        (
            !window.bonkHost.freejoin &&
            !window.bonkHost.menuFunctions.visible &&
            I8yy.bonkHost.state.discs[window.bonkHost.players.findIndex(i => {return i && i.userName === newPlayerEntry.children[1].textContent})] == undefined &&
            I8yy.bonkHost.state.discDeaths.findIndex(i => {return i.i === window.bonkHost.players.findIndex(i => {return i && i.userName === newPlayerEntry.children[1].textContent})})
        )
    ) {
        newPlayerEntry.style.filter = "opacity(0.4)";
    }
    hostPlayerMenuBox.appendChild(newPlayerEntry);
    if(!window.bonkHost.playerNames.includes(newPlayerEntry.children[1].textContent)) {
        window.bonkHost.playerNames.push(newPlayerEntry.children[1].textContent);
    }
}

window.bonkHost.redrawSkin = (skinElement) => {
    if(!skinElement.parentNode.classList.contains("newbonklobby_playerentry")) return;
    let playerElement = [...document.getElementById("hostPlayerMenuBox").children].filter(e => {return e.children[1] && e.children[1].textContent === skinElement.parentNode.getElementsByClassName("newbonklobby_playerentry_name")[0].textContent})[0];
    if(!playerElement) return;
    playerElement.removeChild(playerElement.getElementsByClassName("newbonklobby_playerentry_avatar")[0]);
    playerElement.insertBefore(skinElement.cloneNode(true), playerElement.getElementsByClassName("newbonklobby_playerentry_name")[0]);
}

window.bonkHost.playerManagement.removePlayer = (playerEntry) => {
    if((foundPlayerEntry = window.bonkHost.playerManagement.getPlayer(playerEntry)) && foundPlayerEntry) {
        hostPlayerMenuBox.removeChild(foundPlayerEntry);
        if(window.bonkHost.playerNames.includes(foundPlayerEntry.children[1].textContent)) {
            window.bonkHost.playerNames.splice(window.bonkHost.playerNames.indexOf(foundPlayerEntry.children[1].textContent), 1);
        }
    }
}

window.bonkHost.playerManagement.show = () => {
    if(window.bonkHost.menuFunctions.visible) return;
    window.bonkHost.inGame = true;
    if(parent.document.getElementById('adboxverticalleftCurse') != null)
        parent.document.getElementById('adboxverticalleftCurse').style.display = "none";
    document.getElementById('hostPlayerMenu').style.display = "unset";
}

window.bonkHost.playerManagement.hide = () => {
    window.bonkHost.inGame = false;
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
    if(!window.bonkHost.players[playerID] || !window.bonkHost.inGame) return;
    window.bonkHost.menuFunctions.visible = true;
    if(team > 0)
        window.bonkHost.bonkHandlers.hostHandlePlayerJoined(playerID, playerCount, team);
    else
        window.bonkHost.bonkHandlers.hostHandlePlayerLeft(playerID);
    window.bonkHost.menuFunctions.updatePlayers();
}

window.bonkHost.startGame = () => {
    window.bonkHost.keepState = document.getElementById("hostPlayerMenuKeepPositions").checked;
    window.bonkHost.startGameFunction();
}

document.getElementById('maploadwindowmapscontainer').addEventListener('DOMNodeInserted', e => {
    let mode = e.relatedNode.getElementsByClassName('maploadwindowtextmode')[0];
    if(mode === undefined) mode = e.relatedNode.getElementsByClassName('maploadwindowtextmode_picks')[0];
    if(mode.textContent !== "Any Mode") {
        mode.classList.add('brownButton');
        mode.classList.add('brownButton_classic');
        mode.classList.add('buttonShadow');
        mode.style.padding = "2px";
        mode.style.width = "90px";
    }
    mode.addEventListener("click", e => {
        if(!document.getElementById('newbonklobby_modebutton').classList.contains("brownButtonDisabled")) {
            window.bonkSetMode(Object.entries(window.bonkModesObject).filter(e => {return e[1].lobbyName === mode.textContent})[0][0]);
        }
    })
});

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
			let foundAutocompletes = [];
			let foundAutocompletesOffsets = [];
			for (let j = 0; j < window.bonkCommands.length; j++) {
				if (window.bonkCommands[j].toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&').match("^" + chatText[i].toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))) {
					foundAutocompletes.push(window.bonkCommands[j]);
					foundAutocompletesOffsets.push(0);
				}
			}
			if (foundAutocompletes.length === 0) {
				for (let j = 0; j < window.bonkHost.playerNames.length; j++) {
					for (let k = i; k >= 0; k--) {
						if (window.bonkHost.playerNames[j].toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&').match("^" + chatText.slice(k, i + 1).join(" ").toLowerCase().replace(/"/g, "").replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))) {
							foundAutocompletes.push(window.bonkHost.playerNames[j]);
							foundAutocompletesOffsets.push(k);
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

(() => {
    let selectedPlayer = null;
    let start = [], end = [];
    const wheelSize = 150;
    let oldAngle = null;
    const innerWheelRadius = (wheelSize/26.458)/2*8.5;
    window.bonkHost.updatePlayers = () => {
        if(window.bonkHost.menuUsage.getLSID() !== window.bonkHost.menuUsage.hostID) return;
        [...document.getElementsByClassName("newbonklobby_playerentry")].filter(e => {return ["newbonklobby_playerbox_leftelementcontainer", "newbonklobby_playerbox_rightelementcontainer", "newbonklobby_playerbox_elementcontainer", "newbonklobby_specbox_elementcontainer", "hostPlayerMenuBox"].includes(e.parentNode.id)}).forEach(e => {
            e.addEventListener("mousedown", mouse => {
                selectedPlayer = e;
                start = [mouse.clientY, mouse.clientX];
            });
        });
    }
    document.addEventListener("mousemove", mouse => {
        if(selectedPlayer) {
            document.body.style.pointerEvents = "none";
            let wheelType = (document.getElementById("newbonklobby_teams_middletext").textContent === "TEAMS OFF") ? "selectionWheel" : "selectionWheelTeams";
            document.getElementById(wheelType).style.display = "";
            document.getElementById(wheelType).style.top = start[0]-document.getElementById(wheelType).getBoundingClientRect().height/2+"px";
            document.getElementById(wheelType).style.left = start[1]-document.getElementById(wheelType).getBoundingClientRect().width/2+"px";
            end = [mouse.clientY, mouse.clientX];
            if(Math.sqrt((end[0]-start[0])**2 + (end[1]-start[1])**2) >= innerWheelRadius) {
                if(document.getElementById("newbonklobby_teams_middletext").textContent === "TEAMS OFF") {
                    let angle = end[1] < start[1];
                    if(angle) {
                        document.getElementById("selectionWheel").children[0].children[0].children[0].style.opacity = 1;
                        document.getElementById("selectionWheel").children[0].children[1].children[0].style.opacity = 0.5;
                    }
                    else {
                        document.getElementById("selectionWheel").children[0].children[0].children[0].style.opacity = 0.5;
                        document.getElementById("selectionWheel").children[0].children[1].children[0].style.opacity = 1;
                    }
                    selectedPlayer.onmouseenter(angle);
                    oldAngle = angle;
                }
                else {
                    let angle = Math.atan((end[0]-start[0])/(end[1]-start[1]))/Math.PI*180+360/5/2;
                    if(end[1] < start[1]) {
                        angle += 180;
                    }
                    else if(end[0] < start[0]) {
                        angle += 360;
                    }
                    angle = Math.floor((angle%360)/(360/5));
                    if(oldAngle !== angle) {
                        for(let child of [...document.getElementById("selectionWheelTeams").children[0].children[0].children]) {
                            child.style.opacity = 0.5;
                        }
                    }
                    document.getElementById("selectionWheelTeams").children[0].children[0].children[angle].style.opacity = 1;
                    selectedPlayer.onmouseenter(angle);
                    oldAngle = angle;
                }
            }
            else {
                if(oldAngle !== null) {
                    for(let child of [...document.getElementById("selectionWheelTeams").children[0].children[0].children]) {
                        child.style.opacity = 0.5;
                    }
                    for(let child of [...document.getElementById("selectionWheel").children[0].children]) {
                        child.children[0].style.opacity = 0.5;
                    }
                }
                selectedPlayer.onmouseenter(null);
                oldAngle = null;
            }
        }
    });
    const changeTeam = mouse => {
        document.getElementById("selectionWheel").style.display = "none";
        document.getElementById("selectionWheelTeams").style.display = "none";
        if(!selectedPlayer) return;
        document.body.style.removeProperty("pointer-events");
        end = [mouse.clientY, mouse.clientX];
        if(Math.sqrt((end[0]-start[0])**2 + (end[1]-start[1])**2) >= innerWheelRadius) {
            if(document.getElementById("newbonklobby_teams_middletext").textContent === "TEAMS OFF") {
            for(let child of [...document.getElementById("selectionWheel").children[0].children]) {
                child.children[0].style.opacity = 0.5;
            }
            window.bonkHost.menuUsage.changeOtherTeam(window.bonkHost.players.findIndex(i => {return i && i.userName === selectedPlayer.children[1].textContent}), end[1]<start[1] ? 1 : 0);
            }
            else {
                let angle = Math.atan((end[0]-start[0])/(end[1]-start[1]))/Math.PI*180+360/5/2;
                if(end[1] < start[1]) {
                    angle += 180;
                }
                else if(end[0] < start[0]) {
                    angle += 360;
                }
                angle = Math.floor((angle%360)/(360/5));
                window.bonkHost.menuUsage.changeOtherTeam(window.bonkHost.players.findIndex(i => {return i && i.userName === selectedPlayer.children[1].textContent}), [0, 5, 4, 3, 2][angle]);
            }
        }
        else {
            selectedPlayer.click();
        }
        selectedPlayer = null;
    }
    document.addEventListener("mouseup", changeTeam);
    document.addEventListener("mouseenter", mouse => {selectedPlayer = (mouse.buttons !== 0 ? selectedPlayer : null); if(!selectedPlayer)changeTeam(mouse)});
})();

document.getElementById('ingamechatinputtext').onkeydown = document.getElementById('newbonklobby_chat_input').onkeydown;