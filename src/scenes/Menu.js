class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    
    preload() {
        this.load.image("menu", './assets/menu.png')
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio("sfx_explosion", "./assets/explosion38.wav");
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    }
    create() {
        this.add.image(0, 0, 'menu').setOrigin(0, 0);
        
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