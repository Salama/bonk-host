//Remove round limit
document.getElementById('newbonklobby_roundsinput').removeAttribute("maxlength");
newStr = newStr.replace(/...\[[0-9]\]\[[0-9]\]\[...\[[0-9]\]\[[0-9]?[0-9]?[0-9]\]\]=Math\[...\[[0-9]\]\[[0-9]?[0-9]?[0-9]\]\]\(Math\[...\[[0-9]\]\[[0-9]?[0-9]?[0-9]\]\]\(1,...\[[0-9]\]\[[0-9]\]\[...\[[0-9]\]\[[0-9]?[0-9]?[0-9]\]\]\),9\);/, '');

//Mode selection menu
newStr = newStr.replace(modeStuff[0], `${modeStuff[0]};window.bonkModesObject=${modesObject};window.bonkSetMode=m=>{${modeStuff[1]}${modeVar}=m;${modeStuff[3]}};window.createModeDropdown();`);
//Add mode button to map suggestion message
newStr = newStr.replace('v2k[79][d9G[3][624]]([d9G[73]]);', 'v2k[79][d9G[3][624]]([d9G[73]]);' + SUGGESTION_MODE_BUTTON);
//Append mode button
newStr = newStr.replace('d9G[8][d9G[3][455]](d9G[73]);', 'd9G[8][d9G[3][455]](d9G[73]);'+APPEND_SUGGESTION_MODE_BUTTON);

//Balance all
newStr = newStr.replace('I8H[7][I8H[1][645]]()', 'I8H[7][I8H[1][645]]() || I8H[7] === "*" || I8H[5][0] == "/balanceall"');
newStr = newStr.replace('I8H[5][0] == G9b.z43(1869)', 'I8H[5][0] == G9b.z43(1869) || I8H[5][0] == "/balanceall"');
newStr = newStr.replace('I8H[67]=I8H[17];break;', BALANCE_SELECTION);
newStr = newStr.replace('parseInt(I8H[5][2]);', 'parseInt(I8H[5][I8H[5][0] == "/balanceall" ? 1 : 2]);');
newStr = newStr.replace('if(I8H[32] == 0)', BALANCE_ALL_MESSAGE);

newStr = newStr.replace('if(I8H[5][0] == G9b.z43(1869)', CUSTOM_COMMANDS+'else if(I8H[5][0] == G9b.z43(1869)');
newStr = newStr.replace('u6H[29][I8H[1][644]](G9b.A43(1897),G9b.z43(1871),false);', 'u6H[29][I8H[1][644]](G9b.A43(1897),G9b.z43(1871),false);u6H[29].showStatusMessage("/hhelp - commands from host extension","#cc3333",false);');

//Let people join mid game
newStr = newStr.replace('if(u6H[64]){u6H[30]', 'if(window.bonkHost.freejoin||u6H[64]){u6H[30]');

/////////////
//Host menu//
/////////////

//Add players
newStr = newStr.replace('{Q1h();}};', '{Q1h();}};' + 'window.bonkHost.playerManagement.addPlayer(X9G[1], w3G[0][1][X9G[0][0]]);');

//Remove players
newStr = newStr.replace('if(w3G[32][h9G[5]]){', 'if(w3G[32][h9G[5]]){' + 'window.bonkHost.playerManagement.removePlayer(w3G[32][h9G[5]]);');
newStr = newStr.replace('if(w3G[32][c1G[2]]){', 'if(w3G[32][c1G[2]]){' + 'window.bonkHost.playerManagement.removePlayer(w3G[32][c1G[2]]);');

//Player click menu
newStr = newStr.replace('if(X9G[1][m9G[2][1379]]){', PLAYER_CLICK_MENU + 'if(X9G[1][m9G[2][1379]]){')

//Player click menu position and highligh removal
newStr = newStr.replace('if(m9G[4] == false){', 'if(playerEntry){w3G[26].playerElement=playerEntry;m9G[6].style.removeProperty("left");m9G[6].style.right=0;m9G[6].style.top=([...playerEntry.parentNode.children].indexOf(playerEntry)+1)*43+"px";}' + 'if(m9G[4] == false){');

//Highlight
newStr = newStr.replace('X9G[1][m9G[2][457]][m9G[2][456]](G9b.z43(3256));', 'let playerEntry = window.bonkHost.playerManagement.getPlayer(m9G[0][0].target, true); if(playerEntry) {playerEntry.classList.add("newbonklobby_playerentry_menuhighlighted");} else{' + 'X9G[1][m9G[2][457]][m9G[2][456]](G9b.z43(3256));' + '}');

//Some bonk function handlers
newStr = newStr.replace('R2k[0][1]});};}', 'R2k[0][1]});};' + 'window.bonkHost.bonkHandlers = this;' + '}');

//Some menu functions
newStr = newStr.replace('w3G[60]);}};', 'w3G[60]);}};'+ 'window.bonkHost.menuFunctions = this;');

//Player counter
newStr = newStr.replace('if(u6H[5]', 'window.bonkHost.playerCount=s6H[3];if(u6H[5]');

//Change team handlers
newStr = newStr.replace('w8G[9]=v8yy;', 'w8G[9]=v8yy;' + "window.bonkHost.playerManagement.movePlayer(w8G[0][0], window.bonkHost.playerCount, w8G[0][1]);");
newStr = newStr.replace('S8G[8]=v8yy;', 'S8G[8]=v8yy;' + "window.bonkHost.playerManagement.movePlayer(this.getLSID(), window.bonkHost.playerCount, S8G[0][0]);");

//Get start game function
newStr = newStr.replace('function P5S', 'window.bonkHost.startGameFunction=P5S;document.getElementById("hostPlayerMenuRestartButton").addEventListener("click", window.bonkHost.startGame);' + 'function P5S')

//Scores
newStr = newStr.replace(';if(k7k[0][5][k7k[4][114]])', ';' + KEEP_SCORES + 'if(k7k[0][5][k7k[4][114]])');
newStr = newStr.replace('o9k[1][o9k[7][122]]=[0,0,0,0];', 'o9k[1][o9k[7][122]]=' + '(window.bonkHost.scores.length > 0 && document.getElementById("hostPlayerMenuKeepScores").checked) ? window.bonkHost.scores' + ':[0,0,0,0];')

//Score counter
newStr = newStr.replace('G9b.A2k(1000,b2k[6]);', 'G9b.A2k(1000,b2k[6]);window.bonkHost.scores=i2k[7][i2k[1]].scores;');

//Update menu while in game
newStr = newStr.replace('!this[h9G[9][481]]', '!this[h9G[9][481]] && false');
newStr = newStr.replace('!this[V9G[1][481]]', '!this[V9G[1][481]] && false');

//Show menu when in game if host
newStr = newStr.replace('if(u6H[29]){u6H[29][w8H[9][722]]();}', 'if(u6H[29]){u6H[29][w8H[9][722]]();' + `if(u6H[11].hostID == u6H[11].getLSID())window.bonkHost.playerManagement.show();` + '}');

//Hide menu when not in game
newStr = newStr.replace('w1G[5]=v8yy;', 'w1G[5]=v8yy;' + 'window.bonkHost.playerManagement.hide();');
newStr = newStr.replace('c1G[5]=v8yy;', 'c1G[5]=v8yy;' + 'window.bonkHost.playerManagement.hide();');

//Add default click handler (mainly for closing the dropdown menu)
newStr = newStr.replace('=e6h;', '=e6h;' + 'document.getElementById("hostPlayerMenu").onclick=e6h;');

//Handle host change
newStr = newStr.replace('l5h(G9b.z43(3279),G9b.A43(3276),false);}', 'window.bonkHost.playerManagement.show();' + 'l5h(G9b.z43(3279),G9b.A43(3276),false);}' + 'else{window.bonkHost.playerManagement.hide();}');
newStr = newStr.replace('C0z(G9b.A43(2039));', 'C0z(G9b.A43(2039));' + 'window.bonkHost.playerManagement.show();');

//Teamlock
newStr = newStr.replace('if(w3G[0][2][V9G[1][662]])', 'document.getElementById("hostPlayerMenuTeamlock").checked=w3G[0][2].tl;' + 'if(w3G[0][2][V9G[1][662]])');

//Handle an error when clicking host menu. MIGHT BREAK IN RARE CASES WITH OTHER MODS because it's missing {}, but it should be fine
newStr = newStr.replace('t9G[5]=v8yy;', 't9G[5]=v8yy;' + 'if(w3G[26].element!=null)');

//Update menu when joined
newStr = newStr.replaceAll('=u6H[30];', '=u6H[30];if(!u6H[64]){let oldVisibility=window.bonkHost.menuFunctions.visible;window.bonkHost.menuFunctions.visible=true;window.bonkHost.menuFunctions.updatePlayers();window.bonkHost.menuFunctions.visible = oldVisibility;}');