const express = require('express')



const app = express();
const port = 3000;

//Define the player class
class Player {
    constructor(name, hand) {
      this.name = name;
      this.hand = [];
    }
}

const suits = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
const ranks = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];


const deck = [];

// Generate cards for each suit and rank
for (const element of suits) {
  for (let j = 0; j < ranks.length; j++) {
    const card = {
      suit: element,
      rank: ranks[j]
    };
    deck.push(card);
  }
}

// console.log(deck);



function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}


shuffleArray(deck);

// console.log(deck);


p1 = new Player('Harshith')
p1.hand.push(deck[0])
deck.shift()
p1.hand.push(deck[0])
deck.shift()
p1.hand.push(deck[0])
deck.shift()


p2 = new Player('Pranay')
p2.hand.push(deck[0])
deck.shift()
p2.hand.push(deck[0])
deck.shift()
p2.hand.push(deck[0])
deck.shift()

// console.log(p1);
// console.log(p2);

// console.log(deck.length);

discardPile = []
discardPile.push(deck[0])
deck.shift()

// console.log(discardPile[0])


const readline = require("readline-sync");

players = ['a','b','c','d']

//Next player stratergy when reversed
// i = 0
// while(1){
//   console.log(players[i]);

//   let reverse = Number(readline.question());

//     if(reverse==1){
//       i = i-1
//       if(i<0){
//         i = -i
//         i = 4-i
//       }
//       i = i%4
//     }
//     else{
//         i = (i+1)%4;    
//     }

// }


function findMatch(discardPileCard,currentPlayer){

  console.log(currentPlayer.hand.length)
  
  for(let i=0;i<currentPlayer.hand.length;i++){
    console.log(currentPlayer.hand[i].suit)
    console.log(discardPileCard.suit)

    if(currentPlayer.hand[i].suit == discardPileCard.suit || currentPlayer.hand[i].rank == discardPileCard.rank){
      return currentPlayer.hand[i]
    }
  }
  return null

}


// 1
// 2
// 3
// 4
// 5
// 6
// 5
// 4
// 3
// 2
// 1
// 0
// -1 => 1
// -2 => 2
// -3
// -4
// -5

// 1 2 3 4 1 2 3 4 1 2 "if reverse"
// 1 4 3 2 1 

console.log(discardPile[0])
console.log(p1)

let a = findMatch(discardPile[0],p1)
console.log(a)
