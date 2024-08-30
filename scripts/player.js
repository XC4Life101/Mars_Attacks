export class Player {
    constructor(game) {
        this.game = game;
        this.width = 40; // Width of a single frame
        this.height = 50; // Height of a single frame
        this.x = this.game.width / 2 - this.width / 2;
        this.y = this.game.height / 2 - this.height / 2;
        this.speed = 5;

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
    }

    update(input) {
        // Handle movement and direction
        if (input.includes('ArrowUp')) {
            this.y -= this.speed;
        }
        if (input.includes('ArrowDown')) {
            this.y += this.speed;
        }
        if (input.includes('ArrowLeft')) {
            this.x -= this.speed;
            this.direction = 'left';
            this.flipX = false;
        }
        if (input.includes('ArrowRight')) {
            this.x += this.speed;
            this.direction = 'right';
            this.flipX = true;
        }

        // Keep the player within the canvas boundaries
        this.x = Math.max(0, Math.min(this.x, this.game.width - this.width));
        this.y = Math.max(0, Math.min(this.y, this.game.height - this.height));

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