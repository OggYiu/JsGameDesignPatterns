import { Helper } from "./helper";

class Matrix
{
    private _data: number[][];

    constructor(data: number[][])
    {
        this._data = data;
    }

    rowCount(): number
    {
        return this._data.length;
    }

    columnCount(): number
    {
        return this._data[0].length;
    }

    getValueAt(row: number, column: number): number
    {
        return this._data[row][column];
    }

    equal(other: Matrix): boolean
    {
        if(this.rowCount() != other.rowCount()) return false;
        if(this.columnCount() != other.columnCount()) return false;

        for(let row = 0; row < this.rowCount(); ++row) {
            for(let col = 0; col < this.columnCount(); ++col) {
                if(this.getValueAt(row, col) !== other.getValueAt(row, col)) {
                    return false;
                }
            }
        }

        return true;
    }
    // public toString = () : string => {
    //     return `Tuple: ${this.x}, ${this.y}, ${this.z}, ${this.w}`;
    // }
}

export { Matrix };