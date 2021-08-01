class Drawer
{
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor()
    {
        const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
        const context: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = 'black';

        this.canvas = canvas;
        this.context = context;
    }

    drawCircle(x: number, y: number, radius: number, color: string): void
    {
        this.context.fillStyle = color;
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, 2 * Math.PI);
        this.context.fill();
    }

    clear(): void
    {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);   
    }
}