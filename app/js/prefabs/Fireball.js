var YellowSidd = YellowSidd || {};

YellowSidd.Fireball = function (game_state, name, position, properties) {
  "use strict";
  YellowSidd.Prefab.call(this, game_state, name, position, properties);

  this.direction = properties.direction;
  this.speed = +properties.speed;

  this.name = name;

  // Create physical body.
  this.game_state.game.physics.arcade.enable(this);
  this.body.allowGravity = false;

  // Velocity is constant, but defined by direction.
  if (this.direction === "LEFT") {
    this.body.velocity.x = -this.speed;
  } else {
    this.body.velocity.x = this.speed;
  }

  this.anchor.setTo(0.5);
  this.scale.setTo(0.75); // Fireball uses the same asset as FireballItem, so we make it a little smaller.
};

YellowSidd.Fireball.prototype = Object.create(YellowSidd.Prefab.prototype);
YellowSidd.Fireball.prototype.constructor = YellowSidd.Fireball;

YellowSidd.Fireball.prototype.update = function () {
  "use strict";
  // The fireball is destroyed if in contact with anything else.
  this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision, this.kill, null, this);
  this.game_state.game.physics.arcade.overlap(this, this.game_state.layers.invincible_enemies, this.kill, null, this);
};