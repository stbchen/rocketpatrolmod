class Ship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        // Add ship to scene
        scene.add.existing(this);

        // Store points
        this.points = pointValue;

        // Set ship speed
        this.moveSpeed = 3;
    }
    update() {
        // Move ships to the left
        this.x -= this.moveSpeed;

        // If ship is off screen, reset it
        if (this.x <=0 - this.width) {
            this.x = game.config.width;
        }
    }
}