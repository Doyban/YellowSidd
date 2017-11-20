var YellowSidd = YellowSidd || {};

YellowSidd.ExtraSpeed = function (game_state, properties) {
  "use strict";
  YellowSidd.Upgrade.call(this, game_state); // Extend Upgrade class.
  localStorage.speed_plus_one_once = +properties.speed_plus_one_once; // Set up if add heart plus one once.
  localStorage.speed_plus_one_infinite = +properties.speed_plus_one_infinite; // Set up if add heart plus one infinite.
};

// Set up constructor.
YellowSidd.ExtraSpeed.prototype = Object.create(YellowSidd.Upgrade.prototype);
YellowSidd.ExtraSpeed.prototype.constructor = YellowSidd.ExtraSpeed;

YellowSidd.ExtraSpeed.prototype.apply = function () {
  "use strict";
  // Upgrade here works just for 1 time usage, that's why applying is in Player class.
};