class Deck {
  constructor() {
    const suits = ["Spades", "Hearts", "Diamonds", "Clubs"]; // Available suits
    const ranks = [ //Available ranks in the game
      "Ace",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "Jack",
      "Queen",
      "King",
    ];

    const deck = []; //Stores all the cards generated

    for (const element of suits) { //Generator loop to make all the card combinations
      for (let j = 0; j < ranks.length; j++) {
        const card = {
          suit: element,
          rank: ranks[j],
        };
        deck.push(card);
      }
    }

    this.cards = deck;
  }

  shuffle() { //Method to shuffle the deck of cards
    for (let i = this.cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); //Generate random number
      let temp = this.cards[i]; //Swap the cards with the random positions
      this.cards[i] = this.cards[j];
      this.cards[j] = temp;
    }
  }
}

module.exports = Deck;
