export class Terrain {
    constructor(game) {
        this.game = game;
        this.tileSize = 50; // Size of each tile
        this.columns = Math.floor(game.width / this.tileSize);
        this.rows = Math.floor(game.height / this.tileSize);

        this.groundImage = new Image();
        this.groundImage.src = './assets/Tile.jpeg';

        this.grid = this.generateGrid();
    }

    generateGrid() {
        let grid = [];
        for (let y = 0; y < this.rows; y++) {
            let row = [];
            for (let x = 0; x < this.columns; x++) {
                row.push('ground'); // Placeholder for now, can expand later
            }
            grid.push(row);
        }
        return grid;
    }

    draw(ctx) {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.columns; x++) {
                let tileType = this.grid[y][x];
                let image = tileType === 'ground' ? this.groundImage : null;
                if (image) {
                    ctx.drawImage(image, x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
                }

                // Optionally draw grid lines for visualization
                ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
                ctx.strokeRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
            }
        }
    }
}