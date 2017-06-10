var YellowSidd = YellowSidd || {};

YellowSidd.LifeItem = function (game_state, position, properties) {
  "use strict";
  YellowSidd.Item.call(this, game_state, position, properties);
};

YellowSidd.LifeItem.prototype = Object.create(YellowSidd.Item.prototype);
YellowSidd.LifeItem.prototype.constructor = YellowSidd.LifeItem;

YellowSidd.LifeItem.prototype.collect_item = function (item, player) {
  "use strict";
  YellowSidd.Item.prototype.collect_item.call(this);
  player.lives += 1; // Increase the player number of lives after calling the original "collect_item" method.
};