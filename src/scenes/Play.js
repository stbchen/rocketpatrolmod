class Play extends Phaser.Scene {
    constructor() {
        super("Play");
    }

    preload() {
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/rocket.png');
        this.load.image('starfield', './assets/starfield.png');
    }

    create() {

        // Controls
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // Background starfield
        this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfield').setOrigin(0, 0);
        
        // Green rectangle
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        
        // White rectangle
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        this.p1Rocket = new Rocket(this, game.config.width/2, 431, 'rocket').setOrigin(0.5, 0);
        this.p1Rocket.reset();

        // Spaceships
        this.shipA = new Spaceship(this, 300, 300, 'spaceship');
        this.shipB = new Spaceship(this, 400, 150, 'spaceship');
        this.shipC = new Spaceship(this, 100, 200, 'spaceship');
    }

    update() {
        // Move background
        this.starfield.tilePositionX -= 4;

        // Initialize movespeed
        const moveSpeed = 4;

        // Move rocket
        if(keyLEFT.isDown) {
            this.p1Rocket.x -= moveSpeed;
        }
        if(keyRIGHT.isDown) {
            this.p1Rocket.x += moveSpeed;
        }

        // Update ships/Rocket
        this.shipA.update();
        this.shipB.update();
        this.shipC.update();
        this.p1Rocket.update();
    }
}