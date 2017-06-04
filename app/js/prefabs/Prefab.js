var YellowSidd = YellowSidd || {};

YellowSidd.Prefab = function (game_state, position, properties) {
  "use strict";
  Phaser.Sprite.call(this, game_state.game, position.x, position.y, properties.texture);

  this.game_state = game_state;

  this.game_state.groups[properties.group].add(this);
};

YellowSidd.Prefab.prototype = Object.create(Phaser.Sprite.prototype);
YellowSidd.Prefab.prototype.constructor = YellowSidd.Prefab;