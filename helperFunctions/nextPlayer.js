function nextPlayer(players, currentplayer, reverse, skipBy) { //Code logic to find the next player based on the different actions available in the game
  //Players : Array of available players in the game
  //CurrentPlayer : The player whose turn is happening
  //Reverse : To let function know which direction the game is going in. false indicates the top-down while the true indicated down-top in the form of the names entered to the player
  //SkipBy : This indicates how many players have to be skipped. 0 indicates the next player. 1 indicates skipping 1 player and the next player is allowed to play
  let i = players.indexOf(currentplayer);
  let totalPlayers = players.length;

  if (reverse == true) {
    i = i - 1 - skipBy;
    if (i < 0) {
      i = -i;
      i = totalPlayers - i;
    }
    i = i % totalPlayers;
  } else {
    i = (i + skipBy + 1) % totalPlayers;
  }

  return players[i];
}

module.exports = nextPlayer;
