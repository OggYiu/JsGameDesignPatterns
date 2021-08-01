import { Tuple } from "./tuple";

class Color extends Tuple
{
    static White: Color = new Color(1.0, 1.0, 1.0);
    static Black: Color = new Color(0.0, 0.0, 0.0);

    constructor(r: number, g: number, b: number)
    {
        super(r, g, b, 0.0);
    }
    
    private to255(v: number): number
    {
        return Math.ceil(Math.min(1, Math.max(v, 0)) * 255);
    }

    public getColorStr(): string{
        let strRed = this.to255(this.red);
        let strGreen = this.to255(this.green);
        let strBlue = this.to255(this.blue);
        return `${strRed} ${strGreen} ${strBlue}`;
    }

    get red(): number { return this._x; }
    set red(color: number) { this._x = color; }

    get green(): number { return this._y; }
    set green(color: number) { this._y = color; }

    get blue(): number { return this._z; }
    set blue(color: number) { this._z = color; }
}

export { Color };