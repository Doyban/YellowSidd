var YellowSidd = YellowSidd || {};

YellowSidd.ExtraJump = function (game_state, properties) {
  "use strict";
  YellowSidd.Upgrade.call(this, game_state); // Extend Upgrade class.
  localStorage.jump_plus_one_once = +properties.jump_plus_one_once; // Set up if add heart plus one once.
  localStorage.jump_plus_one_infinite = +properties.jump_plus_one_infinite; // Set up if add heart plus one infinite.
};

// Set up constructor.
YellowSidd.ExtraJump.prototype = Object.create(YellowSidd.Upgrade.prototype);
YellowSidd.ExtraJump.prototype.constructor = YellowSidd.ExtraJump;

YellowSidd.ExtraJump.prototype.apply = function () {
  "use strict";
  // Upgrade here works just for 1 time usage, that's why applying is in Player class.
};