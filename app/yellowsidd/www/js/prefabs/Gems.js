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
   alert('gems 5');
  var that = this;

   store.verbosity = store.INFO;

  // Prepare product.
  store.register({
    id:    "gems5",
    alias: "Gems 5",
    type:  store.CONSUMABLE
  });

  // Purchase product.
  store.order("gems5");
  store.refresh();
  store.when("gems5").approved(function (order) {
    order.finish();
    store.refresh();

    // Add extra gems.
    localStorage.gems = parseInt(localStorage.gems) + 5; // Add 5 gems.
    that.upgrade_sound.play(); // Play upgrade sound.
    that.game.state.start("GemsState");
    that.menu_items[1].select(); // Select second item.
  });
};

YellowSidd.Gems.prototype.startPaymentGems20 = function () {
  'use strict';
   alert('gems 20');
  var that = this;

   store.verbosity = store.INFO;

  // Prepare product.
  store.register({
    id:    "gems20",
    alias: "Gems 20",
    type:  store.CONSUMABLE
  });

  // Purchase product.
  store.order("gems20");
  store.refresh();
  store.when("gems20").approved(function (order) {
    order.finish();
    store.refresh();

    // Add extra gems.
    localStorage.gems = parseInt(localStorage.gems) + 20; // Add 20 gems.
    that.upgrade_sound.play(); // Play upgrade sound.
    that.menu_items[2].select(); // Select third item.
  });
};

YellowSidd.Gems.prototype.startPaymentGems50 = function () {
  'use strict';
   alert('gems 50');
  var that = this;

   store.verbosity = store.INFO;

  // Prepare product.
  store.register({
    id:    "gems50",
    alias: "Gems 50",
    type:  store.CONSUMABLE
  });

  // Purchase product.
  store.order("gems50");
  store.refresh();
  store.when("gems50").approved(function (order) {
    order.finish();
    store.refresh();

    // Add extra gems.
    localStorage.gems = parseInt(localStorage.gems) + 50; // Add 50 gems.
    that.upgrade_sound.play(); // Play upgrade sound.
    that.menu_items[3].select(); // Select fourth item.
  });
};

YellowSidd.Gems.prototype.startPaymentGems100 = function () {
  'use strict';
   alert('gems 100');
  var that = this;

   store.verbosity = store.INFO;

  // Prepare product.
  store.register({
    id:    "gems100",
    alias: "Gems 100",
    type:  store.CONSUMABLE
  });

  // Purchase product.
  store.order("gems100");
  store.refresh();
  store.when("gems100").approved(function (order) {
    order.finish();
    store.refresh();

    // Add extra gems.
    localStorage.gems = parseInt(localStorage.gems) + 100; // Add 100 gems.
    that.upgrade_sound.play(); // Play upgrade sound.
    that.menu_items[4].select(); // Select fifth item.
  });
};

YellowSidd.Gems.prototype.startPaymentGems200 = function () {
  'use strict';
   alert('gems 200');
  var that = this;

   store.verbosity = store.INFO;

  // Prepare product.
  store.register({
    id:    "com.doyban.yellowsidd.gems200",
    alias: "Gems 200",
    type:  store.CONSUMABLE
  });

  // Purchase product.
  store.order("gems200");
  store.refresh();
  store.when("gems200").approved(function (order) {
    order.finish();
    store.refresh();

    // Add extra gems.
    localStorage.gems = parseInt(localStorage.gems) + 200; // Add 200 gems.
    that.upgrade_sound.play(); // Play upgrade sound.
    that.menu_items[5].select(); // Select sixth item.
  });
};
