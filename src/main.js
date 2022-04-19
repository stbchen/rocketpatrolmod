// Rocket Patrol Modification
// >> Create a new title screen (e.g., new artwork, typography, layout) (10)
// >> Implement parallax scrolling (10)
// >> Create and implement a new weapon (w/ new behavior and graphics) (20)
// >> Implement a simultaneous two-player mode (30) 
// >> Display the time remaining (in seconds) on the screen (10)
// >> Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play],
};

let keyR, keyLEFT, keyRIGHT, keyA, keyD, keyUP, keyW;

let borderUISize = config.height / 15;
let borderPadding = borderUISize / 3;


let game = new Phaser.Game(config);