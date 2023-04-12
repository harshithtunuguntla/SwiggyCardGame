const assert = require("chai").assert;
// const describe = require('mocha').describe;
// const it = require('mocha').it;


const Deck = require('../helperClasses/Deck');

describe('Deck', function() {
  describe('constructor', function() {
    it('should make a new 52-card deck.', function() {
      const deck = new Deck();
      assert.equal(deck.cards.length, 52);
    });
  });

  describe('shuffle', function() {
    it('the deck of cards should be shuffled', function() {
      const deck = new Deck();
      const originalOrder = deck.cards.slice();
      deck.shuffle();
      assert.notDeepEqual(deck.cards, originalOrder);
    });
  });

});

