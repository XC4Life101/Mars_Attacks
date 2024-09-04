export class Player {
    constructor(game) {
        this.game = game;
        this.tileSize = 80;
        this.width = 65; // Width of a single frame
        this.height = 80; // Height of a single frame
        this.x = (Math.floor((this.game.width / 2) / this.tileSize) * this.tileSize) + 7;
        this.y = Math.floor((this.game.height / 2) / this.tileSize) * this.tileSize;
        this.speed = this.tileSize;

        // Initialize images
        this.images = [];
        for (let i = 0; i <= 15; i++) { // Assuming you have 16 images
            const img = new Image();
            img.src = `./assets/Robot_${i}.png`; // Update with your image paths
            this.images.push(img);
        }

        this.currentFrame = 0; // Index of the current frame
        this.frameSpeed = 3; // Speed at which frames are updated
        this.frameTimer = 0; // Timer to manage frame speed
        this.direction = 'down'; // Initial direction
        this.flipX = false; // Whether to flip the x-axis

        this.keys = {}; // Track key states
        this.moved = false; // Track if the player has moved

        window.addEventListener('keydown', (e) => this.handleKeyDown(e));
        window.addEventListener('keyup', (e) => this.handleKeyUp(e));
    }

    handleKeyDown(e) {
        this.keys[e.key] = true;
        if (!this.moved) { // Only move if the player hasn't moved yet
            if (e.key === 'ArrowUp') {
                this.move(0, -this.speed, 'up');
            }
            if (e.key === 'ArrowDown') {
                this.move(0, this.speed, 'down');
            }
            if (e.key === 'ArrowLeft') {
                this.move(-this.speed, 0, 'left');
                this.flipX = false;
            }
            if (e.key === 'ArrowRight') {
                this.move(this.speed, 0, 'right');
                this.flipX = true;
            }
        }
    }

    handleKeyUp(e) {
        this.keys[e.key] = false;
        this.moved = false; // Reset movement flag when key is released
    }

    move(dx, dy, direction) {
        let newX = this.x + dx;
        let newY = this.y + dy;

        // Check for collision with rock tiles
        if (!this.game.terrain.isRockTile(newX, newY)) {
            this.x = newX;
            this.y = newY;
            this.direction = direction;
            this.moved = true;
        }

        // Keep the player within the canvas boundaries
        this.x = Math.max(0, Math.min(this.x, this.game.width - this.width));
        this.y = Math.max(0, Math.min(this.y, this.game.height - this.height));
    }

    update() {
        // Update frame timer and currentFrame for animation
        this.frameTimer++;
        if (this.frameTimer >= this.frameSpeed) {
            this.currentFrame = (this.currentFrame + 1) % this.images.length;
            this.frameTimer = 0;
        }
    }

    draw(ctx) {
        // Draw image with flipping based on direction
        ctx.save(); // Save the current canvas state
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.scale(this.flipX ? -1 : 1, 1); // Flip horizontally if needed
        ctx.drawImage(
            this.images[this.currentFrame],
            -this.width / 2, // X position on the canvas
            -this.height / 2, // Y position on the canvas
            this.width, // Width to draw the frame
            this.height // Height to draw the frame
        );
        ctx.restore(); // Restore the canvas state
    }
}