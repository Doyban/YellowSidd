var YellowSidd = YellowSidd || {};

YellowSidd.Gems = function (game_state, name, position, properties) {
  "use strict";
  YellowSidd.Prefab.call(this, game_state, name, position, properties); // Extend Prefab class.

  this.visible = false; // Make this prefab invisible.

  this.menu_items = properties.menu_items; // List of menu items.

  this.swipe = this.game.input.activePointer; // Allow player to navigate by swiping.

  // Add sounds.
  this.error_sound = this.game.add.audio('error');
  this.upgrade_sound = this.game.add.audio('upgrade');

  this.exitButton = this.game.add.button(this.game.width * 0.89, this.game.height * 0.012, 'exit', this.startExit, this);
  this.gems5Button = this.game.add.button(this.game.width * 0.0001, this.game.height * 0.2155, 'gems5', this.startPaymentGems5, this);
  this.gems20Button = this.game.add.button(this.game.width * 0.4001, this.game.height * 0.2155, 'gems20', this.startPaymentGems20, this);
  this.gems50Button = this.game.add.button(this.game.width * 0.8001, this.game.height * 0.2155, 'gems50', this.startPaymentGems50, this);
  this.gems100Button = this.game.add.button(this.game.width * 0.2, this.game.height * 0.605, 'gems100', this.startPaymentGems100, this);
  this.gems200Button = this.game.add.button(this.game.width * 0.6, this.game.height * 0.605, 'gems200', this.startPaymentGems200, this);

  // Prepare products, on iOS they have to be preloaded upfront to work properly.
  store.register({
    id:    "com.doyban.yellowsidd.gems5",
    alias: "Gems 5",
    type:  store.CONSUMABLE
  });
  store.register({
    id:    "com.doyban.yellowsidd.gems20",
    alias: "Gems 20",
    type:  store.CONSUMABLE
  });
  store.register({
    id:    "com.doyban.yellowsidd.gems50",
    alias: "Gems 50",
    type:  store.CONSUMABLE
  });
  store.register({
    id:    "com.doyban.yellowsidd.gems100",
    alias: "Gems 100",
    type:  store.CONSUMABLE
  });
  store.register({
    id:    "com.doyban.yellowsidd.gems200",
    alias: "Gems 200",
    type:  store.CONSUMABLE
  });

  store.verbosity = store.INFO; // Set up high verbosity level in the console.
};

// Set up constructor.
YellowSidd.Gems.prototype = Object.create(YellowSidd.Prefab.prototype);
YellowSidd.Gems.prototype.constructor = YellowSidd.Gems;

YellowSidd.Gems.prototype.startExit = function () {
  'use strict';
  this.menu_items[0].select(); // Select first item.
};

YellowSidd.Gems.prototype.startPaymentGems5 = function () {
  'use strict';
  var that = this;

  store.order("com.doyban.yellowsidd.gems5"); // Initialize purchase.

  // Handle approved purchase.
  store.when("com.doyban.yellowsidd.gems5").approved(function (order) {
    // Add extra gems.
    localStorage.gems = parseInt(localStorage.gems) + 5; // Add 5 gems.
    that.upgrade_sound.play(); // Play upgrade sound.
    that.menu_items[1].select(); // Select second item.

    order.finish(); // Finish purchase.
  });

  store.refresh(); // Refresh the store to start everything.
};

YellowSidd.Gems.prototype.startPaymentGems20 = function () {
  'use strict';
  var that = this;

  store.order("com.doyban.yellowsidd.gems20"); // Initialize purchase.

  // Handle approved purchase.
  store.when("com.doyban.yellowsidd.gems20").approved(function (order) {
    // Add extra gems.
    localStorage.gems = parseInt(localStorage.gems) + 20; // Add 20 gems.
    that.upgrade_sound.play(); // Play upgrade sound.
    that.menu_items[2].select(); // Select third item.

    order.finish(); // Finish purchase.
  });

  store.refresh(); // Refresh the store to start everything.
};

YellowSidd.Gems.prototype.startPaymentGems50 = function () {
  'use strict';
  var that = this;

  store.order("com.doyban.yellowsidd.gems50"); // Initialize purchase.

  // Handle approved purchase.
  store.when("com.doyban.yellowsidd.gems50").approved(function (order) {
    // Add extra gems.
    localStorage.gems = parseInt(localStorage.gems) + 50; // Add 20 gems.
    that.upgrade_sound.play(); // Play upgrade sound.
    that.menu_items[3].select(); // Select fourth item.

    order.finish(); // Finish purchase.
  });

  store.refresh(); // Refresh the store to start everything.
};

YellowSidd.Gems.prototype.startPaymentGems100 = function () {
  'use strict';
  var that = this;

  store.order("com.doyban.yellowsidd.gems100"); // Initialize purchase.

  // Handle approved purchase.
  store.when("com.doyban.yellowsidd.gems100").approved(function (order) {
    // Add extra gems.
    localStorage.gems = parseInt(localStorage.gems) + 100; // Add 20 gems.
    that.upgrade_sound.play(); // Play upgrade sound.
    that.menu_items[4].select(); // Select fifth item.

    order.finish(); // Finish purchase.
  });

  store.refresh(); // Refresh the store to start everything.
};

YellowSidd.Gems.prototype.startPaymentGems200 = function () {
  'use strict';
  var that = this;

  store.order("com.doyban.yellowsidd.gems200"); // Initialize purchase.

  // Handle approved purchase.
  store.when("com.doyban.yellowsidd.gems200").approved(function (order) {
    // Add extra gems.
    localStorage.gems = parseInt(localStorage.gems) + 200; // Add 20 gems.
    that.upgrade_sound.play(); // Play upgrade sound.
    that.menu_items[5].select(); // Select sixth item.

    order.finish(); // Finish purchase.
  });

  store.refresh(); // Refresh the store to start everything.
};
