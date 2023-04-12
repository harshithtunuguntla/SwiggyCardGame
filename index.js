const Match = require("./helperClasses/Match"); //Main file that contains all the helper classes, functions to host the match

let match = new Match(); //Create New Match
match.initMatchVariables(); //Initialise match variables : Number of players, cards to each player
match.createPlayers(); //Input the player details and create their profile
match.distributeCards(); //Distribute the cards to all the players
match.createDiscardPile(); //Create the discard pile with flipping the one card on the top of the deck
match.initPlayerToBegin(); //Randomly select the player to begin the game with

match.play(); //Begin the game : All the status of the match will be logged on the console
match.printGameResult(); //Result of the game is printed at the end mentioning the winner or draw
