var YellowSidd = YellowSidd || {};

YellowSidd.BootState = function () {
  "use strict";
  Phaser.State.call(this);
};

YellowSidd.prototype = Object.create(Phaser.State.prototype);
YellowSidd.prototype.constructor = YellowSidd.BootState;

YellowSidd.BootState.prototype.init = function (level_file) {
  "use strict";
  this.level_file = level_file; // Init level file.
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

  this.game.state.start('LoadingState', true, false, level_data); // Start LoadingState state.
};