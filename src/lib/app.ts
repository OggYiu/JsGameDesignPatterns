class App
{
    protected drawer: Drawer;
    protected lastTimestamp: number = 0;
    protected dt: number = 0;

    constructor()
    {
        this.drawer = new Drawer();
    }
    
    public loop(timestamp: number): void
    {
        this.update(timestamp);
        this.postUpdate(timestamp);
    }

    protected update(timestamp: number): void
    {
        this.dt = this.lastTimestamp > 0? timestamp - this.lastTimestamp : 0;
    }

    protected postUpdate(timestamp: number): void
    {
        this.lastTimestamp = timestamp;
    }
}