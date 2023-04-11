const Player = require("./Player");
const Deck = require("./Deck");
const nextPlayer = require("./nextPlayer");
const findMatch = require("./findMatch");

const deck = new Deck();
// console.log(deck.cards);

deck.shuffle();
// console.log(deck.cards);

class Match {
  constructor() {
    this.deck = deck.cards;
    this.discardPile = [];
    this.players = [];
  }

  createPlayers() {
    let p1 = new Player("Harshith");
    let p2 = new Player("Akhila");
    let p3 = new Player("Surendra");
    let p4 = new Player("Sishir");
    this.players = [p1, p2, p3, p4];
  }

  distributeCards(noOfCards) {
    for (let i = 0; i < this.players.length; i++) {
      let currentPlayer = this.players[i];
      for (let j = 0; j < noOfCards; j++) {
        currentPlayer.hand.push(this.deck[0]);
        this.deck.shift();
      }
    }
  }

  createDiscardPile() {
    this.discardPile.push(this.deck[0]);
    this.deck.shift();
  }

  status() {
    for (let i = 0; i < this.players.length; i++) {
      console.log(this.players[i]);
    }
  }

  cardsInDeck() {
    console.log(this.deck);
  }

  cardsInDiscardPile() {
    console.log(this.discardPile);
  }

  isDeckEmpty() {
    return this.deck.length == 0;
  }

  discardPileTopCard() {
    return this.discardPile[this.discardPile.length - 1];
  }

  play() {
    //The Original Match Happens Here
    let thePlayer = this.players[0];
    let gameStatus = "InProgress";

    let reverseMode = false;
    let k = 15;
    while (k > 0) {
      //Until the game ends
      // console.log(thePlayer);
      console.log(thePlayer);
      let matchedCard = findMatch(this.discardPileTopCard(), thePlayer);
      console.log(this.discardPile[this.discardPile.length - 1]);
      console.log(matchedCard);

      //If matched card is null:
      if (matchedCard == null) {
        //pick a card from the deck
        if (this.isDeckEmpty()) {
          gameStatus = "Draw";
          break;
        }

        let pickedCard = this.deck[0];
        this.deck.shift();
        thePlayer.hand.push(pickedCard);
        thePlayer =
          this.players[nextPlayer(this.players, thePlayer, reverseMode, 0)];
      } else {
        // console.log(matchedCard.rank)
        this.discardPile.push(matchedCard); //While doing this check the rank
        // console.log(this.discardPileTopCard())

        if (matchedCard.rank == "King") {
          reverseMode = !reverseMode;
          thePlayer =
            this.players[nextPlayer(this.players, thePlayer, reverseMode, 0)];
        } else if (matchedCard.rank == "Queen") {
        } else if (matchedCard.rank == "Jack") {
          
        } else if (matchedCard.rank == "Ace") {
          thePlayer =
            this.players[nextPlayer(this.players, thePlayer, reverseMode, 1)];
        } else {
          thePlayer =
            this.players[nextPlayer(this.players, thePlayer, reverseMode, 0)];
        }
      }
      console.log("------");

      k = k - 1;
    }

    console.log(gameStatus);
  }
}

let m = new Match();
m.createPlayers();
m.distributeCards(5);
m.createDiscardPile();
m.play();
