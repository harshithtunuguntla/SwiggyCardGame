
function findMatch(discardPileCard,currentPlayer){

    console.log(currentPlayer.name)
    
    for(let i=0;i<currentPlayer.hand.length;i++){
  
  
      if(currentPlayer.hand[i].suit == discardPileCard.suit || currentPlayer.hand[i].rank == discardPileCard.rank){
  
  
        let cardToRemove = currentPlayer.hand[i];
  
        const indexToRemove = currentPlayer.hand.indexOf(cardToRemove);
  
        if (indexToRemove > -1) {
          currentPlayer.hand.splice(indexToRemove, 1);
        }
  
        return cardToRemove;
      }
    }
    return null
  
  }

  module.exports  = findMatch;


  