class Play extends Phaser.Scene {
    constructor() {
        super("PlayScene");
    }

    preload() {
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('spaceship2', './assets/spaceship2.png');
        //this.load.image('starfield', './assets/starfield.png');
        this.load.image('starfield2', './assets/starfield2.png');
        this.load.image('starfield3', './assets/starfield.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.spritesheet('explosion2', './assets/explosion2.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.spritesheet('explosion3', './assets/explosion3.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.spritesheet('explosion4', './assets/explosion4.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 4});
    }

    create() {
        // Background starfield
        //this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfield').setOrigin(0, 0);
        this.starfield2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfield3').setOrigin(0, 0);
        this.starfield3 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfield2').setOrigin(0, 0);

        // Green rectangle
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        
        // White rectangle
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        this.p1Rocket = new Rocket(this, game.config.width/1.5, 431, 'rocket').setOrigin(0.5, 0.5);
        this.p2Rocket = new Rocket2(this, game.config.width/3, 431, 'rocket').setOrigin(0.5, 0.5);
        
        // Spaceships
        this.shipA = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.shipB = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.shipC = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);
        this.shipD = new Spaceship(this, game.config.width, borderUISize*4 + borderPadding*5, 'spaceship2', 0, 50).setOrigin(0,0);
        this.shipD.moveSpeed = game.settings.spaceshipSpeed + 2;

        // Exploding animation
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // Exploding animation 2
        this.anims.create({
            key: 'explode2',
            frames: this.anims.generateFrameNumbers('explosion2', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // Exploding animation 3
        this.anims.create({
            key: 'explode3',
            frames: this.anims.generateFrameNumbers('explosion3', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // Exploding animation 2
        this.anims.create({
            key: 'explode4',
            frames: this.anims.generateFrameNumbers('explosion4', { start: 0, end: 4, first: 0}),
            frameRate: 30
        });
        // Controls
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
 
        // Initialize score
        this.p1Score = 0;
        this.p2Score = 0;
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, "p1: " + this.p1Score, scoreConfig);
        this.scoreRight = this.add.text(borderUISize*15 + borderPadding, borderUISize + borderPadding*2, "p2: " + this.p2Score, scoreConfig);
        //this.counter = 0;
        this.disTime = this.add.text(borderUISize*7.75 + borderPadding, borderUISize + borderPadding*2, "Time: ", scoreConfig);

        // Initialize game state
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

    }

    update() {
        // this.counter += 1;
        // if (this.counter % 60 == 0 && !this.gameOver) {
        //     this.timer -= 1;
        //     this.disTime.setText("Time: " + this.timer);
        // }
        //this.t = this.timer.getElapsedSeconds();
        this.timer = Math.round(this.time.now * 0.001);
        if (game.settings.gameTimer == 45000) {
            this.disTime.setText("Time: " + 45 - this.timer);
        }
        if (game.settings.gameTimer == 60000) {
            this.disTime.setText("Time: " + 60 - this.timer);
        }
        this.disTime.setText("Time:" + this.timer);
        //timer = this.time.elapsed;
        //this.disTime.text = "Time: " + this.timer;
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        // Move background
        //this.starfield.tilePositionX -= 4;
        this.starfield2.tilePositionX -= 2;
        this.starfield3.tilePositionX -= 3;
        if (Phaser.Input.Keyboard.DownDuration(keyRIGHT, Infinity)) {
            this.starfield2.tilePositionX += 7.6;
            this.starfield3.tilePositionX += 7.5;

        }
        if (Phaser.Input.Keyboard.DownDuration(keyLEFT, Infinity)) {
            this.starfield2.tilePositionX -= 5.5;
            this.starfield3.tilePositionX -= 5.6;

        }
        if (Phaser.Input.Keyboard.DownDuration(keyD, Infinity)) {
            this.starfield2.tilePositionX += 7.6;
            this.starfield3.tilePositionX += 7.5;
        }
        if (Phaser.Input.Keyboard.DownDuration(keyA, Infinity)) {
            this.starfield2.tilePositionX -= 5.5;
            this.starfield3.tilePositionX -= 5.6;
        }
        // Update ships/Rocket
        if (!this.gameOver) {
            this.shipA.update();
            this.shipB.update();
            this.shipC.update();
            this.shipD.update();
            this.p1Rocket.update();
            this.p2Rocket.update();
        }

        // check collisions for p1
        if (this.checkCollision(this.p1Rocket, this.shipD)) {
            this.p1Rocket.reset();
            this.shipExplode1(this.shipD);
        }
        if(this.checkCollision(this.p1Rocket, this.shipC)) {
            this.p1Rocket.reset();
            this.shipExplode1(this.shipC);
        }
        if (this.checkCollision(this.p1Rocket, this.shipB)) {
            this.p1Rocket.reset();
            this.shipExplode1(this.shipB);
        }
        if (this.checkCollision(this.p1Rocket, this.shipA)) {
            this.p1Rocket.reset();
            this.shipExplode1(this.shipA);
        }
        
        // check collisions
        if (this.checkCollision(this.p2Rocket, this.shipD)) {
            this.p1Rocket.reset();
            this.shipExplode1(this.shipD);
        }
        if(this.checkCollision(this.p2Rocket, this.shipC)) {
            this.p2Rocket.reset();
            this.shipExplode2(this.shipC);
        }
        if (this.checkCollision(this.p2Rocket, this.shipB)) {
            this.p2Rocket.reset();
            this.shipExplode2(this.shipB);
        }
        if (this.checkCollision(this.p2Rocket, this.shipA)) {
            this.p2Rocket.reset();
            this.shipExplode2(this.shipA);
        }
        
    }
    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }
    
    shipExplode1(ship) {
        ship.alpha = 0;  

        // create explosion sprite at ship's position
        var value = Phaser.Math.Between(1, 4);
        if (value == 1) {
            let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
            boom.anims.play('explode');             
            boom.on('animationcomplete', () => {
                ship.reset();
                ship.alpha = 1;
                boom.destroy();
            });
        }
        else if (value == 2) {
            let boom = this.add.sprite(ship.x, ship.y, 'explosion2').setOrigin(0, 0);
            boom.anims.play('explode2');             
            boom.on('animationcomplete', () => {
                ship.reset();
                ship.alpha = 1;
                boom.destroy();
            });
        }
        else if (value == 3) {
            let boom = this.add.sprite(ship.x, ship.y, 'explosion3').setOrigin(0, 0);
            boom.anims.play('explode3');             
            boom.on('animationcomplete', () => {
                ship.reset();
                ship.alpha = 1;
                boom.destroy();
            });
        }
        else if (value == 4) {
            let boom = this.add.sprite(ship.x, ship.y, 'explosion4').setOrigin(0, 0);
            boom.anims.play('explode4');             
            boom.on('animationcomplete', () => {
                ship.reset();
                ship.alpha = 1;
                boom.destroy();
            });
        }
        
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = "p1: " + this.p1Score; 
        
        this.sound.play('sfx_explosion');
      }

    shipExplode2(ship) {
        ship.alpha = 0;  

        // create explosion sprite at ship's position
        var value = Phaser.Math.Between(1, 4);
        if (value == 1) {
            let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
            boom.anims.play('explode');             
            boom.on('animationcomplete', () => {
                ship.reset();
                ship.alpha = 1;
                boom.destroy();
            });
        }
        else if (value == 2) {
            let boom = this.add.sprite(ship.x, ship.y, 'explosion2').setOrigin(0, 0);
            boom.anims.play('explode2');             
            boom.on('animationcomplete', () => {
                ship.reset();
                ship.alpha = 1;
                boom.destroy();
            });
        }
        else if (value == 3) {
            let boom = this.add.sprite(ship.x, ship.y, 'explosion3').setOrigin(0, 0);
            boom.anims.play('explode3');             
            boom.on('animationcomplete', () => {
                ship.reset();
                ship.alpha = 1;
                boom.destroy();
            });
        }
        else if (value == 4) {
            let boom = this.add.sprite(ship.x, ship.y, 'explosion4').setOrigin(0, 0);
            boom.anims.play('explode4');             
            boom.on('animationcomplete', () => {
                ship.reset();
                ship.alpha = 1;
                boom.destroy();
            });
        }
        
        // score add and repaint
        this.p2Score += ship.points;
        this.scoreRight.text = "p2: " + this.p2Score; 
        
        this.sound.play('sfx_explosion');
      }
      
}