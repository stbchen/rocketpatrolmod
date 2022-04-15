class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    
    preload() {
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio("sfx_explosion", "./assets/explosion38.wav");
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    }
    create() {

        let menuConfig = {
            fontFamily: 'Tahoma',
            fontSize: '36px',
            backgroundColor: '#000000',
            color: '#0048BA',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        // show menu text
        this.add.text(game.config.width/15, game.config.height/2 - 100, 'Controls:', menuConfig).setOrigin(0);
        this.add.text(game.config.width/15, game.config.height/2 - 50, 'Use ← → arrows to move', menuConfig).setOrigin(0);
        this.add.text(game.config.width/15, game.config.height/2, '(F) to fire', menuConfig).setOrigin(0);
        menuConfig.backgroundColor = '#000000';
        menuConfig.color = '#0048BA';
        this.add.text(game.config.width/2, game.config.height - (borderUISize*2), 'Press ← for Novice', menuConfig).setOrigin(0);
        this.add.text(game.config.width/2, game.config.height - (borderUISize*4), 'Press → for Expert', menuConfig).setOrigin(0);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
            }
            this.sound.play('sfx_select');
            this.scene.start("PlayScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.scene.start("PlayScene");    
        }
      }
}