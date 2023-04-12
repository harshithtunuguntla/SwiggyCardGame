const Match = require('./helperClasses/Match')

let match = new Match();
match.initMatchVariables();
match.createPlayers();
match.distributeCards();
match.createDiscardPile();
match.initPlayerToBegin();

match.play();
match.printGameResult();
