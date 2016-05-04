/**
 * A function library that handles the rules of the game.
 *
 *
 */

;(function(){
  var g = window.game = window.game == undefined ? { } : window.game;
  var r = g.rules = { }
  
  // Tell the view how many columns and rows our game needs
  r.columnsRequested = 6;
  r.rowsRequested = 2;
  
  // Define the decks used in this ruleset.
  // (Maps to the model.decks array)
  r.DECKS = { };
  r.DECKS.COL1 = 0;
  r.DECKS.COL2 = 1;
  r.DECKS.COL3 = 2;
  r.DECKS.COL4 = 3;
  r.DECKS.COL5 = 4;
  r.DECKS.COL6 = 5;
  r.DECKS.RESERVE = 6;
  r.DECKS.HAND = 7;
  r.DECKS.DISCARD = 8;
  
  r.requestZones = function(func) {
    
    // func takes a name, starting column and row, and size
    // (1 BASED)
    func('tableau', 1, 1, 6, 1);  // entire top row
    func('reserve', 1, 2, 1, 1);  // bottom left
    func('waste', 2, 2, 1, 1);    // next to reserve
    func('hand', 6, 2, 1, 1);     // bottom right
    
    
  };

  // Get the model object
  var m = game.model;

  /**
   * Hook into the model callbacks.
   */
  m.dealCallback = function(dealer, model) {

    // Fill and shuffle a new hand.
    // Take 5 cards for the reserve.
    // Take 23 cards for the top echelon (becomes a new deck)
    // Add the joker to the top echelon and shuffle this deck.
    // Create six columns of four cards from the top echelon.
    // From the remaining deck, add four cards to each of the six columns.
    // Turn the top card from each column face up.
    
    var hand = dealer.new();
    hand.fill();
    hand.shuffle();

    // top echelon
    var topEch = hand.take(23);
    topEch.add(hand.card(0, 'joker'));
    topEch.shuffle();

    // six columns
    for (var i = r.DECKS.COL1; i <= r.DECKS.COL6; i++) {
      model.piles[i] = topEch.take(4);
    };
    
    // remaining deck goes to lower echelon
    for (var i = r.DECKS.COL1; i <= r.DECKS.COL6; i++) {
      model.piles[i].add(hand.take(4));
    };
    
    // turn top cards
    for (var i = r.DECKS.COL1; i <= r.DECKS.COL6; i++) {
      model.piles[i].get().up = true;
    };
    
    // reserve
    model.reserve = hand.take(5);
    
    // new waste pile
    model.waste = dealer.new();
    
    model.hand = dealer.new();

  };
    
})();
