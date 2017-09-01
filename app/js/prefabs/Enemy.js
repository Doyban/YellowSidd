var YellowSidd = YellowSidd || {};

YellowSidd.Enemy = function (game_state, name, position, properties) {
  "use strict";
  YellowSidd.Prefab.call(this, game_state, name, position, properties);

  // Set initial velocity.
  this.walking_speed = +properties.walking_speed;
  this.walking_distance = +properties.walking_distance;

  this.score = +properties.score; // Add a score property.

  // Save previous x to keep track of walked distance.
  this.previous_x = this.x;

  this.game_state.game.physics.arcade.enable(this);
  this.body.velocity.x = properties.direction * this.walking_speed;

  this.scale.setTo(-properties.direction, 1); // Set initial scale.

  this.anchor.setTo(0.5);
};

YellowSidd.Enemy.prototype = Object.create(YellowSidd.Prefab.prototype);
YellowSidd.Enemy.prototype.constructor = YellowSidd.Enemy;

YellowSidd.Enemy.prototype.update = function () {
  "use strict";
  this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);

  // Change the direction if walked the maximum distance.
  if (Math.abs(this.x - this.previous_x) >= this.walking_distance) {
    this.body.velocity.x *= -1;
    this.previous_x = this.x;
    this.scale.setTo(-this.scale.x, 1);
  }
};

YellowSidd.Enemy.prototype.switch_direction = function () {
  "use strict";
  // Switch x direction.
  this.body.velocity.x *= -1;
  this.previous_x = this.x;
  this.scale.setTo(-this.scale.x, 1);
};