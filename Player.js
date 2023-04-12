class Player {
    constructor(name) {
      this.name = name;
      this.hand = [];
    }

    insertCard(card){
      this.hand.push(card);
    }
}

module.exports = Player;