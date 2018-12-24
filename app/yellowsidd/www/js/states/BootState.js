var YellowSidd = YellowSidd || {};

YellowSidd.BootState = function () {
  "use strict";
  Phaser.State.call(this); // Extend Phaser.State class.
};

YellowSidd.BootState.prototype = Object.create(Phaser.State.prototype);
YellowSidd.BootState.prototype.constructor = YellowSidd.BootState;

YellowSidd.BootState.prototype.init = function (level_file, next_state) {
  "use strict";
  this.level_file = level_file; // Init level file.
  this.next_state = next_state; // Init next state.
};

YellowSidd.BootState.prototype.preload = function () {
  "use strict";
  this.load.text('level1', this.level_file);  // Preload file with level.
};

YellowSidd.BootState.prototype.create = function () {
  "use strict";
  // Create and parse level text and data.
  var level_text, level_data;
  level_text = this.game.cache.getText('level1');
  level_data = JSON.parse(level_text);

  this.game.state.start('LoadingState', true, false, level_data, this.next_state); // Start LoadingState state.
};