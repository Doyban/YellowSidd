var YellowSidd = YellowSidd || {};

YellowSidd.FlyingEnemy = function (game_state, name, position, properties) {
  "use strict";
  YellowSidd.Enemy.call(this, game_state, name, position, properties);

  // Flying enemy are not affected by gravity.
  this.body.allowGravity = false;

  this.animations.add('flying', [0, 1], 8, true);
  this.animations.play('flying');
};

YellowSidd.FlyingEnemy.prototype = Object.create(YellowSidd.Enemy.prototype);
YellowSidd.FlyingEnemy.prototype.constructor = YellowSidd.FlyingEnemy;