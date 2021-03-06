var YellowSidd = YellowSidd || {};

// TODO: Remove Boss and change it on something else.
YellowSidd.Boss = function (game_state, name, position, properties) {
  "use strict";
  YellowSidd.Prefab.call(this, game_state, name, position, properties);

  this.attack_rate = +properties.attack_rate;
  this.attack_speed = +properties.attack_speed;
  this.walking_speed = +properties.walking_speed;
  this.walking_distance = +properties.walking_distance;

  this.previous_x = this.x; // Saving previous x to keep track of walked distance.

  this.game_state.game.physics.arcade.enable(this);
  this.body.velocity.x = properties.direction * this.walking_speed;

  this.anchor.setTo(0.5);

  // Boss will be always attacking.
  this.attack_timer = this.game_state.game.time.create();
  this.attack_timer.loop(Phaser.Timer.SECOND / this.attack_rate, this.shoot, this);
  this.attack_timer.start();
};

YellowSidd.Boss.prototype = Object.create(YellowSidd.Prefab.prototype);
YellowSidd.Boss.prototype.constructor = YellowSidd.Boss;

YellowSidd.Boss.prototype.update = function () {
  "use strict";
  this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);

  // If walked the maximum distance, change the velocity, but not the scale. TODO: Change Boss to swipe while changin direction.
  if (Math.abs(this.x - this.previous_x) >= this.walking_distance) {
    this.body.velocity.x *= -1;
    this.previous_x = this.x;
  }
};

YellowSidd.Boss.prototype.shoot = function () {
  "use strict";
  // Works the same way player shoot, but using a different pool group.
  var fireball, fireball_position, fireball_properties, name;
  name = 'fireball';

  fireball = this.game_state.groups.enemy_fireballs.getFirstDead();
  fireball_position = new Phaser.Point(this.x, this.y);
  if (!fireball) {
    fireball_properties = {'texture': 'fireball_image', 'group': 'enemy_fireballs', 'direction': 'LEFT', 'speed': this.attack_speed};
    fireball = new YellowSidd.Fireball(this.game_state, name, fireball_position, fireball_properties);
  } else {
    fireball.reset(fireball_position.x, fireball_position.y);
    fireball.body.velocity.x = -this.attack_speed;
  }
};