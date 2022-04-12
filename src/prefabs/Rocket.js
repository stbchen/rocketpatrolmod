class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.firing = false;
        this.moveSpeed = 2;
        this.sfxRocket = scene.sound.add('sfx_rocket')

    }

    update() {
        if (!this.firing) {
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
            }
        }

        if (Phaser.Input.Keyboard.JustDown(keyF) && !this.firing) {
            this.firing = true;
            this.sfxRocket.play();
        }

        if (this.firing && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }

        if (this.y <= borderUISize * 3 + borderPadding) {
            this.reset();
        }
    }

    reset() {
        this.y = game.config.height - borderUISize - borderPadding;
        this.firing = false;
    }
}

