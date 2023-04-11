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

  isDeckEmpty() {
    return this.deck.length == 0;
  }

  discardPileTopCard() {
    return this.discardPile[this.discardPile.length - 1];
  }

  deckTopCard() {
    if (!this.isDeckEmpty()) {
      let pickedCard = this.deck[0];
      this.deck.shift();
      return pickedCard;
    } else {
      return null;
    }
  }

  drawCards(thePlayer, noOfCards) {
    for (let i = 0; i < noOfCards; i++) {
      if (!this.isDeckEmpty()) {
        let pickedCard = this.deck[0];
        this.deck.shift();
        thePlayer.hand.push(pickedCard);
      } else {
        return true;
      }
    }
  }

  didPlayerWin(thePlayer) {
    if (thePlayer.hand.length == 0) {
      return thePlayer.name;
    } else {
      return null;
    }
  }

  cardNamesFromObject(thePlayer) {
    let cardsList = [];
    for (let i = 0; i < thePlayer.hand.length; i++) {
      cardsList.push(thePlayer.hand[i].rank + " of " + thePlayer.hand[i].suit);
    }
    return cardsList;
  }

  play() {
    //The Original Match Happens Here

    //Initialisations
    let thePlayer = this.players[0];
    let gameStatus = "Game is In Progress !";
    let reverseMode = false;
    let turnTaken = 0;

    while (true) {
      //Until the game ends
      turnTaken = turnTaken + 1;

      console.log("Current Player Name : " + thePlayer.name);
      console.log("Cards in hand : " + this.cardNamesFromObject(thePlayer));

      let matchedCard = findMatch(this.discardPileTopCard(), thePlayer);

      console.log(
        "Cards on top of discarded pile : " +
          this.discardPileTopCard().rank +
          " of " +
          this.discardPileTopCard().suit
      );
      
      if (matchedCard != null) {

        console.log(
          "Cards matching to discard : " +
            matchedCard.rank +
            " of " +
            matchedCard.suit
        );

      } else {

        console.log(
          "Status : There are no matching cards to discard. " +
            thePlayer.name +
            " should pick a card."
        );

      }

      //If matched card is null:
      if (matchedCard == null) {

        //pick a card from the deck
        if (this.isDeckEmpty()) {
          console.log("Status : There are no cards available to draw.");
          gameStatus = "Game Ends in Draw!";
          break;
        }

        let pickedCard = this.deck[0];
        this.deck.shift();
        thePlayer.hand.push(pickedCard);
        thePlayer = nextPlayer(this.players, thePlayer, reverseMode, 0);
      } 
      
      else {

        this.discardPile.push(matchedCard); //While doing this check the rank
        if (this.didPlayerWin(thePlayer) != null) {
          console.log(thePlayer.name + " completed all the cards.");
          gameStatus = thePlayer.name + " Won the match !!";
          break;
        }

        if (matchedCard.rank == "King") {
          reverseMode = !reverseMode;
          console.log(thePlayer.name + " used King card.");
          console.log("Status : The game will now go in reverse direction!");
          thePlayer = nextPlayer(this.players, thePlayer, reverseMode, 0);
        } 
        
        else if (matchedCard.rank == "Queen") {
          console.log(thePlayer.name + " discared Queen card.");
          thePlayer = nextPlayer(this.players, thePlayer, reverseMode, 0); //The next player on the sequence
          //This player should draw two cards
          console.log(thePlayer.name + " should pick 2 cards");
          let cardEmptyStatus = this.drawCards(thePlayer, 2);
          if (cardEmptyStatus == true) {
            console.log("Status : There are no cards available to draw.");
            gameStatus = "Game Ends in Draw!";
            break;
          }
          thePlayer = nextPlayer(this.players, thePlayer, reverseMode, 0); //The next player on the sequence to continue the game
        } 
        
        else if (matchedCard.rank == "Jack") {
          console.log(thePlayer.name + " discared Jack card.");
          thePlayer = nextPlayer(this.players, thePlayer, reverseMode, 0); //The next player on the sequence
          console.log(thePlayer.name + " should pick 4 cards.");
          let cardEmptyStatus = this.drawCards(thePlayer, 4);
          if (cardEmptyStatus == true) {
            gameStatus = "Game Ended in Draw !";
            break;
          }
          thePlayer = nextPlayer(this.players, thePlayer, reverseMode, 0); //The next player on the sequence to continue the game
        }
        
        else if (matchedCard.rank == "Ace") {
          console.log(thePlayer.name + " discared Ace card.");
          thePlayer = nextPlayer(this.players, thePlayer, reverseMode, 0);
          console.log(thePlayer.name + " is skipped.");
          thePlayer = nextPlayer(this.players, thePlayer, reverseMode, 0);
        } 
        
        else {
          thePlayer = nextPlayer(this.players, thePlayer, reverseMode, 0);
        }

      }
      console.log("-   -   -   -");
    }

    console.log("");
    console.log("*** Game Result ***");
    console.log("Final Verdict : " + gameStatus);
    console.log("Turns Taken : " + turnTaken);
  }

}

let m = new Match();
m.createPlayers();
m.distributeCards(5);
m.createDiscardPile();
m.play();

// TODO
// Take userinput for the player names
// No of turns, Game Stats at the end of the game
// Need to optimise the code
// Need to improve the readability of the code
// Need to improvise helper files
// Improvise the naming convention
// Add more clear and consice comments
// Breakdown the game play into more methods
// If possible, need to add the manual game play
// Improve the code for multiplayer mode, change it from 4 players mode to min 2 players mode
// Handle the case when players*cards exceed 52
// Need to add the unit tests for the cases
// Need to document the code and the useage
// Remove/comment all the console logs
// Put semicolons

// Need to show the output of the match in more good way
