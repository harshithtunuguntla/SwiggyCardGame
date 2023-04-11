const Player = require('./Player')
const Deck = require('./Deck')
const nextPlayer = require('./nextPlayer')
const findMatch = require('./findMatch')



const deck = new Deck();
// console.log(deck.cards);

deck.shuffle();
// console.log(deck.cards);


class Match{
  constructor(){
    this.deck = deck.cards
    this.discardPile = []
    this.players = []
  }

  createPlayers(){
    let p1 = new Player('Harshith')
    let p2 = new Player('Akhila')
    let p3 = new Player('Surendra')
    let p4 = new Player('Sishir')
    this.players = [p1,p2,p3,p4]
  }

  distributeCards(noOfCards){
    for(let i=0;i<this.players.length;i++){
      let currentPlayer = this.players[i]
      for(let j=0;j<noOfCards;j++){
        currentPlayer.hand.push(this.deck[0])
        this.deck.shift()
      }
    }
  }

  createDiscardPile(){
    this.discardPile.push(this.deck[0])
    this.deck.shift()
  }

  status(){
    for(let i=0;i<this.players.length;i++){
      console.log(this.players[i])
    }
  }

  cardsInDeck(){
    console.log(this.deck)
  }

  cardsInDiscardPile(){
    console.log(this.discardPile)
  }

  isPileEmpty(){
    return this.deck.length==0;
  }

  play(){
    //The Original Match Happens Here

  }


}


let m = new Match()
m.createPlayers()
m.distributeCards(5)
m.createDiscardPile()


// m.status()
m.play()


