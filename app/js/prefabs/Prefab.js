var YellowSidd = YellowSidd || {};

// All prefabs in game can extend this class and add new functionalities.
YellowSidd.Prefab = function (game_state, position, properties) {
  "use strict";
  Phaser.Sprite.call(this, game_state.game, position.x, position.y, properties.texture); // Extend Phaser.Sprite class.

  this.game_state = game_state; // Save game state.

  this.name = name; // Save game state name.

  this.game_state.groups[properties.group].add(this); // Add itself to the groups.
};

YellowSidd.Prefab.prototype = Object.create(Phaser.Sprite.prototype);
YellowSidd.Prefab.prototype.constructor = YellowSidd.Prefab;