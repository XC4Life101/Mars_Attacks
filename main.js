window.addEventListener("load", function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500

    class Game{
        constructor(width, height){
            this.width = width;
            this.height = height;
        }
        
        update(){

        }

        draw(){

        }
    }
    const game = new Game(canvas.width, canvas.height);

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        game.update();  // Update game state
        game.draw();    // Draw everything on the canvas
        requestAnimationFrame(gameLoop); // Loop again
    }

    gameLoop(); // Start the loop
});