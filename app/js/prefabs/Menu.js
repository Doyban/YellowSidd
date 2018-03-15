var YellowSidd = YellowSidd || {};

YellowSidd.Menu = function (game_state, name, position, properties) {
  "use strict";
  YellowSidd.Prefab.call(this, game_state, name, position, properties); // Extend Prefab class.

  this.visible = false; // Make this prefab invisible.

  this.menu_items = properties.menu_items; // List of menu items.

  this.swipe = this.game.input.activePointer; // Allow player to navigate by swiping.

  this.background_sound = this.game.add.audio('background', .3, true); // Add sound.

  // Sound buttons.
  this.buttonAudio = this.game.add.button(this.game.width * 0.694, this.game.height * 0.012, 'audio', this.toggleGameAudio, this);
  this.buttonAudio.frame = PLAY_SOUND ? 0 : 1; // Show appropriate background music button.

  // Avoid to new track, while changing states.
  if (!FIRST_PLAYED) {
    this.background_sound.play(); // Play background sound.
    FIRST_PLAYED = true;
  }

  // Audio buttons.
  this.buttonMusic = this.game.add.button(this.game.width * 0.812, this.game.height * 0.012, 'music', this.toggleBackgroundMusic, this);
  this.buttonMusic.frame = PLAY_MUSIC ? 0 : 1; // Show appropriate background music button.
};

// Set up constructor.
YellowSidd.Menu.prototype = Object.create(YellowSidd.Prefab.prototype);
YellowSidd.Menu.prototype.constructor = YellowSidd.Menu;

YellowSidd.Menu.prototype.update = function () {
  "use strict";
  /**
   * Choose appropriate menu item.
   * To get action on whole item dimensions while swiping, item needs to be get from anchor of itself and substract & add half of width & height to it, then whole item dimensions are on action for swiping.
   */
  if (this.swipe.isDown && (this.swipe.position.x >= ((this.game_state.prefabs.exit_item.position.x) - 70 / 2) && this.swipe.position.x <= ((this.game_state.prefabs.exit_item.position.x)) + 70 / 2) && (this.swipe.position.y >= ((this.game_state.prefabs.exit_item.position.y) - 70 / 2) && this.swipe.position.y <= ((this.game_state.prefabs.exit_item.position.y)) + 70 / 2)) {
    alert('exit');
    window.open("https://facebook.com");
  }
  else if (this.swipe.isDown && (this.swipe.position.x >= ((this.game_state.prefabs.game_item.position.x) - 240 / 2) && this.swipe.position.x <= ((this.game_state.prefabs.game_item.position.x)) + 240 / 2) && (this.swipe.position.y >= ((this.game_state.prefabs.game_item.position.y) - 240 / 2) && this.swipe.position.y <= ((this.game_state.prefabs.game_item.position.y)) + 240 / 2)) {
    this.menu_items[1].select(); // Select second item.

    // Stop background music and prepare to play again once Menu will be called again.
    if (PLAY_MUSIC) {
      this.background_sound.stop();
      FIRST_PLAYED = false;
    }
  }
  else if (this.swipe.isDown && (this.swipe.position.x >= ((this.game_state.prefabs.information_item.position.x) - 70 / 2) && this.swipe.position.x <= ((this.game_state.prefabs.information_item.position.x)) + 70 / 2) && (this.swipe.position.y >= ((this.game_state.prefabs.information_item.position.y) - 70 / 2) && this.swipe.position.y <= ((this.game_state.prefabs.information_item.position.y)) + 70 / 2)) {
    // alert('Go to Doyban');
    window.open("https://doyban.com/yellowsidd");
  }
  else if (this.swipe.isDown && (this.swipe.position.x >= ((this.game_state.prefabs.invite_item.position.x) - 70 / 2) && this.swipe.position.x <= ((this.game_state.prefabs.invite_item.position.x)) + 70 / 2) && (this.swipe.position.y >= ((this.game_state.prefabs.invite_item.position.y) - 70 / 2) && this.swipe.position.y <= ((this.game_state.prefabs.invite_item.position.y)) + 70 / 2)) {
    this.menu_items[3].select(); // Select fourth item.

    // Stop background music and prepare to play again once Menu will be called again.
    if (PLAY_MUSIC) {
      this.background_sound.stop();
      FIRST_PLAYED = false;
    }

    YellowSidd.FacebookAPI.prototype.inviteFriends(); // Invite friends.
  }
  else if (this.swipe.isDown && (this.swipe.position.x >= ((this.game_state.prefabs.purchase_item.position.x) - 240 / 2) && this.swipe.position.x <= ((this.game_state.prefabs.purchase_item.position.x)) + 240 / 2) && (this.swipe.position.y >= ((this.game_state.prefabs.purchase_item.position.y) - 240 / 2) && this.swipe.position.y <= ((this.game_state.prefabs.purchase_item.position.y)) + 240 / 2)) {
    this.menu_items[4].select(); // Select fifth item.

    // Stop background music and prepare to play again once Menu will be called again.
    if (PLAY_MUSIC) {
      this.background_sound.stop();
      FIRST_PLAYED = false;
    }
  }
  else if (this.swipe.isDown && (this.swipe.position.x >= ((this.game_state.prefabs.share_item.position.x) - 70 / 2) && this.swipe.position.x <= ((this.game_state.prefabs.share_item.position.x)) + 70 / 2) && (this.swipe.position.y >= ((this.game_state.prefabs.share_item.position.y) - 70 / 2) && this.swipe.position.y <= ((this.game_state.prefabs.share_item.position.y)) + 70 / 2)) {
    this.menu_items[5].select(); // Select sixth item.

    // Stop background music and prepare to play again once Menu will be called again.
    if (PLAY_MUSIC) {
      this.background_sound.stop();
      FIRST_PLAYED = false;
    }

    YellowSidd.FacebookAPI.prototype.shareGame(); // Share game.
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