/**
  This file is part of Penny Farthing.

  Penny Farthing is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  Penny Farthing is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with Penny Farthing.  If not, see <http://www.gnu.org/licenses/>.
  */

/**
 * Provides methods to update UI elements on the page.
 *
 */

;(function(){
  var g = window.game = window.game == undefined ? { } : window.game;
  var ui = g.ui = { }

  /**
   * Set up the UI
   */
  document.addEventListener("DOMContentLoaded", function(event) { 
    game.ui.buildGamesMenu();

    // Replay a known game number
    ui.bindToEvent('game-ui-replay', 'click', ui.replayGame);

    // Play a new (random) game
    ui.bindToEvent('game-ui-new', 'click', ui.playNewGame);

    // select a different rule set
    ui.bindToEvent('all-games-list', 'change', ui.playNewRules);

    ui.startDefaultGame();
  });


  /** 
   * Bind a function to an element event.
   */
  ui.bindToEvent = function(elementId, event, callback) {
    var el = document.getElementById(elementId);
    el.addEventListener(event, callback);
  };

  /**
   * Start a default game.
   */
  ui.startDefaultGame = function() {
    game.controller.toggleAnimations(false);
    if (!game.controller.gameName) {
      var el = document.getElementById('all-games-list');
      for(var i = 0; i < el.options.length; i++){
        if(el.options[i].value == 'klondike'){
          el.selectedIndex = i;
          break;
        }
      }
      game.ui.initialize('klondike');
    }
  };

  /**
   * Replay a game.
   */
  ui.replayGame = function() {
    ui.scrollToView();
    var el = document.getElementById('game-number');
    ui.initialize(null, parseInt(el.value));
  };

  /**
   * Play new game.
   */
  ui.playNewGame = function() {
    ui.scrollToView();
    ui.initialize();
  };

  /**
   * Play new ruleset
   */
  ui.playNewRules = function() {
    var el = document.getElementById('all-games-list');
    game.ui.initialize(el.options[el.selectedIndex].value);
  };

  /**
   * Scroll the playfield into view.
   */
  ui.scrollToView = function() {
    document.getElementById('playfield').scrollIntoView();
  };

  /**
   * Start a new game, or restart the current game if null name is given.
   * A specific seed can be given too, or one will be generated otherwise.
   */
  ui.initialize = function(gamename, seed) {
    // Initialize a new game with the given seed
    var el = document.getElementById('playfield');
    game.controller.initialize(el, gamename, seed);

    // Display the seed in the ui
    game.ui.displayGameNumber(game.controller.seed);
  };

  /**
   * Build a menu from all game objects.
   */
  ui.buildGamesMenu = function() {
    var gameNames = Object.keys(game.games);
    var el = document.getElementById('all-games-list');
    gameNames.forEach(function(name) {
      if (name != 'template') {
        var option = document.createElement('option');
        var ucfname = name.split(' ').map ( ([h, ...t]) => h.toUpperCase() + t.join('').toLowerCase() );
        option.innerHTML = ucfname;
        option.setAttribute("value", name);
        el.appendChild(option);
      }
    });
  }

  /**
   * Display the game number.
   */
  ui.displayGameNumber = function(n) {
    var el = document.getElementById('game-number');
    if (el) el.value = n;
  };

})();
