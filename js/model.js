/**
 * Handles the game data and glues the rules logic to this data.
 *
 */

;(function(){
  var g = window.game = window.game == undefined ? { } : window.game;
  var model = g.model = { }

  /**
   * Callback functions that the game rules can hook into
   * for when feedback is needed when performing an action.
   */

  /**
   * When a new game is dealt.
   */
  model.dealCallback = function(dealer, cards) {
    var hand = dealer.new();
    hand.fill();
    cards.hand = hand;
  };

  model.deal = function(dealFunc) {

    model.cards = { };

    // Call the rules deal function
    dealFunc(game.deck, model.cards);

    // Determine if the cards are in one pile (stack), or an array of piles (ladder)
    Object.keys(model.cards).forEach(function(pileName) {
      
      var pile = model.cards[pileName];
      var isStack = pile.cards;
      var isLadder = !isStack && pile.length > 0;
      
      // Store the zone card state
      pile.isStack = isStack;
      pile.isLadder = isLadder;

    });
    
  };
  
})();
