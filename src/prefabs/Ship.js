class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        // Add ship to scene
        scene.add.existing(this);

        // Store points
        this.points = pointValue;

        // Set ship speed
        this.moveSpeed = game.settings.spaceshipSpeed;
    }
    update() {
        // Move ships to the left
        this.x -= this.moveSpeed;

        // If ship is off screen, reset it
        if (this.x <=0 - this.width) {
            //this.x = game.config.width;
            this.reset();
        }
    }

    reset() {
        this.x = game.config.width;
    }
}
