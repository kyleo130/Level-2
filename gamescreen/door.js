const Door = function(ctx, x, y) {

    const sequences = { 
        normal:  { x: 0, y: 512, width: 64, height: 32, count: 1, timing: 100, loop: false },
        destroyed: { x: 704, y: 512, width: 64, height: 32, count: 1, timing: 100, loop: false }
     };

    const sprite = Sprite(ctx, x, y);

    sprite.setSequence(sequences.normal)
          .useSheet("asset/Props and Items/props and items x1.png");

    const repair = function() {
        sprite.setSequence(sequences.normal);
    };

    const destroy = function() {
        sprite.setSequence(sequences.destroyed);
    };

    return {
        repair: repair,
        destroy: destroy,
        draw: sprite.draw,
        update: sprite.update
    };
};