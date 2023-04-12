const prompt = require("prompt-sync")();
const Player = require("./Player");
const Deck = require("./Deck");
const nextPlayer = require("../helperFunctions/nextPlayer");
const findMatch = require("../helperFunctions/findMatch");

class Match { //Match class to conduct a match
  constructor() {
    //All the variablees required for the whole match are declared here
    const deck = new Deck(); //Create a new deck of cards
    deck.shuffle(); //Shuffle the new deck of cards

    this.deck = deck.cards;
    this.discardPile = [];
    this.playersCount = 0;
    this.initCards = Number.MAX_VALUE;
    this.players = [];
    this.gameStatus = "Game is Initialised !";
    this.turnTaken = 0;
    this.currentPlayer = "";
    this.reverseMode = false;
    // console.log(this.playersCount);
  }

  initMatchVariables() { //initialise match variables such as number of players, cards for each player
    try {
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
    } catch (err) {
      console.log("Error occured while inputting the number of players to play the match");
      console.log(err);
    }

    try {
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
    } catch (err) {
      console.log("Error occured while inputting cards for each player");
      console.log(err);
    }
  }

  createPlayers() { //Create players with their information
    try {
      for (let j = 0; j < this.playersCount; j++) {
        //To prompt and take user input for number of players and their details
        const playerName = prompt(
          "Enter the name of the player " + (j + 1) + " : "
        );
        let newPlayer = new Player(playerName);
        this.players.push(newPlayer);
      }
    } catch (err) {
      console.log("Error occured while creating the players");
      console.log(err);
    }
  }

  distributeCards() { //Distribute cards to the players
    try {
      for (let i = 0; i < this.players.length; i++) {
        let currentPlayer = this.players[i];
        for (let j = 0; j < this.initCards; j++) {
          currentPlayer.insertCard(this.deck[0]);
          this.deck.shift();
        }
      }
    } catch (err) {
      console.log("Error occured while distributing cards to players");
      console.log(err);
    }
  }

  initPlayerToBegin() { //Pick a player randomly to start the play
    try {
      let randomPlayer = Math.floor(Math.random() * this.playersCount);
      this.currentPlayer = this.players[randomPlayer];
      console.log("\nPlayer will be picked randomly to begin the game!");
      console.log(this.currentPlayer.name + " will begin the match");
    } catch (err) {
      console.log("Error occured while initialising player to begin the game");
      console.log(err);
    }
  }

  addCardOnDiscardPile(theCard) { //Add card on discard pile
    try {
      this.discardPile.push(theCard);
    } catch (err) {
      console.log("Error occured while adding card on discard pile");
      console.log(err);
    }
  }

  createDiscardPile() { //Method to create discard pile while flipping the top card on the deck
    try {
      this.addCardOnDiscardPile(this.deck[0]);
    } catch (err) {
      console.log("Error occured while creating discard pile");
      console.log(err);
    }
  }

  discardPileTopCard() { //Method to see the top card on the discard pile
    try {
      return this.discardPile[this.discardPile.length - 1];
    } catch (err) {
      console.log("Error occured while returning top card from discard pile");
      console.log(err);
    }
  }

  deckTopCard() { //Method to see the top card on the deck
    try {
      if (!this.isDeckEmpty()) {
        let pickedCard = this.deck[0];
        this.deck.shift();
        return pickedCard;
      } else {
        return null;
      }
    } catch (err) {
      console.log("Error occured while returning the top card from the deck");
      console.log(err);
    }
  }

  availableCardsInDiscardPile() { //Method to count the number of cards present in discard pile
    try {
      return this.discardPile.length;
    } catch (err) {
      console.log("Error occured while calculating length of discard pile");
      console.log(err);
    }
  }

  availableCardsInDeck() { //Method to count the number of cards present in deck
    try {
      return this.deck.length;
    } catch (err) {
      console.log("Error occured while calculating length of deck");
      console.log(err);
    }
  }

  isDeckEmpty() { //Method to check if the deck is empty
    try {
      return this.deck.length == 0;
    } catch (err) {
      console.log("Error occured while checking if the deck is empty");
      console.log(err);
    }
  }

  drawCards(noOfCards) { //Method to draw x number of cards for a player
    try {
      for (let i = 0; i < noOfCards; i++) {
        if (!this.isDeckEmpty()) {
          let pickedCard = this.deck[0];
          this.deck.shift();
          this.currentPlayer.insertCard(pickedCard);
        } else {
          return false;
        }
      }
    } catch (err) {
      console.log("Error occured while drawing cards for the player");
      console.log(err);
    }
  }

  turnToNextPlayer(skipCount) { //To find out the next player according to the game 
    try {
      this.currentPlayer = nextPlayer(
        this.players,
        this.currentPlayer,
        this.reverseMode,
        skipCount
      );
    } catch (err) {
      console.log("Error occured while finding the next player to play");
      console.log(err);
    }
  }

  didPlayerWin() { //To findout if the current player is a winner
    try {
      return this.currentPlayer.hand.length == 0;
    } catch (err) {
      console.log(
        "Error occured while calulating if the player has any cards left"
      );
      console.log(err);
    }
  }

  cardNamesFromObject(currentPlayer) { //converting card objects into meaningful names
    try {
      let cardsList = [];
      for (let i = 0; i < currentPlayer.hand.length; i++) {
        cardsList.push(
          currentPlayer.hand[i].rank + " of " + currentPlayer.hand[i].suit
        );
      }
      return cardsList;
    } catch (err) {
      console.log("Error occured while converting card objects to names");
      console.log(err);
    }
  }

  printGameStatus() { //To print the status of the game
    try {
      for (let i = 0; i < this.players.length; i++) {
        console.log(this.players[i]);
      }
    } catch (err) {
      console.log("Error occured while printing the game status");
      console.log(err);
    }
  }

  printGameResult() { //To print the result of the game
    try {
      console.log("");
      console.log("*** Game Result ***");
      console.log("Final Verdict : " + this.gameStatus);
      console.log("Turns Taken : " + this.turnTaken);
    } catch (err) {
      console.log("Error occured while printing the game result");
      console.log(err);
    }
  }

  printPlayerStatus() { //To print the status of the player
    try {
      console.log("Current Player Name : " + this.currentPlayer.name);
      console.log(
        "Cards in hand : " + this.cardNamesFromObject(this.currentPlayer)
      );
    } catch (err) {
      console.log("Error occured while printing the player status");
      console.log(err);
    }
  }

  printCardDetails(message, card) { //To print the details of the card
    try {
      console.log(message + card.rank + " of " + card.suit);
    } catch (err) {
      console.log("Error occured while printing the card details");
      console.log(err);
    }
  }

  printStatus(message) { //To print a status message
    try {
      console.log("Status : " + message);
    } catch (err) {
      console.log("Error occured while printing message");
      console.log(err);
    }
  }

  actionForKing() { //Action to perform when the discarded card is king
    try {
      this.reverseMode = !this.reverseMode;
      this.printStatus(this.currentPlayer.name + " discarded King card.");
      this.printStatus("The game will now go in reverse direction!");
      this.turnToNextPlayer(0);
    } catch (err) {
      console.log("Error occured while performing actions for king card");
      console.log(err);
    }
  }

  actionForQueen() { //Action to perform when the discarded card is queen
    try {
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
    } catch (err) {
      console.log("Error occured while performing actions for queen card");
      console.log(err);
    }
  }

  actionForJack() { //Action to perform when the discarded card is jack
    try {
      this.printStatus(this.currentPlayer.name + " discared Jack card.");
      this.turnToNextPlayer(0); //The Immediate Player
      this.printStatus(
        //Next player should draw 4 cards
        this.currentPlayer.name +
          " should pick 4 cards and is skipped from playing"
      );
      if (this.drawCards(4) == false) {
        this.printStatus("There are no cards available to draw.");
        this.gameStatus = "Game Ended in Draw !";
        return false;
      }
      this.turnToNextPlayer(0); //Next player, skipping the immediate player
    } catch (err) {
      console.log("Error occured while performing actions for Jack card");
      console.log(err);
    }
  }

  actionForAce() { //Action to perform when the discarded card is ace
    try {
      this.printStatus(this.currentPlayer.name + " discared Ace card.");
      let playerSkipped = nextPlayer(
        //The immediate player
        this.players,
        this.currentPlayer,
        this.reverseMode,
        0
      );
      this.printStatus(playerSkipped.name + " is skipped.");
      this.turnToNextPlayer(1);
    } catch (err) {
      //Next player, skipping the immediate player, skip 1
      console.log("Error occured while performing actions for Ace card");
      console.log(err);
    }
  }

  play() {//Main Game Play
    
    //Game Loop
    //Initialisations

    try {
      console.log("\n Game Start! \n");

      while (true) {
        //Until the game ends
        this.printPlayerStatus();
        let matchedCard = findMatch(
          this.discardPileTopCard(),
          this.currentPlayer
        );
        this.printCardDetails(
          "Card on top of discarded pile : ",
          this.discardPileTopCard()
        );

        if (matchedCard == null) {
          //check if there is a matching card to discard
          this.printStatus(
            "There are no matching cards to discard. " +
              this.currentPlayer.name +
              " should pick a card."
          );

          if (this.drawCards(1) == false) {
            //pick a card from the , if the deck is empty declare the game
            this.printStatus("Status : There are no cards available to draw.");
            this.gameStatus = "Game Ends in Draw!";
            break;
          } else {
            this.printStatus(
              this.currentPlayer.name + " picks a card. Game continues"
            );
            this.turnToNextPlayer(0);
          }
        } else {
          //If there is a matching card to discard
          this.printCardDetails("Card matching to discard : ", matchedCard);
          this.addCardOnDiscardPile(matchedCard);

          if (this.didPlayerWin() == true) {
            //Check if all the cards in the player hand are emptied after pushing on discard pile
            this.printStatus(
              this.currentPlayer.name + " completed all the cards."
            );
            this.gameStatus = this.currentPlayer.name + " won the match !!";
            break;
          }

          //Check if the matched card has any rank to take action

          if (matchedCard.rank == "King") {
            //Action to take for king card
            this.actionForKing();
          } else if (matchedCard.rank == "Queen") {
            //Action to take for queen card
            if (this.actionForQueen() == false) {
              //Check if the deck has two cards available and draw
              break;
            }
          } else if (matchedCard.rank == "Jack") {
            //Action to take for jack card
            if (this.actionForJack() == false) {
              //Check if the deck has four cards available and draw
              break;
            }
          } else if (matchedCard.rank == "Ace") {
            //Action to take for Ace card
            this.actionForAce();
          } else {
            //There is no action to take if it is not an action card
            this.printStatus(
              this.currentPlayer.name + " discards the card. The game continues"
            );
            this.turnToNextPlayer(0);
          }
        }

        this.turnTaken = this.turnTaken + 1; //Increment the turns taken to show the stats at the end of the game
        // this.printStatus(
        //   "Cards in disard pile : " + this.availableCardsInDiscardPile()
        // );
        // this.printStatus(
        //   "Available cards in deck : " + this.availableCardsInDeck()
        // );
        console.log("-   -   -   -   -");
      }
    } catch (err) {
      console.log("Error occured while playing the game");
      console.log(err);
    }
  }
}

module.exports = Match;
