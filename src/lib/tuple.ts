import { Helper } from "./helper";

class Tuple
{
    protected _x: number;
    protected _y: number;
    protected _z: number;
    protected _w: number;

    constructor(x: number, y: number, z: number, w: number)
    {
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;
    }

    isPoint(): boolean
    {
        return this.w === 1.0;
    }

    isVector(): boolean
    {
        return this.w === 0.0;
    }

    equal(tuple: Tuple): boolean
    {
        return  Helper.equal(this.x, tuple.x) &&
                Helper.equal(this.y, tuple.y) &&
                Helper.equal(this.z, tuple.z) &&
                Helper.equal(this.w, tuple.w);
    }
    
    add(tuple: Tuple): Tuple
    {
        return new Tuple(
            this.x + tuple.x,
            this.y + tuple.y,
            this.z + tuple.z,
            this.w + tuple.w
        );
    }
    
    subtract(tuple: Tuple): Tuple
    {
        return new Tuple(
            this.x - tuple.x,
            this.y - tuple.y,
            this.z - tuple.z,
            this.w - tuple.w
        );
    }
    
    public multiply(scalar: number): Tuple;
    public multiply(tuple: Tuple): Tuple;

    public multiply(scalarOrTuple: any): Tuple
    {
        if (typeof scalarOrTuple == "number") {
            return new Tuple(
                this.x * scalarOrTuple,
                this.y * scalarOrTuple,
                this.z * scalarOrTuple,
                this.w * scalarOrTuple
            );
        }
        else {
            return new Tuple(
                this.x * scalarOrTuple.x,
                this.y * scalarOrTuple.y,
                this.z * scalarOrTuple.z,
                this.w * scalarOrTuple.w
            );
        }
    }

    public divide(scalar: number): Tuple
    {
        return new Tuple(
            this.x / scalar,
            this.y / scalar,
            this.z / scalar,
            this.w / scalar
        );
    }

    public dot(other: Tuple): number
    {
        return  this.x * other.x +
                this.y * other.y +
                this.z * other.z +
                this.w * other.w;
    }

    public cross(other: Tuple): Tuple
    {
        return new Tuple(   this.y * other.z - this.z * other.y,
                            this.z * other.x - this.x * other.z,
                            this.x * other.y - this.y * other.x,
                            0.0);
    }

    negative(): Tuple
    {
        return new Tuple(
            -this.x,
            -this.y,
            -this.z,
            -this.w
        );
    }

    normalize(): Tuple
    {
        let length = this.length();
        
        return new Tuple(
            this.x / length,
            this.y / length,
            this.z / length,
            this.w / length
        );
    }

    lengthSq(): number
    {
        return  Math.pow(this.x, 2) +
                Math.pow(this.y, 2) +
                Math.pow(this.z, 2) +
                Math.pow(this.w, 2);
    }

    length(): number
    {
        return Math.sqrt(this.lengthSq());
    }

    public toString = () : string => {
        return `Tuple: ${this.x}, ${this.y}, ${this.z}, ${this.w}`;
    }

    get x(): number { return this._x; }
    set x(x: number) { this._x = x; }
    
    get y(): number { return this._y; }
    set y(y: number) { this._y = y; }
    
    get z(): number { return this._z; }
    set z(z: number) { this._z = z; }
    
    get w(): number { return this._w; }
    set w(w: number) { this._w = w; }
}

export { Tuple };