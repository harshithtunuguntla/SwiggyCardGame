class Player {
  constructor(name) { //Initialising the player information
    this.name = name;
    this.hand = [];
  }

  insertCard(card) { //Inserting the card in the player 
    this.hand.push(card);
  }
}

module.exports = Player;
