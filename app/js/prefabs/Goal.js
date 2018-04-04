var YellowSidd = YellowSidd || {};

YellowSidd.Goal = function (game_state, name, position, properties) {
  "use strict";
  YellowSidd.Prefab.call(this, game_state, name, position, properties);

  this.next_level = properties.next_level;

  this.game_state.game.physics.arcade.enable(this);

  this.anchor.setTo(0.5);

  this.reach_goal_sound = this.game.add.audio('reach_goal'); // Add sound.
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
  // Save the player lives and score before loading a new level, otherwise it will be restarted. For this, we will save this information in the browser localStorage when reaching the goal.
  localStorage.player_lives = this.game_state.prefabs.player.lives;
  localStorage.player_score = this.game_state.prefabs.player.score;

  // Play sound only if player left button sound as on mode.
  if (PLAY_SOUND) {
    this.reach_goal_sound.play(); // Play reach goal sound.
  }

  this.game_state.state.start('BootState', true, false, this.next_level, 'GameState'); // Start the next level.
};