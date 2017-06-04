var YellowSidd = YellowSidd;

YellowSidd.TiledState = function () {
  "use strict";
  Phaser.State.call(this);
};

YellowSidd.TiledState.prototype = Object.create(Phaser.State.prototype);
YellowSidd.TiledState.prototype.constructor = YellowSidd.TiledState;

YellowSidd.TiledState.prototype.init = function (level_data) {
  "use strict";
  this.level_data = level_data;

  this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  this.scale.pageAlignHorizontally = true;
  this.scale.pageAlignVertically = true;

  // Start physics system.
  this.game.physics.startSystem(Phaser.Physics.ARCADE);
  this.game.physics.arcade.gravity.y = 1000;

  // Create map and set tileset.
  this.map = this.game.add.tilemap(level_data.map.key);
  this.map.addTilesetImage(this.map.tilesets[0].name, level_data.map.tileset); // this.map.tilesets are tilesets used in Tiled.
};

YellowSidd.TiledState.prototype.create = function () {
  "use strict";
  var group_name, object_layer, collision_tiles;

  // Create map layers.
  this.layers = {};
  this.map.layers.forEach(function (layer) {
    this.layers[layer.name] = this.map.createLayer(layer.name);
    if (layer.properties.collision) { // Collision layer.
      collision_tiles = [];
      layer.data.forEach(function (data_row) { // Find tiles used in the layer.
        data_row.forEach(function (tile) {
          // Check if it is a valid tile index and is not already in the list.
          if (tile.index > 0 && collision_tiles.indexOf(tile.index) === -1) {
            collision_tiles.push(tile.index);
          }
        }, this);
      }, this);
      this.map.setCollision(collision_tiles, true, layer.name); // Set the collision for all tiles with collision.
    }
  }, this);

  // Resize the world to be the size of the current layer.
  this.layers[this.map.layer.name].resizeWorld();

  // Create groups.
  // Two important things:
  // 1) The order of the groups define the order they are drawn on the screen.
  // 2) Groups must be created after layers, otherwise the layers would be drawn above them.
  this.groups = {};
  this.level_data.groups.forEach(function (group_name) {
    this.groups[group_name] = this.game.add.group();
  }, this);

  this.prefabs = {};

  // Create game objects.
  for (object_layer in this.map.objects) {
    if (this.map.objects.hasOwnProperty(object_layer)) {
      // Create layer objects.
      this.map.objects[object_layer].forEach(this.create_object, this);
    }
  }
};

YellowSidd.TiledState.prototype.create_object = function (object) {
  "use strict";
  var position, prefab;

  // Tiled coordinates starts in the bottom left corner that is why here is deduction from "y".
  position = {"x": object.x + (this.map.tileHeight / 2), "y": object.y - (this.map.tileHeight / 2)}; // Set position.

  // Create object according to its type.
  switch (object.type) {
    case 'player':
      prefab = new YellowSidd.Player(this, position, object.properties);
      break;
    case 'ground_enemy':
      prefab = new YellowSidd.Enemy(this, position, object.properties);
      break;
    case 'flying_enemy':
      prefab = new YellowSidd.FlyingEnemy(this, position, object.properties);
      break;
    case 'goal':
      prefab = new YellowSidd.Goal(this, position, object.properties);
      break;
  }
  this.prefabs[object.name] = prefab;
};

YellowSidd.TiledState.prototype.restart_level = function () {
  "use strict";
  this.game.state.restart(true, false, this.level_data); // Restart TiledState state.
};
