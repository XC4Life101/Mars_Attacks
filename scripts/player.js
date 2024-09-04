export class Player {
    constructor(game) {
        this.game = game;
        this.tileSize = 80;
        this.width = 65;
        this.height = 80;
        this.x = (Math.floor((this.game.width / 2) / this.tileSize) * this.tileSize) + 7;
        this.y = Math.floor((this.game.height / 2) / this.tileSize) * this.tileSize;
        this.speed = this.tileSize;

        // Initialize images
        this.images = [];
        for (let i = 0; i <= 15; i++) {
            const img = new Image();
            img.src = `./assets/Robot_${i}.png`;
            this.images.push(img);
        }

        this.currentFrame = 0;
        this.frameSpeed = 3;
        this.frameTimer = 0;
        this.direction = 'down';
        this.flipX = false;

        this.keys = {};
        this.moved = false;

        window.addEventListener('keydown', (e) => this.handleKeyDown(e));
        window.addEventListener('keyup', (e) => this.handleKeyUp(e));
    }

    handleKeyDown(e) {
        this.keys[e.key] = true;
        if (!this.moved) {
            if (e.key === 'ArrowUp') {
                this.y -= this.speed;
                this.direction = 'up';
                this.moved = true;
            }
            if (e.key === 'ArrowDown') {
                this.y += this.speed;
                this.direction = 'down';
                this.moved = true;
            }
            if (e.key === 'ArrowLeft') {
                this.x -= this.speed;
                this.direction = 'left';
                this.moved = true;
                this.flipX = false;
            }
            if (e.key === 'ArrowRight') {
                this.x += this.speed;
                this.direction = 'right';
                this.moved = true;
                this.flipX = true;
            }
        }

        this.x = Math.max(0, Math.min(this.x, this.game.width - this.width));
        this.y = Math.max(0, Math.min(this.y, this.game.height - this.height));
    }    

    handleKeyUp(e) {
        this.keys[e.key] = false;
        this.moved = false;
    }

    update() {
        this.frameTimer++;
        if (this.frameTimer >= this.frameSpeed) {
            this.currentFrame = (this.currentFrame + 1) % this.images.length;
            this.frameTimer = 0;
        }
        
        // Check for collisions after moving
        this.checkForCollisions();
    }

    checkForCollisions() {
        if (this.game.terrain.isRockSample(this.x, this.y)) {
            this.game.collectSample();
            this.game.terrain.removeSample(this.x, this.y);
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.scale(this.flipX ? -1 : 1, 1);
        ctx.drawImage(
            this.images[this.currentFrame],
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );
        ctx.restore();
    }
}