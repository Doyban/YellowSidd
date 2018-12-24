var YellowSidd = YellowSidd || {};

YellowSidd.ExtraHeart = function (game_state, properties) {
  "use strict";
  YellowSidd.Upgrade.call(this, game_state); // Extend Upgrade class.
  localStorage.heart_plus_one_once = +properties.heart_plus_one_once; // Set up if add heart plus one once.
  localStorage.heart_plus_one_infinite = +properties.heart_plus_one_infinite; // Set up if add heart plus one infinite.
};

// Set up constructor.
YellowSidd.ExtraHeart.prototype = Object.create(YellowSidd.Upgrade.prototype);
YellowSidd.ExtraHeart.prototype.constructor = YellowSidd.ExtraHeart;

YellowSidd.ExtraHeart.prototype.apply = function () {
  "use strict";
  // Upgrade here works just for 1 time usage, that's why applying is in Player class.
};