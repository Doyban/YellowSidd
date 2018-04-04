var YellowSidd = YellowSidd || {};

YellowSidd.MenuItem = function (game_state, name, position, properties) {
  "use strict";
  YellowSidd.Prefab.call(this, game_state, name, position, properties); // Extend Prefab class.

  this.anchor.setTo(0.5); // Center texture.
};

// Set up constructor.
YellowSidd.MenuItem.prototype = Object.create(YellowSidd.Prefab.prototype);
YellowSidd.MenuItem.prototype.constructor = YellowSidd.MenuItem;

YellowSidd.MenuItem.prototype.select = function () {
  "use strict";
  // The default item does nothing, it will be extended in different classes.
};