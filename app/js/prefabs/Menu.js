var YellowSidd = YellowSidd || {};

YellowSidd.Menu = function (game_state, name, position, properties) {
  "use strict";
  YellowSidd.Prefab.call(this, game_state, name, position, properties); // Extend Prefab class.

  this.visible = false; // Make this prefab invisible.

  this.menu_items = properties.menu_items; // List of menu items.

  this.swipe = this.game.input.activePointer; // Allow player to navigate by swiping.

  this.background_sound = this.game.add.audio('background', .3, true); // Add sound.

  // Sound buttons.
  this.buttonAudio = this.game.add.button(this.game.width * 0.58, this.game.height * 0.012, 'audio', this.toggleGameAudio, this);
  this.buttonAudio.frame = PLAY_SOUND ? 0 : 1; // Show appropriate background music button.
  // Audio buttons.
  this.buttonMusic = this.game.add.button(this.game.width * 0.708, this.game.height * 0.012, 'music', this.toggleBackgroundMusic, this);
  this.buttonMusic.frame = PLAY_MUSIC ? 0 : 1; // Show appropriate background music button.
  // Other buttons.
  this.exitButton = this.game.add.button(this.game.world.width * 0.89, this.game.world.height * 0.012, 'exit', this.startExit, this);
  this.gameButton = this.game.add.button(this.game.world.width * 0.08, this.game.world.height * 0.3, 'game', this.startGame, this);
  this.informationButton = this.game.add.button(this.game.world.width * 0.455, this.game.world.height * 0.012, 'information', this.startInformation, this);
  this.inviteButton = this.game.add.button(this.game.world.width * 0.324, this.game.world.height * 0.012, 'invite', this.startInvite, this);
  this.purchaseButton = this.game.add.button(this.game.world.width * 0.58, this.game.world.height * 0.3, 'purchase', this.startPurchase, this);
  this.shareButton = this.game.add.button(this.game.world.width * 0.196, this.game.world.height * 0.012, 'share', this.startShare, this);


  // Avoid to new track, while changing states.
  if (!FIRST_PLAYED) {
    this.background_sound.play(); // Play background sound.
    FIRST_PLAYED = true;
  }
};

// Set up constructor.
YellowSidd.Menu.prototype = Object.create(YellowSidd.Prefab.prototype);
YellowSidd.Menu.prototype.constructor = YellowSidd.Menu;

YellowSidd.Menu.prototype.startExit = function () {
  // alert('Exit');
  navigator.app.exitApp();
};

YellowSidd.Menu.prototype.startGame = function () {
  this.menu_items[1].select(); // Select second item.

  // Stop background music and prepare to play again once Menu will be called again.
  if (PLAY_MUSIC) {
    this.background_sound.stop();
    FIRST_PLAYED = false;
  }
};

YellowSidd.Menu.prototype.startInformation = function () {
  // alert('information');
  window.open("https://doyban.com/yellowsidd");

  this.menu_items[2].select(); // Select third item.

  // Stop background music and prepare to play again once Menu will be called again.
  if (PLAY_MUSIC) {
    this.background_sound.stop();
    FIRST_PLAYED = false;
  }
};

YellowSidd.Menu.prototype.startInvite = function () {
 // alert("invite");
  this.options = {
    method: 'apprequests',
    message: 'Play YellowSidd with me!'
  };
  this.onSuccess = function(result) {
   // alert("Success with invite, result: " + result);
  };
  this.onError = function(msg) {
   // alert("Failed with invite, msg: " + msg);
  };

  facebookConnectPlugin.showDialog(this.options, this.onSuccess, this.onError);

  this.menu_items[3].select(); // Select fourth item.

  // Stop background music and prepare to play again once Menu will be called again.
  if (PLAY_MUSIC) {
    this.background_sound.stop();
    FIRST_PLAYED = false;
  }
};

YellowSidd.Menu.prototype.startPurchase = function () {
  this.menu_items[4].select(); // Select fifth item.

  // Stop background music and prepare to play again once Menu will be called again.
  if (PLAY_MUSIC) {
    this.background_sound.stop();
    FIRST_PLAYED = false;
  }
};

YellowSidd.Menu.prototype.startShare = function () {
 // alert("share");

  this.options = {
    message: 'Play YellowSidd!', // not supported on some apps (Facebook, Instagram)
    subject: 'Play YellowSidd!', // fi. for email
    files: ['https://doyban.com/wp-content/uploads/2018/04/yellowsidd.png', 'https://doyban.com/logos/yellowsidd.png'], // an array of filenames either locally or remotely
    url: 'https://doyban.com/yellowsidd/'
  };
  this.onSuccess = function(result) {
   // alert("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
   // alert("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
  };
  this.onError = function(msg) {
   // alert("Sharing failed with message: " + msg);
  };

  window.plugins.socialsharing.shareWithOptions(this.options, this.onSuccess, this.onError);

  this.menu_items[5].select(); // Select sixth item.

  // Stop background music and prepare to play again once Menu will be called again.
  if (PLAY_MUSIC) {
    this.background_sound.stop();
    FIRST_PLAYED = false;
  }
};

// Toggle background music.
YellowSidd.Menu.prototype.toggleBackgroundMusic = function () {
  "use strict";
  this.buttonMusic.frame = PLAY_MUSIC ? 1 : 0; // Show appropriate background music button.
  PLAY_MUSIC = !PLAY_MUSIC; // Toggle background music.

  if (!PLAY_MUSIC) {
    this.background_sound.stop(); // Stop background music.
  }
  if (PLAY_MUSIC) {
    this.background_sound.play(); // Play background music.
  }
};

// Toggle game audio.
YellowSidd.Menu.prototype.toggleGameAudio = function () {
  "use strict";
  this.buttonAudio.frame = PLAY_SOUND ? 1 : 0; // Show appropriate game sounds button.
  PLAY_SOUND = !PLAY_SOUND; // Toggle game sounds.
};

