var YellowSidd = YellowSidd || {};

YellowSidd.Goal = function (game_state, position, properties) {
  "use strict";
  YellowSidd.Prefab.call(this, game_state, position, properties);

  this.next_level = properties.next_level;

  this.game_state.game.physics.arcade.enable(this);

  this.anchor.setTo(0.5);
};

YellowSidd.Goal.prototype = Object.create(YellowSidd.Prefab.prototype);
YellowSidd.Goal.prototype.constructor = YellowSidd.Goal;

YellowSidd.Goal.prototype.update = function () {
  "use strict";
  this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);
  this.game_state.game.physics.arcade.overlap(this, this.game_state.groups.players, this.reach_goal, null, this); // Overlap the player.
};

YellowSidd.Goal.prototype.reach_goal = function () {
  "use strict";
  this.game_state.state.start('BootState', true, false, this.next_level); // Start the next level.
};