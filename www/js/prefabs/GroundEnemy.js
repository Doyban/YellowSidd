var YellowSidd = YellowSidd || {};

YellowSidd.GroundEnemy = function (game_state, name, position, properties) {
  "use strict";
  YellowSidd.Enemy.call(this, game_state, name, position, properties);

  this.animations.add('moving', [0, 1, 2], 2, true);
  this.animations.play('moving');
};

YellowSidd.GroundEnemy.prototype = Object.create(YellowSidd.Enemy.prototype);
YellowSidd.GroundEnemy.prototype.constructor = YellowSidd.GroundEnemy;

YellowSidd.GroundEnemy.prototype.update = function () {
  "use strict";
  YellowSidd.Enemy.prototype.update.call(this);

  if (this.body.blocked.down && !this.has_tile_to_walk()) {
    this.switch_direction(); // Switch moving direction.
  }
};

// Check if the next ground position is occupied by a tile and, if not so, switch the enemy direction.
YellowSidd.GroundEnemy.prototype.has_tile_to_walk = function () {
  "use strict";
  var direction, position_to_check, map, next_tile;
  direction = (this.body.velocity.x < 0) ? -1 : 1; // -1 if moving left, 1 if moving right.

  // Check if the next position has a tile.
  position_to_check = new Phaser.Point(this.x + (direction * this.game_state.map.tileWidth), this.bottom + 1); // To find this next ground position we have to calculate its x and y coordinates. The y coordinate is just the enemy bottom y plus 1, since that's the y coordinate immediately below the enemy. The x coordinate depends on the enemy direction. So, it will be the enemy x coordinate plus tile width, if the enemy is moving right, or minus tile width if the enemy is moving left.
  map = this.game_state.map;

  // getTileWorldXY returns the tile in a given position.
  next_tile = map.getTileWorldXY(position_to_check.x, position_to_check.y, map.tileWidth, map.tileHeight, "collision"); // Check if a position is occupied by a tile. If the methods returns a tile, we know the enemy is not the platform edge yet, so it can keep moving. If it returns null, the enemy must switch direction to avoid falling.
  return next_tile !== null;
};