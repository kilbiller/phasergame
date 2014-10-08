"use strict";
var Phaser = require("./phaser");
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

var image;
var cursors;

function preload() {

    //  You can fill the preloader with as many assets as your game requires

    //  Here we are loading an image. The first parameter is the unique
    //  string by which we'll identify the image later in our code.

    //  The second parameter is the URL of the image (relative)
    game.load.image('test', 'assets/test-all-the-things.jpg');
    cursors = game.input.keyboard.createCursorKeys();
}

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#4CCD4C';

    //  This creates a simple sprite that is using our loaded image and
    //  displays it on-screen
    //  and assign it to a variable
    image = game.add.sprite(0, 0, 'test');
}

function update() {
    if(cursors.up.isDown) {
        image.y -= 5;
    } else if(cursors.down.isDown) {
        image.y += 5;
    } else if(cursors.left.isDown) {
        image.x -= 5;
    } else if(cursors.right.isDown) {
        image.x += 5;
    }
}
