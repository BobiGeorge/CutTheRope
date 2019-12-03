class Resize{
    resizeScreen () {
        const vpw = window.innerWidth;  // Width of the viewport
        const vph = window.innerHeight; // Height of the viewport
        let nvw; // New game width
        let nvh; // New game height
    
        // The aspect ratio is the ratio of the screen's sizes in different dimensions.
        // The height-to-width aspect ratio of the game is HEIGHT / WIDTH.
        
        if (vph / vpw < screenHeight / screenWidth) {
          // If height-to-width ratio of the viewport is less than the height-to-width ratio
          // of the game, then the height will be equal to the height of the viewport, and
          // the width will be scaled.
          nvh = vph;
          nvw = (nvh * screenWidth) / screenHeight;
        } else {
          // In the else case, the opposite is happening.
          nvw = vpw;
          nvh = (nvw * screenHeight) / screenWidth;
        }
        
        // Set the game screen size to the new values.
        // This command only makes the screen bigger --- it does not scale the contents of the game.
        // There will be a lot of extra room --- or missing room --- if we don't scale the stage.
        renderer.resize(nvw, nvh);
        
        // This command scales the stage to fit the new size of the game.
        stage.scale.set(nvw / screenWidth, nvh / screenHeight);
    };   
}