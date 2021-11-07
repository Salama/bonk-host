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

newStr = newStr.replace('if(t7V[7][0] == S9L.W1E(1868', CUSTOM_COMMANDS+'else if(t7V[7][0] == S9L.W1E(1868');
newStr = newStr.replace('j0V[69][t7V[3][644]](S9L.W1E(1896),S9L.C1E(1870),false);', 'j0V[69][t7V[3][644]](S9L.W1E(1896),S9L.C1E(1870),false);j0V[69][t7V[3][644]]("/hhelp - commands from host extension",S9L.C1E(1870),false);');
