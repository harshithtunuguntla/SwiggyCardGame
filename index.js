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
    this.initCards = Number.MAX_VALUE;
    this.players = [];
    this.gameStatus = "Game is Initialised !";
    this.turnTaken = 0;
    this.currentPlayer = "";
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
    console.log("")

  }

  initPlayerToBegin(){
    this.currentPlayer = this.players[0];
    console.log(this.currentPlayer)
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

  availableCardsInDiscardPile(){
    return this.discardPile.length
  }

  availableCardsInDeck(){
    return this.deck.length
  }

  drawCards(currentPlayer, noOfCards) {
    for (let i = 0; i < noOfCards; i++) {
      if (!this.isDeckEmpty()) {
        let pickedCard = this.deck[0];
        this.deck.shift();
        currentPlayer.hand.push(pickedCard);
      } else {
        return false;
      }
    }
  }

  didPlayerWin(currentPlayer) {
    return currentPlayer.hand.length == 0;
  }

  cardNamesFromObject(currentPlayer) {
    let cardsList = [];
    for (let i = 0; i < currentPlayer.hand.length; i++) {
      cardsList.push(currentPlayer.hand[i].rank + " of " + currentPlayer.hand[i].suit);
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

  printPlayerStatus(currentPlayer){
    console.log("Current Player Name : " + currentPlayer.name);
    console.log("Cards in hand : " + this.cardNamesFromObject(currentPlayer));
  }

  printCardDetails(message,card){
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
    //Game Loop
    //Initialisations
    let currentPlayer = this.players[0];
    let reverseMode = false;
    console.log("\n Game Start! \n")


    //Until the game ends
    while (true) {

      this.printPlayerStatus(currentPlayer)
      let matchedCard = findMatch(this.discardPileTopCard(), currentPlayer);
      this.printCardDetails("Card on top of discarded pile : ",this.discardPileTopCard())

      //check if there is a matching card to discard
      if (matchedCard == null) {
        this.printStatus("There are no matching cards to discard. " +
            currentPlayer.name +
            " should pick a card."
        );

        //pick a card from the deck
        if(this.drawCards(currentPlayer,1)==false){
          this.printStatus("Status : There are no cards available to draw.")
          this.gameStatus = "Game Ends in Draw!";
          break
        }
        else{
          this.printStatus(currentPlayer.name + " picks a card. Game continues")
          currentPlayer = nextPlayer(this.players, currentPlayer, reverseMode, 0);
        }
      } 

      //If there is no matching card to discard

      else {
        this.printCardDetails("Card matching to discard : ",matchedCard)
        this.discardPile.push(matchedCard); 

        if (this.didPlayerWin(currentPlayer) == true) {
          this.printStatus(currentPlayer.name + " completed all the cards.");
          this.gameStatus = currentPlayer.name + " won the match !!";
          break;
        }

        //Check if the matched card has any rank to take action
        
        if (matchedCard.rank == "King") {
          //Game should reverse
          reverseMode = !reverseMode;
          this.printStatus(currentPlayer.name + " used King card.");
          this.printStatus("The game will now go in reverse direction!");
          currentPlayer = nextPlayer(this.players, currentPlayer, reverseMode, 0);
        } 
        
        else if (matchedCard.rank == "Queen") {
          //Next player should draw two cards
          this.printStatus(currentPlayer.name + " discared Queen card.");
          
          let affectedPlayer = nextPlayer(this.players, currentPlayer, reverseMode, 0); //The next player on the sequence
          this.printStatus(affectedPlayer.name + " should pick 2 cards and is skipped from playing");

          if (this.drawCards(affectedPlayer, 2) == false) {
            this.printStatus("There are no cards available to draw.");
            this.gameStatus = "Game Ends in Draw!";
            break;
          }

          currentPlayer = nextPlayer(this.players, currentPlayer, reverseMode, 1); //The next player on the sequence to continue the game
        } 
        
        else if (matchedCard.rank == "Jack") {
          //Next player should draw 4 cards
          this.printStatus(currentPlayer.name + " discared Jack card.");

          //The Immediate Player
          let affectedPlayer = nextPlayer(this.players, currentPlayer, reverseMode, 0); //The next player on the sequence
          this.printStatus(affectedPlayer.name + " should pick 4 cards and is skipped from playing");
  
          if (this.drawCards(affectedPlayer, 4) == false) {
            this.printStatus("There are no cards available to draw.")
            this.gameStatus = "Game Ended in Draw !";
            break;
          }

          //Next player, skipping the immediate player
          currentPlayer = nextPlayer(this.players, currentPlayer, reverseMode, 1); //The next player on the sequence to continue the game
        }
        
        else if (matchedCard.rank == "Ace") {
          this.printStatus(currentPlayer.name + " discared Ace card.");

          //The immediate player
          let playerSkipped = nextPlayer(this.players, currentPlayer, reverseMode, 0);
          this.printStatus(playerSkipped.name + " is skipped.");

          //Next player, skipping the immediate player, skip 1
          currentPlayer = nextPlayer(this.players, currentPlayer, reverseMode, 1);
        } 
        
        else {
          this.printStatus(currentPlayer.name +" discards the card. The game continues")
          currentPlayer = nextPlayer(this.players, currentPlayer, reverseMode, 0);
        }

      }

      this.turnTaken = this.turnTaken + 1;
      this.printStatus("Cards in disard pile : " + this.availableCardsInDiscardPile())
      this.printStatus("Available cards in deck : " + this.availableCardsInDeck())
      console.log("-   -   -   -   -");
    }

  }

}

let match = new Match();
match.initMatchVariables();
match.createPlayers();
match.distributeCards();
match.createDiscardPile();
match.initPlayerToBegin();

match.play();
match.printGameResult();

