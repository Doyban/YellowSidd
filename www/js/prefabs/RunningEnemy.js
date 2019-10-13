var YellowSidd = YellowSidd || {};

YellowSidd.RunningEnemy = function (game_state, name, position, properties) {
  "use strict";
  YellowSidd.GroundEnemy.call(this, game_state, name, position, properties);

  // Besides all the regular enemy properties, it will have a detection distance and a running speed.
  this.detection_distance = +properties.detection_distance;
  this.running_speed = +properties.running_speed;
};

YellowSidd.RunningEnemy.prototype = Object.create(YellowSidd.GroundEnemy.prototype);
YellowSidd.RunningEnemy.prototype.constructor = YellowSidd.RunningEnemy;

YellowSidd.RunningEnemy.prototype.update = function () {
  "use strict";
  var direction;
  this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);

  // Check if the player is inside the detection range.
  if (this.detect_player()) {
    // Player is inside detection range, run towards it (increase velocity).
    direction = (this.game_state.prefabs.player.x < this.x) ? -1 : 1;
    this.body.velocity.x = direction * this.running_speed; // Enemy changes its velocity to the running speed.
    this.scale.setTo(-direction, 1);
    this.previous_x = this.x;
  } else {
    // Player is outside detection range, act like a regular enemy.
    direction = (this.body.velocity.x < 0) ? -1 : 1;
    this.body.velocity.x = direction * this.walking_speed;
    this.scale.setTo(-direction, 1);
    YellowSidd.GroundEnemy.prototype.update.call(this);
  }
};

YellowSidd.RunningEnemy.prototype.detect_player = function () {
  "use strict";
  var distance_to_player;
  distance_to_player = Math.abs(this.x - this.game_state.prefabs.player.x); // To check if the player is inside the detection range, we calculate the distance between the player and enemy x positions.

  return (this.bottom === this.game_state.prefabs.player.bottom) && (distance_to_player <= this.detection_distance); // The player must be in the same ground y position, and inside the detection range.
};