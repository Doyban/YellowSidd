var YellowSidd = YellowSidd || {};

YellowSidd.GemsQuantity = function (game_state, name, position, properties) {
  "use strict";
  YellowSidd.TextPrefab.call(this, game_state, name, position, properties); // Extend TextPrefab class.
};

// Set up constructor.
YellowSidd.GemsQuantity.prototype = Object.create(YellowSidd.TextPrefab.prototype);
YellowSidd.GemsQuantity.prototype.constructor = YellowSidd.GemsQuantity;

YellowSidd.GemsQuantity.prototype.update = function () {
  "use strict";
  this.text = " " + localStorage.gems; // Show current gems of player.
};