let app = new App_Command();

function gameLoop(timeStamp: number)
{
    app.loop(timeStamp);
    window.requestAnimationFrame(gameLoop);
};

window.requestAnimationFrame(gameLoop);