var YellowSidd = YellowSidd || {};

YellowSidd.JSONLevelState = function () {
  "use strict";
  Phaser.State.call(this); // Extend Phaser.State class.

  // Set constructors of prefabs.
  this.prefab_classes = {

  };
};

YellowSidd.JSONLevelState.prototype = Object.create(Phaser.State.prototype);
YellowSidd.JSONLevelState.prototype.constructor = YellowSidd.JSONLevelState;

YellowSidd.JSONLevelState.prototype.init = function (level_data) {
  "use strict";
  this.level_data = level_data; // Save level data.

  // Set up scale.
  this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  this.scale.pageAlignHorizontally = true;
  this.scale.pageAlignVertically = true;
};

YellowSidd.JSONLevelState.prototype.create = function () {
  "use strict";
  var group_name, prefab_name;

  // Create groups.
  this.groups = {};
  this.level_data.groups.forEach(function (group_name) {
    this.groups[group_name] = this.game.add.group();
  }, this);

  // Create prefabs.
  this.prefabs = {};
  for (prefab_name in this.level_data.prefabs) {
    if (this.level_data.prefabs.hasOwnProperty(prefab_name)) {
      this.create_prefab(prefab_name, this.level_data.prefabs[prefab_name]); // Create prefab.
    }
  }
};

YellowSidd.JSONLevelState.prototype.create_prefab = function (prefab_name, prefab_data) {
  "use strict";
  var prefab_position, prefab;
  // Create object according to its type.
  if (this.prefab_classes.hasOwnProperty(prefab_data.type)) {
    // For percentage value of position.
    if (prefab_data.position.x > 0 && prefab_data.position.x <= 1) {
      prefab_position = new Phaser.Point(prefab_data.position.x * this.game.width, prefab_data.position.y * this.game.height); // Set position relatively.
    }
    // For absolute (pixels) value of position.
    else {
      prefab_position = prefab_data.position; // Set position absolutely, it will be the position of prefabs data.
    }
    prefab = new this.prefab_classes[prefab_data.type](this, prefab_name, prefab_position, prefab_data.properties);
  }
  return prefab;
};