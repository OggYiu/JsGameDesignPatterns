import { Tuple } from "./tuple";

class Point extends Tuple
{
    constructor(x: number, y: number, z: number)
    {
        super(x, y, z, 1.0);
    }
}

export { Point };