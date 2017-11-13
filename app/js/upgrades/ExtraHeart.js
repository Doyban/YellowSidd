var YellowSidd = YellowSidd || {};

YellowSidd.ExtraHeart = function (game_state, properties) {
  "use strict";
  YellowSidd.Upgrade.call(this, game_state); // Extend Upgrade class.
  this.heart_plus_one_once = properties.heart_plus_one_once; // Set up if add heart plus one once.
  this.heart_plus_one_infinite = properties.heart_plus_one_infinite; // Set up if add heart plus one infinite.
};

// Set up constructor.
YellowSidd.ExtraHeart.prototype = Object.create(YellowSidd.Upgrade.prototype);
YellowSidd.ExtraHeart.prototype.constructor = YellowSidd.ExtraHeart;

YellowSidd.ExtraHeart.prototype.apply = function () {
  "use strict";
  // Add 1 live once or infinite according to chosen heart.
  this.game_state.prefabs.lives.lives += this.heart_plus_one_once + this.heart_plus_one_infinite;
  this.game_state.prefabs.lives.create_lives(this.heart_plus_one_once + this.heart_plus_one_infinite);
};