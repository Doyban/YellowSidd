var YellowSidd = YellowSidd || {};

var game = new Phaser.Game(800, 400, Phaser.CANVAS);
game.state.add('BootState', new YellowSidd.BootState()); // Loads a JSON file with the level information and starts the Loading State.
game.state.add('LoadingState', new YellowSidd.LoadingState()); // Loads all the game assets, and starts the Level State.
game.state.add('GameState', new YellowSidd.TiledState()); // Creates the map and all game objects.
game.state.add('MenuState', new YellowSidd.MenuState()); // Create MenuState.
game.state.add('PurchaseState', new YellowSidd.PurchaseState()); // Create PurchaseState.
game.state.add('GemsState', new YellowSidd.GemsState()); // Create GemsState.
game.state.add('SkillsState', new YellowSidd.SkillsState()); // Create SkillsState.
game.state.start('BootState', true, false, 'assets/levels/menu.json', "MenuState"); // Start BootState state.