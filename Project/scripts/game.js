window.addEventListener("load", function() {
    var Q = window.Q = Quintus({development: true})
        .include("Scenes, Sprites, 2D, Input, Touch, UI, TMX, Audio") // Musi byc taka kolejnosc.
        .include("ActionPlatformerPlayer, ActionPlatformerEnemy, GameStats") // Musi byc taka kolejnosc.
        .setup({ // Dodanie elementu canvas.
            width: 320,
            height: 180,
            //width: 1080,
            //height: 2100,
            scaleToFit: true
        }).controls().touch();

    Q.enableSound();
    Q.setImageSmoothing(false);

    // Definiowanie sceny.
    Q.scene("level", function(stage) {
        var player;

        Q.stageTMX("level.tmx", stage);
        player = Q("Player").first();

        // 150 coinsow wartych 150 pkt.
        var levelAssets = [

            ["Coin", {x:  250, y: 1960}],
            ["Coin", {x:  271, y: 1960}],
            ["Coin", {x:  292, y: 1960}],
            ["Coin", {x:  313, y: 1960}],
            ["Coin", {x:  334, y: 1960}],

            ["Coin", {x:  715, y: 1920}],
            ["Coin", {x:  736, y: 1920}],
            ["Coin", {x:  757, y: 1920}],
            ["Coin", {x:  778, y: 1920}],
            ["Coin", {x:  799, y: 1920}],
            ["Coin", {x:  820, y: 1920}],

            ["Coin", {x:  902, y: 1880}],
            ["Coin", {x:  923, y: 1880}],
            ["Coin", {x:  944, y: 1880}],
            ["Coin", {x:  965, y: 1880}],
            ["Coin", {x:  986, y: 1880}],
            ["Coin", {x: 1007, y: 1880}],

            ["Coin", {x:   30, y: 1790}],

            ["Coin", {x:  231, y: 1710}],
            ["Coin", {x:  252, y: 1710}],
            ["Coin", {x:  273, y: 1710}],
            ["Coin", {x:  294, y: 1710}],

            ["Coin", {x:  319, y: 1665}],
            ["Coin", {x:  340, y: 1665}],
            ["Coin", {x:  361, y: 1665}],
            ["Coin", {x:  382, y: 1665}],

            ["Coin", {x:  870, y: 1620}],

            ["Coin", {x:  966, y: 1600}],
            ["Coin", {x:  987, y: 1600}],
            ["Coin", {x:  966, y: 1520}],
            ["Coin", {x:  987, y: 1520}],

            ["Coin", {x:  945, y: 1440}],
            ["Coin", {x:  966, y: 1440}],
            ["Coin", {x:  987, y: 1440}],
            ["Coin", {x: 1008, y: 1440}],

            ["Coin", {x:  987, y: 1345}],
            ["Coin", {x: 1008, y: 1345}],

            ["Coin", {x:  861, y: 1219}],
            ["Coin", {x:  882, y: 1219}],
            ["Coin", {x:  903, y: 1219}],
            ["Coin", {x:  924, y: 1219}],

            ["Coin", {x:  546, y: 1093}],
            ["Coin", {x:  567, y: 1093}],
            ["Coin", {x:  588, y: 1093}],
            ["Coin", {x:  609, y: 1093}],

            ["Coin", {x:  725, y: 1217}],
            ["Coin", {x:  725, y: 1238}],
            ["Coin", {x:  725, y: 1259}],
            ["Coin", {x:  725, y: 1280}],
            ["Coin", {x:  725, y: 1301}],
            ["Coin", {x:  725, y: 1322}],

            ["Coin", {x:  630, y: 1206}],
            ["Coin", {x:  630, y: 1227}],
            ["Coin", {x:  630, y: 1248}],
            ["Coin", {x:  630, y: 1269}],
            ["Coin", {x:  630, y: 1290}],

            ["Coin", {x:  504, y: 1134}],
            ["Coin", {x:  504, y: 1155}],
            ["Coin", {x:  504, y: 1176}],
            ["Coin", {x:  504, y: 1197}],
            ["Coin", {x:  504, y: 1218}],
            ["Coin", {x:  504, y: 1239}],
            ["Coin", {x:  504, y: 1260}],
            ["Coin", {x:  504, y: 1281}],
            ["Coin", {x:  504, y: 1302}],
            ["Coin", {x:  504, y: 1323}],

            ["Coin", {x:  105, y: 1355}],
            ["Coin", {x:  126, y: 1355}],
            ["Coin", {x:  147, y: 1355}],
            ["Coin", {x:  168, y: 1355}],

            ["Coin", {x:  189, y: 1313}],
            ["Coin", {x:  210, y: 1313}],
            ["Coin", {x:  231, y: 1313}],

            ["Coin", {x:  273, y: 1187}],
            ["Coin", {x:  294, y: 1187}],
            ["Coin", {x:  315, y: 1187}],

            ["Coin", {x:  472, y: 1040}],
            ["Coin", {x:  493, y: 1019}],
            ["Coin", {x:  514, y: 1040}],

            ["Coin", {x:  546, y: 1019}],
            ["Coin", {x:  567, y: 1019}],
            ["Coin", {x:  588, y: 1019}],

            ["Coin", {x:  777, y:  830}],
            ["Coin", {x:  798, y:  830}],
            ["Coin", {x:  819, y:  830}],
            ["Coin", {x:  840, y:  830}],
            ["Coin", {x:  861, y:  830}],

            ["Coin", {x:  861, y:  746}],
            ["Coin", {x:  882, y:  746}],
            ["Coin", {x:  903, y:  746}],

            ["Coin", {x:  829, y:  725}],
            ["Coin", {x:  808, y:  704}],

            ["Coin", {x:  745, y:  725}],
            ["Coin", {x:  766, y:  704}],

            ["Coin", {x:  473, y:  756}],
            ["Coin", {x:  473, y:  777}],
            ["Coin", {x:  473, y:  798}],
            ["Coin", {x:  473, y:  819}],
            ["Coin", {x:  473, y:  840}],
            ["Coin", {x:  473, y:  861}],
            ["Coin", {x:  473, y:  882}],
            ["Coin", {x:  473, y:  903}],
            ["Coin", {x:  473, y:  924}],
            ["Coin", {x:  473, y:  945}],

            ["Coin", {x:   42, y:  809}],

            ["Coin", {x:   63, y:  767}],

            ["Coin", {x:   42, y:  725}],
            ["Coin", {x:   63, y:  725}],
            ["Coin", {x:   84, y:  725}],
            ["Coin", {x:  105, y:  725}],
            ["Coin", {x:  126, y:  725}],
            ["Coin", {x:  147, y:  725}],
            ["Coin", {x:  168, y:  725}],

            ["Coin", {x:  210, y:  683}],
            ["Coin", {x:  231, y:  683}],
            ["Coin", {x:  252, y:  683}],

            ["Coin", {x: 1008, y:  620}],

            ["Coin", {x:  966, y:  578}],

            ["Coin", {x:  903, y:  536}],
            ["Coin", {x:  924, y:  536}],

            ["Coin", {x: 1008, y:  452}],

            ["Coin", {x:  966, y:  410}],

            ["Coin", {x:   42, y:  326}],

            ["Coin", {x:   84, y:  284}],

            ["Coin", {x:  116, y:  242}],
            ["Coin", {x:  137, y:  221}],

            ["Coin", {x: 1008, y:  158}],

            ["Coin", {x:  987, y:  116}],

            ["Coin", {x:  903, y:  74}],
            ["Coin", {x:  924, y:  74}],
            ["Coin", {x:  945, y:  74}],
            ["Coin", {x:  966, y:  74}],

            ["Coin", {x:  662, y: 116}],
            ["Coin", {x:  620, y: 137}],
            ["Coin", {x:  641, y: 137}],

            ["Coin", {x:  105, y:  53}],
            ["Coin", {x:  126, y:  53}],
            ["Coin", {x:  147, y:  53}],
            ["Coin", {x:  168, y:  53}],
            ["Coin", {x:  189, y:  53}],
            ["Coin", {x:  210, y:  53}],
            ["Coin", {x:  231, y:  53}],
            ["Coin", {x:  252, y:  53}],
            ["Coin", {x:  273, y:  53}],
            ["Coin", {x:  294, y:  53}],
            ["Coin", {x:  315, y:  53}],
            ["Coin", {x:  336, y:  53}],
            ["Coin", {x:  357, y:  53}],
            ["Coin", {x:  378, y:  53}],
            ["Coin", {x:  399, y:  53}],

            ["Flag", {x:   40, y:  53}] // To win the game
        ];

        stage.loadAssets(levelAssets);

        stage.add("viewport").follow(player,{x: true, y: true}); // Dodanie kamery.
    });

    // At the end of the game let's show button to play again and some info text
    Q.scene("endGame", function(stage) {
        var container = stage.insert(new Q.UI.Container({
            x: Q.width / 2,
            y: Q.height / 2,
            fill: "rgba(0,0,0,0.5)"
        }));

        var button = container.insert(new Q.UI.Button({
            x: 0,
            y: 0,
            fill: "#BBBBBB",
            label: "Play again"
        }));

        var label = container.insert(new Q.UI.Text({
            x: 0,
            y: -10 - button.p.h,
            label: stage.options.label,
            color: "#EEEEEE"
        }));

        container.fit(10);

        button.on("click", function() {
            Q.clearStages();
            Q.stageScene("level");
            Q.stageScene("stats", 1);
        });
    });

    // Wczytywanie zasobow.
    Q.loadTMX("level.tmx, sprites.json, sprites.png, coin.png, flag.png, jump.mp3, kill-enemy.mp3, coin.mp3", function() {
        Q.compileSheets("sprites.png", "sprites.json");
        Q.stageScene("level");
        Q.stageScene("stats", 1); // Index na 1 (domyslnie 0), zeby byl widoczny najpierw (wyzszy index = widoczny jako pierwszy).
    });
});