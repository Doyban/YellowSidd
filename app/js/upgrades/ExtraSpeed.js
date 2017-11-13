var YellowSidd = YellowSidd || {};

YellowSidd.ExtraSpeed = function (game_state, properties) {
  "use strict";
  YellowSidd.Upgrade.call(this, game_state); // Extend Upgrade class.
  this.speed_plus_one_once = properties.speed_plus_one_once; // Set up if add heart plus one once.
  this.speed_plus_one_infinite = properties.speed_plus_one_infinite; // Set up if add heart plus one infinite.
};

// Set up constructor.
YellowSidd.ExtraSpeed.prototype = Object.create(YellowSidd.Upgrade.prototype);
YellowSidd.ExtraSpeed.prototype.constructor = YellowSidd.ExtraSpeed;

YellowSidd.ExtraSpeed.prototype.apply = function () {
  "use strict";
  // Add 1 live once or infinite according to chosen heart.
  this.game_state.prefabs.lives.lives += this.speed_plus_one_once + this.speed_plus_one_infinite;
  this.game_state.prefabs.lives.create_lives(this.speed_plus_one_once + this.speed_plus_one_infinite); // TODO: Increase speed
};