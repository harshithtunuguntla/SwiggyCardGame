const prompt = require('prompt-sync')();
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
    this.playersCount = 0;
    this.initCards = 100;
    this.players = [];
    this.gameStatus = "Game is Initialised !";
    this.turnTaken = 0;
  }

  initMatchVariables(){

    while(this.playersCount < 2 || this.playersCount >4){
      const playersCount = prompt('How many players do you want to play? [Min 2, Max 4] : ');
      if(playersCount<2 || playersCount>4){
        console.log('Please enter the selection in the range : [Min 2, Max 4] \n');
      }
      this.playersCount = playersCount
    }

    console.log("")

    while(this.playersCount * this.initCards > 52){
      const initCards = prompt('How many cards do you want to play for each person? : ');
      if(this.playersCount*initCards>52){
        console.log('There wont be sufficient cards for each person to being the game. Please enter less number of cards\n');
      }
      this.initCards = initCards
    }

  }

  createPlayers() {
    //To prompt and take user input for number of players and their details
    
    for(let j=0;j<this.playersCount;j++){
      const playerName = prompt('Enter the name of the player ' + (j+1) + " : " );
      let newPlayer = new Player(playerName);
      this.players.push(newPlayer)

    }

  }

  distributeCards() {
    for (let i = 0; i < this.players.length; i++) {
      let currentPlayer = this.players[i];
      for (let j = 0; j < this.initCards; j++) {
        currentPlayer.hand.push(this.deck[0]);
        this.deck.shift();
      }
    }
  }

  createDiscardPile() {
    this.discardPile.push(this.deck[0]);
    this.deck.shift();
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

  printGameStatus() {
    for (let i = 0; i < this.players.length; i++) {
      console.log(this.players[i]);
    }
  }

  printGameResult(){
    console.log("");
    console.log("*** Game Result ***");
    console.log("Final Verdict : " + this.gameStatus);
    console.log("Turns Taken : " + this.turnTaken);
  }

  printPlayerStatus(thePlayer){
    console.log("Current Player Name : " + thePlayer.name);
    console.log("Cards in hand : " + this.cardNamesFromObject(thePlayer));
  }

  printCardDetails(card,message){

    console.log(
      message +
        card.rank +
        " of " +
        card.suit
    );

  }

  printStatus(message){
    console.log("Status : " + message)
  }

  play() {
    //The Original Match Happens Here

    //Initialisations
    let thePlayer = this.players[0];
    let reverseMode = false;

    while (true) {
      //Until the game ends
      this.turnTaken = this.turnTaken + 1;


      this.printPlayerStatus(thePlayer)

      let matchedCard = findMatch(this.discardPileTopCard(), thePlayer);

      this.printCardDetails(this.discardPileTopCard(),"Card on top of discarded pile : ")



      //If matched card is null:
      if (matchedCard == null) {

        this.printStatus("There are no matching cards to discard. " +
            thePlayer.name +
            " should pick a card."
        );

        //pick a card from the deck

        if(this.drawCards(thePlayer,1)==true){
          this.printStatus("Status : There are no cards available to draw.")
          this.gameStatus = "Game Ends in Draw!";
          break
        }
        else{
          this.printStatus(thePlayer.name + " picks a card. Game continues")
          thePlayer = nextPlayer(this.players, thePlayer, reverseMode, 0);
        }

        // if (this.isDeckEmpty()) {

        //   break;
        // }

        // let pickedCard = this.deck[0];
        // this.deck.shift();
        // thePlayer.hand.push(pickedCard);
        // thePlayer = nextPlayer(this.players, thePlayer, reverseMode, 0);
        // this.printStatus(thePlayer.name + "has picked a card. Game continues")


      } 
      
      else {

        this.printCardDetails(matchedCard,"Card matching to discard : ")

        this.discardPile.push(matchedCard); //While doing this check the rank
        if (this.didPlayerWin(thePlayer) != null) {
          this.printStatus(thePlayer.name + " completed all the cards.");
          this.gameStatus = thePlayer.name + " won the match !!";
          break;
        }

        if (matchedCard.rank == "King") {
          reverseMode = !reverseMode;
          this.printStatus(thePlayer.name + " used King card.");
          this.printStatus("The game will now go in reverse direction!");
          thePlayer = nextPlayer(this.players, thePlayer, reverseMode, 0);
        } 
        
        else if (matchedCard.rank == "Queen") {
          this.printStatus(thePlayer.name + " discared Queen card.");
          thePlayer = nextPlayer(this.players, thePlayer, reverseMode, 0); //The next player on the sequence
          //This player should draw two cards
          this.printStatus(thePlayer.name + " should pick 2 cards and is skipped from playing");
          let cardEmptyStatus = this.drawCards(thePlayer, 2);
          if (cardEmptyStatus == true) {
            this.printStatus("There are no cards available to draw.");
            this.gameStatus = "Game Ends in Draw!";
            break;
          }
          thePlayer = nextPlayer(this.players, thePlayer, reverseMode, 0); //The next player on the sequence to continue the game
        } 
        
        else if (matchedCard.rank == "Jack") {
          this.printStatus(thePlayer.name + " discared Jack card.");
          thePlayer = nextPlayer(this.players, thePlayer, reverseMode, 0); //The next player on the sequence
          this.printStatus(thePlayer.name + " should pick 4 cards and is skipped from playing");
          let cardEmptyStatus = this.drawCards(thePlayer, 4);
          if (cardEmptyStatus == true) {
            this.gameStatus = "Game Ended in Draw !";
            break;
          }
          thePlayer = nextPlayer(this.players, thePlayer, reverseMode, 0); //The next player on the sequence to continue the game
        }
        
        else if (matchedCard.rank == "Ace") {
          this.printStatus(thePlayer.name + " discared Ace card.");
          thePlayer = nextPlayer(this.players, thePlayer, reverseMode, 0);
          this.printStatus(thePlayer.name + " is skipped.");
          thePlayer = nextPlayer(this.players, thePlayer, reverseMode, 0);
        } 
        
        else {
          this.printStatus(thePlayer.name +" discards the card. The game continues")
          thePlayer = nextPlayer(this.players, thePlayer, reverseMode, 0);
        }

      }
      console.log("-   -   -   -");
    }

  }

}

let m = new Match();
m.initMatchVariables();
m.createPlayers();
m.distributeCards();
m.createDiscardPile();
m.play();
m.printGameResult();

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
// Change all looping variables


//Can the person picking up the card play the immediate turn?