function findMatch(discardPileCard, currentPlayer) { // helper function to find out if there is any matching card w.r.t to card on top of discard pile. So the matching card can be discarded.
  for (let i = 0; i < currentPlayer.hand.length; i++) {
    if (
      currentPlayer.hand[i].suit == discardPileCard.suit ||
      currentPlayer.hand[i].rank == discardPileCard.rank //Condition to make the matching. Its should either match with rank or with suit
    ) {
      let cardToRemove = currentPlayer.hand[i];
      const indexToRemove = currentPlayer.hand.indexOf(cardToRemove); //Matched card is removed from player hand

      if (indexToRemove > -1) {
        currentPlayer.hand.splice(indexToRemove, 1);
      }

      return cardToRemove; //return the card if there is any matching
    }
  }
  return null; //return null if there is no matching card to discard
}

module.exports = findMatch;
