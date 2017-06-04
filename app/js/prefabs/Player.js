var YellowSidd = YellowSidd || {};

YellowSidd.Player = function (game_state, position, properties) {
  "use strict";

  YellowSidd.Prefab.call(this, game_state, position, properties);

  // Player properties: walking speed, jumping speed and bouncing.
  this.walking_speed = +properties.walking_speed;
  this.jumping_speed = +properties.jumping_speed;
  this.bouncing = +properties.bouncing;

  this.game_state.game.physics.arcade.enable(this);
  this.body.collideWorldBounds = true;

  this.animations.add('walking', [0, 1, 2, 1], 6, true); // Player walking animation.

  this.frame = 3;

  this.anchor.setTo(0.5);

  this.cursors = this.game_state.game.input.keyboard.createCursorKeys(); // Enable cursors.
};

YellowSidd.Player.prototype = Object.create(YellowSidd.Prefab.prototype);
YellowSidd.Player.prototype.constructor = YellowSidd.Player;

YellowSidd.Player.prototype.update = function () {
  "use strict";
  // Check player collision.
  this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision); // Layers collisions.
  this.game_state.game.physics.arcade.collide(this, this.game_state.groups.enemies, this.hit_enemy, null, this); // Enemies collisions.

  if (this.cursors.right.isDown && this.body.velocity.x >= 0) {
    // Move right.
    this.body.velocity.x = this.walking_speed;
    this.animations.play('walking');
    this.scale.setTo(-1, 1);
  } else if (this.cursors.left.isDown && this.body.velocity.x <= 0) {
    // Move left
    this.body.velocity.x = -this.walking_speed;
    this.animations.play('walking');
    this.scale.setTo(1, 1);
  } else {
    // Stop.
    this.body.velocity.x = 0;
    this.animations.stop();
    this.frame = 3;
  }

  // Jump only if touching a tile.
  if (this.cursors.up.isDown && this.body.blocked.down) {
    this.body.velocity.y = -this.jumping_speed;
  }

  // Dies if touches the end of the screen.
  if (this.bottom >= this.game_state.game.world.height) {
    this.game_state.restart_level();
  }
};

YellowSidd.Player.prototype.hit_enemy = function (player, enemy) {
  "use strict";
  // If the player is above the enemy, the enemy is killed, otherwise the player dies.
  if (enemy.body.touching.up) {
    enemy.kill();
    player.y -= this.bouncing;
  } else {
    this.game_state.restart_level();
  }
};