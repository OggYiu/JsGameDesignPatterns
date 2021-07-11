class Drawer
{
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor()
    {
        let canvas = document.getElementById('canvas') as HTMLCanvasElement;
        let context = canvas.getContext('2d');
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = 'black';

        this.canvas = canvas;
        this.context = context;
    }

    drawCircle(x: number, y: number, radius: number, color: string)
    {
        this.context.fillStyle = color;
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, 2 * Math.PI);
        this.context.fill();
    }

    clear()
    {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);   
    }
}