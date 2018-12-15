var YellowSidd = YellowSidd || {};
var PLAY_MUSIC = true; // Global variable to toggle background music.
var PLAY_SOUND = true; // Global variable to toggle game sounds.
var FIRST_PLAYED = false; // Global variable to check if background music has been played for the first time.
var GAME_START = false; // Global variable to check if player has started a game to avoid duplication of pad/stick.
var CHECKPOINT_REACHED = false; // Global variable to check if checkpoint has been reached.
var REACHED_NEXT_LEVEL = false; // Global variable to toggle visibility of pad/stick on next level.

var game = new Phaser.Game(700, 360, Phaser.CANVAS);
game.state.add('BootState', new YellowSidd.BootState()); // Loads a JSON file with the level information and starts the Loading State.
game.state.add('LoadingState', new YellowSidd.LoadingState()); // Loads all the game assets, and starts the Level State.
game.state.add('GameState', new YellowSidd.TiledState()); // Creates the map and all game objects.
game.state.add('MenuState', new YellowSidd.MenuState()); // Create MenuState.
game.state.add('PurchaseState', new YellowSidd.PurchaseState()); // Create PurchaseState.
game.state.add('GemsState', new YellowSidd.GemsState()); // Create GemsState.
game.state.add('SkillsState', new YellowSidd.SkillsState()); // Create SkillsState.
game.state.add('GameOverState', new YellowSidd.GameOverState()); // Create GameOverState.
game.state.start('BootState', true, false, 'assets/levels/menu.json', 'MenuState'); // Start BootState state.
