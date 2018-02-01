var YellowSidd = YellowSidd || {};
var PLAY_MUSIC = false; // Global variable to toggle background music.
var PLAY_SOUND = true; // Global variable to toggle game sounds.

var game = new Phaser.Game(800, 400, Phaser.CANVAS);
game.state.add('BootState', new YellowSidd.BootState()); // Loads a JSON file with the level information and starts the Loading State.
game.state.add('LoadingState', new YellowSidd.LoadingState()); // Loads all the game assets, and starts the Level State.
game.state.add('GameState', new YellowSidd.TiledState()); // Creates the map and all game objects.
game.state.add('MenuState', new YellowSidd.MenuState()); // Create MenuState.
game.state.start('BootState', true, false, 'assets/levels/menu.json', 'MenuState'); // Start BootState state.