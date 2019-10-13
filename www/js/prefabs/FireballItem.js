var YellowSidd = YellowSidd || {};

YellowSidd.FireballItem = function (game_state, name, position, properties) {
  "use strict";
  YellowSidd.Item.call(this, game_state, name, position, properties);

  this.get_fireball_sound = this.game.add.audio('get_fireball'); // Add sound.
};

YellowSidd.FireballItem.prototype = Object.create(YellowSidd.Item.prototype);
YellowSidd.FireballItem.prototype.constructor = YellowSidd.FireballItem;

YellowSidd.FireballItem.prototype.collect_item = function (item, player) {
  "use strict";
  YellowSidd.Item.prototype.collect_item.call(this);
  player.shooting = true; // Set shooting variable in the Player prefab to true.

  // Play sound only if player left button sound as on mode.
  if (PLAY_SOUND) {
    this.get_fireball_sound.play(); // Play get fireball sound.
  }
};