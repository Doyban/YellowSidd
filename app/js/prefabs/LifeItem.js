var YellowSidd = YellowSidd || {};

YellowSidd.LifeItem = function (game_state, name, position, properties) {
  "use strict";
  YellowSidd.Item.call(this, game_state, name, position, properties);

  this.get_life_sound = this.game.add.audio('get_life'); // Add sound.
};

YellowSidd.LifeItem.prototype = Object.create(YellowSidd.Item.prototype);
YellowSidd.LifeItem.prototype.constructor = YellowSidd.LifeItem;

YellowSidd.LifeItem.prototype.collect_item = function (item, player) {
  "use strict";
  YellowSidd.Item.prototype.collect_item.call(this);
  player.lives += 1; // Increase the player number of lives after calling the original "collect_item" method.
  this.get_life_sound.play(); // Play get life sound.
};