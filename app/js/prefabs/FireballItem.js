var YellowSidd = YellowSidd || {};

YellowSidd.FireballItem = function (game_state, position, properties) {
  "use strict";
  YellowSidd.Item.call(this, game_state, position, properties);
};

YellowSidd.FireballItem.prototype = Object.create(YellowSidd.Item.prototype);
YellowSidd.FireballItem.prototype.constructor = YellowSidd.FireballItem;

YellowSidd.FireballItem.prototype.collect_item = function (item, player) {
  "use strict";
  YellowSidd.Item.prototype.collect_item.call(this);
  player.shooting = true; // Set shooting variable in the Player prefab to true.
};