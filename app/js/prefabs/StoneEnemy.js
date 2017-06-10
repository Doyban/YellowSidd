var YellowSidd = YellowSidd || {};

YellowSidd.StoneEnemy = function (game_state, position, properties) {
  "use strict";
  YellowSidd.Prefab.call(this, game_state, position, properties);

  this.game_state.game.physics.arcade.enable(this);
  this.body.allowGravity = false;

  this.anchor.setTo(0.5);
};

YellowSidd.StoneEnemy.prototype = Object.create(YellowSidd.Prefab.prototype);
YellowSidd.StoneEnemy.prototype.constructor = YellowSidd.StoneEnemy;

YellowSidd.StoneEnemy.prototype.update = function () {
  "use strict";
  this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);

  // If the player is below then the enemy will fall after some time.
  if (this.check_player()) {
    this.fall();
  }
};

YellowSidd.StoneEnemy.prototype.check_player = function () {
  "use strict";
  var player;
  player = this.game_state.prefabs.player;

  return (player.x > this.left && player.x < this.right && player.y > this.bottom); // Check if player is right below the enemy.
};

YellowSidd.StoneEnemy.prototype.fall = function () {
  "use strict";
  this.body.allowGravity = true; // Start falling.
};