export class Terrain {
    constructor(game) {
        this.game = game;
        this.tileSize = 80; // Size of each tile
        this.columns = Math.floor(game.width / this.tileSize);
        this.rows = Math.floor(game.height / this.tileSize);

        this.groundImage = new Image();
        this.groundImage.src = './assets/Tile.jpeg'; // Image for passable ground tiles

        // Load rock tile images
        this.rockImages = [];
        for (let i = 1; i <= 4; i++) {
            const img = new Image();
            img.src = `./assets/Rock_Tile_${i}.jpg`; // Paths to rock tile images
            this.rockImages.push(img);
        }

        this.grid = this.generateGrid();
    }

    generateGrid() {
        let grid = [];
        for (let y = 0; y < this.rows; y++) {
            let row = [];
            for (let x = 0; x < this.columns; x++) {
                // Randomly decide whether to place a rock tile or a ground tile
                if (Math.random() < 0.2) { // 20% chance for a rock tile
                    // Randomly select a rock image for this tile
                    const rockImage = this.rockImages[Math.floor(Math.random() * this.rockImages.length)];
                    row.push(rockImage);
                } else {
                    row.push(this.groundImage);
                }
            }
            grid.push(row);
        }
        return grid;
    }

    draw(ctx) {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.columns; x++) {
                let image = this.grid[y][x];
                if (image) {
                    ctx.drawImage(image, x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
                }

                // Optionally draw grid lines for visualization
                ctx.strokeStyle = 'rgba(255, 255, 255, 0)';
                ctx.strokeRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
            }
        }
    }

    isRockTile(x, y) {
        const col = Math.floor(x / this.tileSize);
        const row = Math.floor(y / this.tileSize);
        return this.grid[row] && this.grid[row][col] && this.rockImages.includes(this.grid[row][col]);
    }
}