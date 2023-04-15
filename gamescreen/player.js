const Player = function(ctx, x, y) {

    const sequences = {
        idle: { x: 0, y: 0, width: 32, height: 32, count: 1, timing: 100, loop: false },
        move: { x: 0, y: 96, width: 32, height: 32, count: 4, timing: 100, loop: true }
    }

    const sprite = Sprite(ctx, x, y);

    sprite.setSequence(sequences.idle)
          .setScale(1.5)
          .useSheet("./asset/Players/players blue x1.png");

    const move = function() {
        sprite.setSequence(sequences.move);
    };

    const stop = function() {
        sprite.setSequence(sequences.idle);
    };

    return {
        move: move,
        stop: stop,
        draw: sprite.draw,
        update: sprite.update,
        setXY: sprite.setXY
    };
};
