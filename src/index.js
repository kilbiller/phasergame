"use strict";
var Phaser = require("./phaser");
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

var image;
var kb;

function preload() {
    game.load.image('test', 'assets/test-all-the-things.jpg');
    kb = game.input.keyboard.createCursorKeys();
    kb.Z = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    kb.Q = game.input.keyboard.addKey(Phaser.Keyboard.Q);
    kb.S = game.input.keyboard.addKey(Phaser.Keyboard.S);
    kb.D = game.input.keyboard.addKey(Phaser.Keyboard.D);
}

function create() {
    game.stage.backgroundColor = '#4CCD4C';
    image = game.add.sprite(0, 0, 'test');
}

function update() {
    if(kb.Z.isDown || kb.up.isDown) {
        image.y -= 5;
    } else if(kb.S.isDown || kb.down.isDown) {
        image.y += 5;
    } else if(kb.Q.isDown || kb.left.isDown) {
        image.x -= 5;
    } else if(kb.D.isDown || kb.right.isDown) {
        image.x += 5;
    }
}
