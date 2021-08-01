import { Color } from "./color";

class Canvas
{
    private _width: number;
    private _height: number;
    private _colors: Color[][];

    constructor(width: number, height: number)
    {
        this._width = width;
        this._height= height;
        this._colors = [];
        
        for(let j = 0; j < height; ++j) {
            this._colors[j] = [];
            for(let i = 0; i < width; ++i) {
                this._colors[j][i] = Color.Black;
            }
        }
    }

    public toPMM(): string
    {
        let colorStr: string = '';
        let currentLine: string = '';
        for(let j = 0; j < this.height; ++j) {
            for(let i = 0; i < this.width; ++i) {
                let colorAry = this._colors[j][i].getColorStr().split(' ');
                for(let m: number = 0; m < colorAry.length; ++m)
                {
                    const c = colorAry[m];
                    let space: string = (currentLine.length > 0)? ' ' : '';

                    if((currentLine + space + colorAry[m]).length > 70) {
                        currentLine = '';
                        colorStr += '\n';
                        space = ''; 
                    }
                    
                    currentLine += space + c;
                    colorStr += space + c;
                }
            }
            currentLine = '';
            colorStr += '\n'; 
        }

        return  `P3\n` +
                `${this.width} ${this.height}\n` +
                `255\n` +
                colorStr;
    }

    public getColorAt(x: number, y: number): Color { return this._colors[y][x]; }
    public setColorAt(x: number, y: number, color: Color): void { this._colors[y][x] = color; }

    get width() { return this._width; }
    get height() { return this._height; }
}

export { Canvas };