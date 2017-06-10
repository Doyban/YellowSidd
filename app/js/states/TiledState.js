var YellowSidd = YellowSidd;

YellowSidd.TiledState = function () {
  "use strict";
  Phaser.State.call(this);

  // Object that maps each prefab type to its constructor.
  this.prefab_classes = {
    "player": YellowSidd.Player.prototype.constructor,
    "ground_enemy": YellowSidd.GroundEnemy.prototype.constructor,
    "flying_enemy": YellowSidd.FlyingEnemy.prototype.constructor,
    "running_enemy": YellowSidd.RunningEnemy.prototype.constructor,
    "stone_enemy": YellowSidd.StoneEnemy.prototype.constructor,
    "goal": YellowSidd.Goal.prototype.constructor,
    "checkpoint": YellowSidd.Checkpoint.prototype.constructor,
    "coin": YellowSidd.Coin.prototype.constructor,
    "score": YellowSidd.Score.prototype.constructor,
    "lives": YellowSidd.Lives.prototype.constructor,
    "life_item": YellowSidd.LifeItem.prototype.constructor,
    "fireball_item": YellowSidd.FireballItem.prototype.constructor,
    "boss": YellowSidd.Boss.prototype.constructor
  }
};

YellowSidd.TiledState.prototype = Object.create(Phaser.State.prototype);
YellowSidd.TiledState.prototype.constructor = YellowSidd.TiledState;

YellowSidd.TiledState.prototype.init = function (level_data) {
  "use strict";
  var tileset_index;
  this.level_data = level_data;

  this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  this.scale.pageAlignHorizontally = true;
  this.scale.pageAlignVertically = true;

  // Start physics system.
  this.game.physics.startSystem(Phaser.Physics.ARCADE);
  this.game.physics.arcade.gravity.y = 1000;

  // Create map and set tileset.
  this.map = this.game.add.tilemap(level_data.map.key);
  tileset_index = 0;
  this.map.tilesets.forEach(function (tileset) {
    this.map.addTilesetImage(tileset.name, level_data.map.tilesets[tileset_index]);
    tileset_index += 1;
  }, this);
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

  this.init_hud(); // Init HUD.

  this.game.camera.follow(this.prefabs.player); // Camera will follow player position.
};

YellowSidd.TiledState.prototype.create_object = function (object) {
  "use strict";
  var position, prefab;

  // Tiled coordinates starts in the bottom left corner that is why here is deduction from "y".
  position = {"x": object.x + (this.map.tileHeight / 2), "y": object.y - (this.map.tileHeight / 2)}; // Set position.

  // Create object according to its type.
  if (this.prefab_classes.hasOwnProperty(object.type)) {
    prefab = new this.prefab_classes[object.type](this, position, object.properties); // Call the correct constructor using the type property from the map object. This is only possible because all prefabs use the same constructor.
  }
  this.prefabs[object.name] = prefab;
};

YellowSidd.TiledState.prototype.restart_level = function () {
  "use strict";
  // Restart the game only if the checkpoint was not reached.
  if (this.prefabs.checkpoint.checkpoint_reached) {
    // Respawn the player in the last reached checkpoint.
    this.prefabs.player.x = this.prefabs.checkpoint.x;
    this.prefabs.player.y = this.prefabs.checkpoint.y;
  } else {
    this.game.state.restart(true, false, this.level_data); // Restart TiledState state.
  }
};

YellowSidd.TiledState.prototype.game_over = function () {
  "use strict";
  localStorage.clear(); // Clear localStorage (lives, score).
  this.game.state.start('BootState', true, false, 'assets/levels/level1.json'); // Start first level.
};

// Create the HUD objects in fixed positions instead of loading it from the Tiled map. It has been done because sometimes the Phaser world scaling could mess with the HUD objects positions when reloading the screen or updating the lives. The same reason with lives prefab initial position.
YellowSidd.TiledState.prototype.init_hud = function () {
  "use strict";
  var score_position, score, lives_position, lives; // Variables to display in the HUD.

  // Display score in the HUD.
  score_position = new Phaser.Point(20, 20);
  score = new YellowSidd.Score(this, score_position, {'text': 'Score: 0', 'group': 'hud'});
  this.prefabs['score'] = score;

  // Display lives in the HUD.
  lives_position = new Phaser.Point(this.game.world.width * 0.65, 20);
  lives = new YellowSidd.Lives(this, lives_position, {'texture': 'player_spritesheet', 'group': 'hud', 'frame': 3, 'spacing': 16});
  this.prefabs['lives'] = lives;
};