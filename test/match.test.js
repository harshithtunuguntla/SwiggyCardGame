const assert = require('chai').assert;

const Match = require('../helperClasses/Match');
const Player = require('../helperClasses/Player');

describe('Match', () => {

    let match;



    describe('Constructor',()=>{

        beforeEach(function() {
            match = new Match();
          });

        it('should have a deck with 52 cards on initialization', function() {
            assert.equal(match.deck.length, 52);
        });

        it('should have a empty discard pile on initialization', function() {
            assert.deepEqual(match.discardPile, []);
        });

        it('should have turns taken as zero', function() {
            assert.equal(match.turnTaken,0);
        });

        it('should have players count as zero', function() {
            assert.equal(match.playersCount,0);
        });

        it('should have reverse mode as false', function() {
            assert.equal(match.reverseMode,false);
        });

    });

    describe('Initialise Variables',()=>{

        let match = new Match()

        p1 = new Player('Harshith')
        p2 = new Player('Sai')

        match.players = [p1,p2]
        match.initCards = 3;

        match.distributeCards();

        it('should create 2 players', function() {
            assert.equal(match.players.length,2);
        });

        it('should create players with 3 cards in hand', function() {
            assert.equal(match.players[0].hand.length,3);
        });

        match.initPlayerToBegin();
        it('should randomly pick a player', function() {
            assert.include(match.players, match.currentPlayer);
        });

    });


    describe('Discard pile',()=>{

        let match = new Match();


        it('should have discard pile of length 0 initially', function() {
            assert.equal(match.discardPile.length,0);
        });

        it('should create a discard pile with one card', function() {
            match.createDiscardPile();
            assert.equal(match.discardPile.length,1);
        });

        it('should have discard pile of length 2 when added', function() {
            let card = { suit: 'Clubs', rank: '2' }
            match.addCardOnDiscardPile(card)
            assert.equal(match.discardPile.length,2);
        });

        it('should properly pick top card', function() {
            let card = { suit: 'Clubs', rank: '2' }
            let topCard = match.discardPileTopCard()
            assert.deepEqual(card,topCard);
        });

        it('should return length of discard pile', function() {
            let length = match.availableCardsInDiscardPile()
            assert.equal(length,2);
        });



    });

    describe('Deck',()=>{

        let match = new Match();


        it('should have deck of length 52 initially', function() {
            assert.equal(match.deck.length,52);
        });

        it('should have deck of length 42 after distributing 5 cards to 2 players', function() {
            p1 = new Player('Harshith')
            p2 = new Player('Sai')

            match.players = [p1,p2]
            match.initCards = 5;

            match.distributeCards();
            assert.equal(match.deck.length,42);
        });


        it('should properly return top card on deck', function() {
            let deckTopCard = match.deck[0];
            assert.equal(match.deckTopCard(),deckTopCard); //Removes a card
        });

        it('should return available cards in deck', function() {
            assert.equal(match.availableCardsInDeck(),41);
        });

        it('should properly return wether deck is empty or not', function() {
            assert.equal(match.isDeckEmpty(),false);
        });

    });


    describe('Draw Cards',()=>{
        let match = new Match();

        it('Should initialize players and distribute cards', function() {
            p1 = new Player('Harshith')
            p2 = new Player('Sai')
    
            match.players = [p1,p2]
            match.initCards = 2;
            match.distributeCards()
            match.currentPlayer = match.players[0];
            assert.equal(match.didPlayerWin(),false); // Still there are cards left
        });

        it('Should draw cards properly : 1 card',function(){
            let noOfCardsInHandBefore = match.currentPlayer.hand.length;
            let noOfCardsInDeckBefore = match.deck.length;

            match.drawCards(1);

            let noOfCardsInDeckAfter = match.deck.length;
            let noOfCardsInHandAfter = match.currentPlayer.hand.length; 

            assert.equal(noOfCardsInDeckBefore-1,noOfCardsInDeckAfter)
            assert.equal(noOfCardsInHandBefore+1,noOfCardsInHandAfter)

        })

        it('Should draw cards properly : 2 cards',function(){
            let noOfCardsInHandBefore = match.currentPlayer.hand.length;
            let noOfCardsInDeckBefore = match.deck.length;

            match.drawCards(2);

            let noOfCardsInDeckAfter = match.deck.length;
            let noOfCardsInHandAfter = match.currentPlayer.hand.length; 

            assert.equal(noOfCardsInDeckBefore-2,noOfCardsInDeckAfter)
            assert.equal(noOfCardsInHandBefore+2,noOfCardsInHandAfter)

        })


    });



    describe('Player win',()=>{

        let match = new Match();

        it('Player win should show false when cards left', function() {
            p1 = new Player('Harshith')
            p2 = new Player('Sai')
    
            match.players = [p1,p2]
            match.initCards = 2;
            match.distributeCards()
            match.currentPlayer = match.players[0];
            assert.equal(match.didPlayerWin(),false); // Still there are cards left
        });

        it('Player win should show false when cards left', function() {
            match.currentPlayer.hand.shift();
            assert.equal(match.didPlayerWin(),false); // Still there are cards left
        });

        it('did player win should return true when no cards left', function() {
            match.currentPlayer.hand.shift()
            assert.equal(match.didPlayerWin(),true); // Still there are cards left
        });


    });




  
})
