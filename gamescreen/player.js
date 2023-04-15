const Player = function(ctx, x, y) {

    const sequence = { x: 0, y: 0, width: 32, height: 32, count: 1, timing: 100, loop: false };

    const sprite = Sprite(ctx, x, y);

    sprite.setSequence(sequence)
          .setScale(1.5)
          .useSheet("./asset/Players/players blue x1.png");

    return {
        draw: sprite.draw,
        update: sprite.update,
        setXY: sprite.setXY
    };
};
