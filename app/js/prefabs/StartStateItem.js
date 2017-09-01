var YellowSidd = YellowSidd || {};

YellowSidd.StartStateItem = function (game_state, name, position, properties) {
  "use strict";
  YellowSidd.MenuItem.call(this, game_state, name, position, properties); // Extend MenuItem class.

  this.level_file = properties.level_file; // Set up level file.
  this.state_name = properties.state_name; // Set up state name.
};

YellowSidd.StartStateItem.prototype = Object.create(YellowSidd.MenuItem.prototype);
YellowSidd.StartStateItem.prototype.constructor = YellowSidd.StartStateItem;

YellowSidd.StartStateItem.prototype.select = function () {
  "use strict";
  this.game_state.state.start('BootState', true, false, this.level_file, this.state_name); // Start next State.
};