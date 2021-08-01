class Helper {
    static EPSILON: number = 0.00001;
    
    static equal(a: number, b: number) {
        return Math.abs(a - b) < this.EPSILON;
    }
}

export { Helper };