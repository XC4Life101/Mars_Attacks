import { Terrain } from './terrain.js';
import { Player } from './player.js';

export class Game {
    constructor() {
        this.canvas = document.getElementById('canvas1');
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width = 1600; // Canvas width
        this.height = this.canvas.height = 1040; // Canvas height
        this.sampleCountElement = document.getElementById('sampleCount');
        this.samplesCollected = 0;
        this.terrain = new Terrain(this);
        this.player = new Player(this);
        this.input = []; // Store the current keys being pressed
        this.init();
    }

    init() {
        window.addEventListener('keydown', (e) => {
            if (!this.input.includes(e.key)) {
                this.input.push(e.key);
            }
        });

        window.addEventListener('keyup', (e) => {
            this.input = this.input.filter(key => key !== e.key);
        });

        this.startGameLoop();
        this.updateSampleCount();
    }

    startGameLoop() {
        const loop = () => {
            this.update();
            this.draw();
            requestAnimationFrame(loop);
        };
        loop();
    }

    update() {
        this.player.update(this.input);
        this.checkForCollisions();
    }

    checkForCollisions() {
        this.player.checkForCollisions();
    }

    collectSample() {
        this.samplesCollected++;
        this.updateSampleCount();
    }

    updateSampleCount() {
        // Update the sidebar with the current sample count
        this.sampleCountElement.textContent = this.samplesCollected;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height); // Clear the canvas
        this.terrain.draw(this.ctx);
        this.player.draw(this.ctx);
    }
}