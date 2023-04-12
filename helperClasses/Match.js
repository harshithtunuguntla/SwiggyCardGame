const prompt = require("prompt-sync")();
const Player = require("./Player");
const Deck = require("./Deck");
const nextPlayer = require("../helperFunctions/nextPlayer");
const findMatch = require("../helperFunctions/findMatch");


class Match {
    constructor() {
      const deck = new Deck();
      deck.shuffle();

      this.deck = deck.cards;
      this.discardPile = [];
      this.playersCount = 0;
      this.initCards = Number.MAX_VALUE;
      this.players = [];
      this.gameStatus = "Game is Initialised !";
      this.turnTaken = 0;
      this.currentPlayer = "";
      this.reverseMode = false;
    }
  
    //initialise match variables such as number of players, cards for each player
    initMatchVariables() {
      while (this.playersCount < 2 || this.playersCount > 4) {
        const playersCount = prompt(
          "How many players do you want to play? [Min 2, Max 4] : "
        );
        if (playersCount < 2 || playersCount > 4) {
          console.log(
            "Please enter the selection in the range : [Min 2, Max 4] \n"
          );
        }
        this.playersCount = playersCount;
      }
      console.log("");
  
      while (this.playersCount * this.initCards > 52) {
        const initCards = prompt(
          "How many cards do you want to play for each person? : "
        );
        if (this.playersCount * initCards > 52) {
          console.log(
            "There wont be sufficient cards for each person to being the game. Please enter less number of cards\n"
          );
        }
        this.initCards = initCards;
      }
      console.log("");
    }
    
    //Create players with their information
    createPlayers() {
      //To prompt and take user input for number of players and their details
      for (let j = 0; j < this.playersCount; j++) {
        const playerName = prompt(
          "Enter the name of the player " + (j + 1) + " : "
        );
        let newPlayer = new Player(playerName);
        this.players.push(newPlayer);
      }
    }
    
    //Distribute cards to the players
    distributeCards() {
      for (let i = 0; i < this.players.length; i++) {
        let currentPlayer = this.players[i];
        for (let j = 0; j < this.initCards; j++) {
          currentPlayer.insertCard(this.deck[0]);
          this.deck.shift();
        }
      }
    }

    //Pick a player randomly to start the play
    initPlayerToBegin() {
      let randomPlayer = Math.floor(Math.random() * (this.playersCount))
      this.currentPlayer = this.players[randomPlayer];
      console.log("\nPlayer will be picked randomly to begin the game!");
      console.log(this.currentPlayer.name + " will begin the match");
    }
  
  
    addCardOnDiscardPile(theCard) {
      this.discardPile.push(theCard);
    }
  
    createDiscardPile() {
      this.addCardOnDiscardPile(this.deck[0]);
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
  
    availableCardsInDiscardPile() {
      return this.discardPile.length;
    }
  
    availableCardsInDeck() {
      return this.deck.length;
    }
  
    isDeckEmpty() {
      return this.deck.length == 0;
    }
  
    drawCards(noOfCards) {
      for (let i = 0; i < noOfCards; i++) {
        if (!this.isDeckEmpty()) {
          let pickedCard = this.deck[0];
          this.deck.shift();
          this.currentPlayer.insertCard(pickedCard);
        } else {
          return false;
        }
      }
    }
  
    turnToNextPlayer(skipCount) {
      this.currentPlayer = nextPlayer(
        this.players,
        this.currentPlayer,
        this.reverseMode,
        skipCount
      );
    }
  
    didPlayerWin() {
      return this.currentPlayer.hand.length == 0;
    }
  
    cardNamesFromObject(currentPlayer) {
      let cardsList = [];
      for (let i = 0; i < currentPlayer.hand.length; i++) {
        cardsList.push(
          currentPlayer.hand[i].rank + " of " + currentPlayer.hand[i].suit
        );
      }
      return cardsList;
    }
  
    printGameStatus() {
      for (let i = 0; i < this.players.length; i++) {
        console.log(this.players[i]);
      }
    }
  
    printGameResult() {
      console.log("");
      console.log("*** Game Result ***");
      console.log("Final Verdict : " + this.gameStatus);
      console.log("Turns Taken : " + this.turnTaken);
    }
  
    printPlayerStatus() {
      console.log("Current Player Name : " + this.currentPlayer.name);
      console.log(
        "Cards in hand : " + this.cardNamesFromObject(this.currentPlayer)
      );
    }
  
    printCardDetails(message, card) {
      console.log(message + card.rank + " of " + card.suit);
    }
  
    printStatus(message) {
      console.log("Status : " + message);
    }
  

    //Action to perform when the discarded card is king
    actionForKing() {
      this.reverseMode = !this.reverseMode;
      this.printStatus(this.currentPlayer.name + " discarded King card.");
      this.printStatus("The game will now go in reverse direction!");
      this.turnToNextPlayer(0);
    }
  
    //Action to perform when the discarded card is queen
    actionForQueen() {
      this.printStatus(this.currentPlayer.name + " discarded Queen card.");
  
      this.turnToNextPlayer(0); //The next player on the sequence
      this.printStatus(
        this.currentPlayer.name +
          " should pick 2 cards and is skipped from playing"
      );
  
      if (this.drawCards(2) == false) {
        this.printStatus("There are no cards available to draw.");
        this.gameStatus = "Game Ends in Draw!";
        return false;
      }
  
      this.turnToNextPlayer(0);
    }


    //Action to perform when the discarded card is jack
    actionForJack() {
      //Next player should draw 4 cards
      this.printStatus(this.currentPlayer.name + " discared Jack card.");
  
      //The Immediate Player
      this.turnToNextPlayer(0);
      this.printStatus(
        this.currentPlayer.name +
          " should pick 4 cards and is skipped from playing"
      );
  
      if (this.drawCards(4) == false) {
        this.printStatus("There are no cards available to draw.");
        this.gameStatus = "Game Ended in Draw !";
        return false;
      }
  
      //Next player, skipping the immediate player
      this.turnToNextPlayer(0);
    }
  
    //Action to perform when the discarded card is ace
    actionForAce() {
      this.printStatus(this.currentPlayer.name + " discared Ace card.");
  
      //The immediate player
      let playerSkipped = nextPlayer(
        this.players,
        this.currentPlayer,
        this.reverseMode,
        0
      );
      this.printStatus(playerSkipped.name + " is skipped.");
  
      //Next player, skipping the immediate player, skip 1
      this.turnToNextPlayer(1);
    }
  


    //Main Game Play
    play() {
      //Game Loop
      //Initialisations
      console.log("\n Game Start! \n");
  
      //Until the game ends
      while (true) {
        this.printPlayerStatus();
        let matchedCard = findMatch(
          this.discardPileTopCard(),
          this.currentPlayer
        );
        this.printCardDetails(
          "Card on top of discarded pile : ",
          this.discardPileTopCard()
        );
  
        //check if there is a matching card to discard
        if (matchedCard == null) {
          this.printStatus(
            "There are no matching cards to discard. " +
              this.currentPlayer.name +
              " should pick a card."
          );
  
          //pick a card from the , if the deck is empty declare the game
          if (this.drawCards(1) == false) {
            this.printStatus("Status : There are no cards available to draw.");
            this.gameStatus = "Game Ends in Draw!";
            break;
          } else {
            this.printStatus(
              this.currentPlayer.name + " picks a card. Game continues"
            );
            this.turnToNextPlayer(0);
          }
        }
  
        //If there is a matching card to discard
        else {
          this.printCardDetails("Card matching to discard : ", matchedCard);
          this.addCardOnDiscardPile(matchedCard);
  
          //Check if all the cards in the player hand are emptied after pushing on discard pile
  
          if (this.didPlayerWin() == true) {
            this.printStatus(
              this.currentPlayer.name + " completed all the cards."
            );
            this.gameStatus = this.currentPlayer.name + " won the match !!";
            break;
          }
  
          //Check if the matched card has any rank to take action
          //Action to take for king card
          if (matchedCard.rank == "King") {
            this.actionForKing();
          } 
          //Action to take for queen card
          else if (matchedCard.rank == "Queen") {
            //Next player should draw two cards
            if (this.actionForQueen() == false) {
              break;
            }
          }
          //Action to take for jack card
          else if (matchedCard.rank == "Jack") {
            if (this.actionForJack() == false) {
              break;
            }
          } 
          //Action to take for Ace card
          else if (matchedCard.rank == "Ace") {
            this.actionForAce();
          } 
          //There is no action to take if it is not an action card
          else {
            this.printStatus(
              this.currentPlayer.name + " discards the card. The game continues"
            );
            this.turnToNextPlayer(0);
          }
        }
  
        //Increment the turns taken to show the stats at the end of the game
        this.turnTaken = this.turnTaken + 1;
        // this.printStatus(
        //   "Cards in disard pile : " + this.availableCardsInDiscardPile()
        // );
        // this.printStatus(
        //   "Available cards in deck : " + this.availableCardsInDeck()
        // );
        console.log("-   -   -   -   -");
      }
    }
  }


module.exports = Match;