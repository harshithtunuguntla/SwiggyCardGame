class Deck{
    constructor(){
        const suits = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
        const ranks = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
        
        const deck = [];

        for (const element of suits) {
          for (let j = 0; j < ranks.length; j++) {
            const card = {
              suit: element,
              rank: ranks[j]
            };
            deck.push(card);
          }
        }

        this.cards = deck;
        
    }

    shuffle() {
    for (var i = this.cards.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = this.cards[i];
        this.cards[i] = this.cards[j];
        this.cards[j] = temp;
    }
}


}

module.exports = Deck;