const Smoke = function(ctx, x, y) {

    const sequence = { x: 0, y: 224, width: 32, height: 32, count: 5, timing: 100, loop: false};

    const sprite = Sprite(ctx, x, y);

    sprite.setSequence(sequence)
          .useSheet("./asset/Projectiles/projectiles x1.png");

    const start = function() {
        sprite.setSequence(sequence);
    };

    return {
        start: start,
        draw: sprite.draw,
        update: sprite.update
    };
};