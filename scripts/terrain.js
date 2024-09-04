export class Terrain {
    constructor(game) {
        this.game = game;
        this.tileSize = 80;
        this.columns = Math.floor(game.width / this.tileSize);
        this.rows = Math.floor(game.height / this.tileSize);

        this.groundImage = new Image();
        this.groundImage.src = './assets/Tile.jpeg';

        this.sampleImage = new Image();
        this.sampleImage.src = './assets/Rock_Sample.jpg';

        this.dropImage = new Image();
        this.dropImage.src = './assets/Drop_Zone.jpg';

        this.rockImages = [];
        for (let i = 1; i <= 4; i++) {
            const img = new Image();
            img.src = `./assets/Rock_Tile_${i}.jpg`;
            this.rockImages.push(img);
        }

        this.grid = this.generateGrid();
    }

    generateGrid() {
        let grid = [];
        for (let y = 0; y < this.rows; y++) {
            let row = [];
            for (let x = 0; x < this.columns; x++) {
                if (Math.random() < 0.2) {
                    const rockImage = this.rockImages[Math.floor(Math.random() * this.rockImages.length)];
                    row.push(rockImage);
                } else {
                    row.push(this.groundImage);
                }
            }
            grid.push(row);
        }

        this.addRockSamples(grid);
        this.addDropZones(grid);

        return grid;
    }

    addRockSamples(grid) {
        let samplesPlaced = 0;

        while (samplesPlaced < 3) {
            const randomRow = Math.floor(Math.random() * this.rows);
            const randomCol = Math.floor(Math.random() * this.columns);

            if (grid[randomRow][randomCol] === this.groundImage) {
                grid[randomRow][randomCol] = this.sampleImage;
                samplesPlaced++;
            }
        }
    }

    addDropZones(grid) {
        let dropsPlaced = 0;

        while (dropsPlaced < 3) {
            const randomRow = Math.floor(Math.random() * this.rows);
            const randomCol = Math.floor(Math.random() * this.columns);

            if (grid[randomRow][randomCol] === this.groundImage) {
                grid[randomRow][randomCol] = this.dropImage;
                dropsPlaced++;
            }
        }
    }

    draw(ctx) {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.columns; x++) {
                let image = this.grid[y][x];
                if (image) {
                    ctx.drawImage(image, x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
                }
            }
        }
    }

    isRockTile(x, y) {
        const col = Math.floor(x / this.tileSize);
        const row = Math.floor(y / this.tileSize);
        return this.grid[row] && this.grid[row][col] && this.rockImages.includes(this.grid[row][col]);
    }

    isDropZone(x, y) {
        const col = Math.floor(x / this.tileSize);
        const row = Math.floor(y / this.tileSize);
        return this.grid[row] && this.grid[row][col] === this.dropImage;
    }

    isRockSample(x, y) {
        const col = Math.floor(x / this.tileSize);
        const row = Math.floor(y / this.tileSize);
        return this.grid[row] && this.grid[row][col] === this.sampleImage;
    }

    removeSample(x, y) {
        const col = Math.floor(x / this.tileSize);
        const row = Math.floor(y / this.tileSize);
        if (this.grid[row] && this.grid[row][col] === this.sampleImage) {
            this.grid[row][col] = this.groundImage;
        }
    }
}