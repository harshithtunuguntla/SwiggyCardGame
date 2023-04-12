function nextPlayer(players,currentplayer,reverse,skipBy){

    let i = players.indexOf(currentplayer);
    let totalPlayers = players.length;


    if(reverse==true){
      i = i-1-skipBy
      if(i<0){
        i = -i
        i = totalPlayers-i
      }
      i = i%totalPlayers
    }
    else{
        i = (i+skipBy+1)%totalPlayers;    
    }

    return players[i];
  
}

module.exports = nextPlayer;

