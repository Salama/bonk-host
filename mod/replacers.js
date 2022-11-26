let patchCounter = 0;
const patch = (a, b) => {
	let c = newStr;
	newStr = newStr.replace(a, b);
	/*console.log(`Patch ${patchCounter++}: ${c === newStr ? 'fail' : 'success'}`);
	if(c === newStr) {
		console.log(`Failed to patch ${a} with ${b}`);
	}*/
	return c !== newStr;
}

//Remove round limit
document.getElementById('newbonklobby_roundsinput').removeAttribute("maxlength");
patch(/[A-Za-z0-9\$_]{3}\[[0-9]{1,3}\]\[[0-9]{1,3}\]\[[A-Za-z0-9\$_]{3}\[[0-9]{1,3}\]\[[0-9]{1,3}\]\]=Math\[[A-Za-z0-9\$_]{3}\[[0-9]{1,3}\]\[[0-9]{1,3}\]\]\(Math\[[A-Za-z0-9\$_]{3}\[[0-9]{1,3}\]\[[0-9]{1,3}\]\]\(1,[A-Za-z0-9\$_]{3}\[[0-9]{1,3}\]\[[0-9]{1,3}\]\[[A-Za-z0-9\$_]{3}\[[0-9]{1,3}\]\[[0-9]{1,3}\]\]\),9\);/, '');
const roundVal = newStr.match(/[A-Za-z0-9\$_]{3}\[[0-9]{1,4}\]=parseInt\([A-Za-z0-9\$_]{3}(\[0\]){2}\[[A-Za-z0-9\$_]{3}(\[[0-9]{1,4}\]){2}\]\)\;/)[0];
const roundValVar = roundVal.split('=')[0];
patch(roundVal, `${roundValVar}=parseInt(document.getElementById('newbonklobby_roundsinput').value);if(isNaN(${roundValVar}) || ${roundValVar} <= 0){return;}`);

//Mode selection menu. Custom patch
let lastTarget = newStr.match(/editorCanTarget:(true|false)\};/g)
lastTarget = lastTarget[lastTarget.length - 1];
newStr = newStr.split(lastTarget);

newStr[newStr.length - 1] = `window.bonkHost.bonkModesObject=${modesObject};window.bonkHost.bonkSetMode=m=>{if(m==="f"){window.bonkHost.gameInfo[2].tea=true;}window.bonkHost.gameInfo[2].ga=(m==="f" ? "f" : "b");window.bonkHost.gameInfo[2].mo=m;window.bonkHost.menuFunctions.updateGameSettings();window.bonkHost.menuFunctions.updatePlayers();window.bonkHost.toolFunctions.networkEngine.sendGAMO(m==="f" ? "f" : "b", m);};window.bonkHost.createModeDropdown();` + newStr[newStr.length - 1];

newStr = newStr.join(lastTarget);

//Add mode button to map suggestion message
patch(mapSuggestionModeRegex, mapSuggestionModeRegex.split("if")[0] + SUGGESTION_MODE_BUTTON + "if" + mapSuggestionModeRegex.split("if")[1]);

//Internal var
patch(`function ${BIGVAR}(){}`, `function ${BIGVAR}(){}${BIGVAR}.bonkHost={};`);

/////////////
//Host menu//
/////////////

//Save latest state
const stateRegex = newStr.match(/[A-Z]\[[A-Za-z0-9\$_]{3}(\[[0-9]{1,3}\]){2}\]={discs/)[0];
patch(stateRegex, `${BIGVAR}.bonkHost.state=arguments[0];` + stateRegex);

//Apply latest state
const stateSetRegex = newStr.match(/\* 999\),[A-Za-z0-9\$_]{3}\[[0-9]{1,3}\],null,[A-Za-z0-9\$_]{3}\[[0-9]{1,3}\],true\);/)[0];
patch(stateSetRegex, stateSetRegex + SET_STATE);

//Handle player joins and rebans
let playerJoinedCustom = newStr.match(/\[\d\],ping:105\};/)[0];
patch(playerJoinedCustom, playerJoinedCustom+`window.bonkHost.handlePlayerJoined(...arguments);`);

//Joined room
let connectionMatch = newStr.match(/reconnection:false\}\);/)[0];
patch(connectionMatch, connectionMatch + `window.bonkHost.bans=[];`);


//Get some useful objects
let menuRegex = newStr.match(/== 13\){...\(\);}}/)[0];
patch(menuRegex, menuRegex + "window.bonkHost.menuFunctions = this; window.bonkHost.wrap();");
let toolRegex = newStr.match(/=new [A-Za-z0-9\$_]{1,3}\(this,[A-Za-z0-9\$_]{1,3}\[0\]\[0\],[A-Za-z0-9\$_]{1,3}\[0\]\[1\]\);/);
patch(toolRegex, toolRegex + "window.bonkHost.toolFunctions = this;");
let infoRegex = newStr.match(/[A-Za-z0-9\$_]{3}\[[0-9]{1,3}\]=\{id:-1,element:null\};/)[0];
patch(infoRegex, infoRegex + "window.bonkHost.gameInfo = arguments;");
patch("newbonklobby_votewindow_close", "window.bonkHost.players = arguments[1];" + "newbonklobby_votewindow_close");
// state handling
patch("{a:0.0};", "{a:0.0};" + `window.bonkHost.stateFunctions = this;`);

//Big class
let bigClass = newStr.match(/[A-Z]\[[A-Za-z0-9\$_]{1,3}\[[0-9]+\]\[[0-9]+\]\]\([A-Za-z0-9\$_]{1,3}\[0\]\[0\]\);[A-Za-z0-9\$_]{1,3}\[[0-9]+\]\[[A-Za-z0-9\$_]{1,3}\[[0-9]+\]\[[0-9]+\]\]\([A-Za-z0-9\$_]{1,3}\[[0-9]+\],{m:/)[0][0];
patch(`function ${bigClass}(){}`, `function ${bigClass}(){};window.bonkHost.bigClass=${bigClass};`);

//Function for all callbacks
let callbacks = [...newStr.match(/[A-Za-z0-9\$_]{3}\(\.\.\./g)];
for(let callback of callbacks) {
	patch(`function ${callback}`, `window.bonkHost.bonkCallbacks["${callback.split("(")[0]}"] = ${callback.split("(")[0]};` + `function ${callback}`);
}
