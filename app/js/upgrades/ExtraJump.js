var YellowSidd = YellowSidd || {};

YellowSidd.ExtraJump = function (game_state, properties) {
  "use strict";
  YellowSidd.Upgrade.call(this, game_state); // Extend Upgrade class.
  this.jump_plus_one_once = properties.jump_plus_one_once; // Set up if add heart plus one once.
  this.jump_plus_one_infinite = properties.jump_plus_one_infinite; // Set up if add heart plus one infinite. TODO: LocalStorage for infinite

  alert(this.heart_plus_one_once);
};

// Set up constructor.
YellowSidd.ExtraJump.prototype = Object.create(YellowSidd.Upgrade.prototype);
YellowSidd.ExtraJump.prototype.constructor = YellowSidd.ExtraJump;

YellowSidd.ExtraJump.prototype.apply = function () {
  "use strict";
  // Add 1 live once or infinite according to chosen heart.
  this.game_state.prefabs.lives.lives += this.jump_plus_one_once + this.jump_plus_one_infinite;
  this.game_state.prefabs.lives.create_lives(this.jump_plus_one_once + this.jump_plus_one_infinite); // TODO: Increase jump
};