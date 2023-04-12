# Description
This is a 52-card deck card game for multiple players. The game moves forward with specific rules to raise and lower players' scores, thereby determining the winner.

# Game Play

There will be a Deck of 52 Cards containing the combinations from suits[Spades, Hearts, Diamonds, Clubs] and Ranks [Ace,2,3,4,5,6,7,8,910,Jack,King,Queen]. x cards are then distributed among y players and players take turns to discard the cards they have to win the game.

The left alone cards after distributing from the 52 cards are known as deck that are kept aside. A discard pile is created by flipping a single card from the deck.

Now the game starts with a random player. Players can discard cards in their hand and whosoever completes all the cards in their hand is declared the winner. A player can discard a card when either of the cards he has should match with rank or suit of the top card of the discard pile.

If any person doesn't have a matching card to discard, then they need to pick a new card from the deck.

There will be actions for the discarded card. If the discarded card has the rank king, the gameplay is reversed [sequence of the persons who are playing will now go in the opposite direction]. If the discarded card is ace, the next person in the sequence is skipped. If the discarded card is queeen, next person penalised 2 cards and skipped from playing this round. If the discarded card is jack, next person penalised 4 cards and skipped from playing that round.

The game can end in two ways. Either the player wins if all the cards in his hand are discarded or the game ends in draw if there are no cards left to pick from the deck

# Game Rules

- This is a multiplayer game where the minimum number of players is set to 2 and maximum number of players is set to 4
- There will be two piles of cards that is discard pile where the discarded cards are kept and the deck cards where the leftover cards post distribution are kept
- The game begins by picking a random person to start with and goes in top-down sequence as the names entered while starting
- The player can discard the card only if it matches with rank of the top card of the discard pile or the suit of the top card of the discard pile
- The discarded card will now become the top of the discard pile if there is a match
- If the player is unable to discard a card because of non-matching with top card from the discard pile, they need to pick a card from the deck of cards. If the deck of cards is empty and player could not pick a card from the deck, the game is ended and declared a draw
- If the discarded card by the player is King, the entire sequence of the game is reversed. i.e if the game is moving in top-down approach, it is now converted into down-top approach and vice-versa
- If the discarded card by the player is Ace, the next player in the sequence is skipped and the next player will continue the game
- If the discarded card by the player is Queen, the next player in the sequence should pick 2 cards from the deck and is skipped and the next player will continue the game
- If the discarded card by the player is Jack, the next player in the sequence should pick 4 cards from the deck and is skipped and the next player will continue the game

# Installation and Usage

1. To install this application, first clone the repository : `git clone https://github.com/harshithtunuguntla/SwiggyCardGame/`

2. Then, navigate to the project directory and follow the commands to install the dependencies and run the project.

3. Istall the dependencies using `npm install` which will install the dependencies listed in the package.json file for your project. This command will create a node_modules folder in your project directory and install all the required dependencies in it.

4. Once all the dependencies are installed, start the application using the following command : `npm start` which will prompt user to enter the player details and card details and initiate the game

5. Once the code is run, all the gameplay is logged on the console showing the turns of the game, the cards each player is holding, card on top of the discard pile. The current status of the game, the actions being performed are logged on the console from time to time.

6. Once the complete game is done, it will show the final results of win or draw.

7. To test the code, run `npm test` which will run the whole test suite of unit tests. The test results will show all the tests made and the results of either failure or success along with the reason of failure.


# How to Play?

After succesfull installation of the code and dependencies. Start the game by `npm start`. Once the game starts, it will prompt to enter the number of players which should be a minimum of 2 and maximum of 4. Once the numbers of players is inputted, the number of cards each player should be given is prompted and the user must enter a value that should not exceed 52 cards [i.e no of players x cards for each player should not exceed 52]. Once the details of the game are entered, the user will be prompted to enter the names of the players. Once the details are entered, the cards are distribured and the game will begin with all the actions. The status of the game and the player will be logged after every turn. Finally the verdict of the game is logged at the end. 

# Working flow of the Game

The complete flow of the game from start to end with all the possibilities of winning a game or ending the game in draw are detailed in the diagram.

![flowchart_nontransparent](https://user-images.githubusercontent.com/53993341/231505036-d96c9050-cf2e-478f-a0bd-7cb0cb97734d.png)


# Demo

Video Demonstration will appear here


# Test Cases

There have been extensive test cases written in this project to end-to-end test the whole working. All the test cases and screenshots will be displayed here

# Game Results [Screenshots]

Game Inputs to start the game
![image](https://user-images.githubusercontent.com/53993341/231505944-d88ca078-440b-4917-9d31-fb8acd808d8b.png)

Game Progress
![image](https://user-images.githubusercontent.com/53993341/231506212-745a50b5-6b51-47e7-b6ea-ab54b2f0d62c.png)

Game Results
![image](https://user-images.githubusercontent.com/53993341/231506357-674bf59f-8f68-4b16-83ab-1aeef227f4c3.png)


## Authors
- [@harshithtunuguntla](https://www.linkedin.com/in/harshithtunuguntla)




