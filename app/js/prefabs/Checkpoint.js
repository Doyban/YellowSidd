var YellowSidd = YellowSidd || {};

YellowSidd.Checkpoint = function (game_state, name, position, properties) {
  "use strict";
  YellowSidd.Prefab.call(this, game_state, name, position, properties);

  this.checkpoint_reached = false;

  this.game_state.game.physics.arcade.enable(this);

  this.anchor.setTo(0.5);
};

YellowSidd.Checkpoint.prototype = Object.create(YellowSidd.Prefab.prototype);
YellowSidd.Checkpoint.prototype.constructor = YellowSidd.Checkpoint;

YellowSidd.Checkpoint.prototype.update = function () {
  "use strict";
  this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);
  this.game_state.game.physics.arcade.overlap(this, this.game_state.groups.players, this.reach_checkpoint, null, this); // Add a checkpoint that cheks for overlap with the player, and if that happens, set a checkpoint variable to true.
};

YellowSidd.Checkpoint.prototype.reach_checkpoint = function () {
  "use strict";
  this.checkpoint_reached = true; // Checkpoint was reached.
};