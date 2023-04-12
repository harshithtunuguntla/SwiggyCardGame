const assert = require('chai').assert;
const Player = require('../helperClasses/Player');

describe('Player', function() {
  describe('constructor', function() {
    it('should create a new player with the given name and an empty hand', function() {
      const player = new Player('Harshith');
      assert.equal(player.name, 'Harshith');
      assert.deepEqual(player.hand, []);
    });
  });

  describe('insertCard', function() {
    it('should insert given cards to player hand', function() {
      const player = new Player('Harshith');
      player.insertCard({ suit: 'Clubs', rank: '2' });
      assert.deepEqual(player.hand,[{ suit: 'Clubs', rank: '2' }]);
      player.insertCard({ suit: 'Hearts', rank: 'Ace' });
      assert.deepEqual(player.hand, [{ suit: 'Clubs', rank: '2' }, { suit: 'Hearts', rank: 'Ace' }]);
    });
  });
});