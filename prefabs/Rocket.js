class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.moveSpeed = 2;
    }
update() {
        if(keyLEFT.isDown) {
            this.x -= this.moveSpeed;
        } else if (keyRIGHT.isDown) {
            this.x += this.moveSpeed;
        }
    }
}