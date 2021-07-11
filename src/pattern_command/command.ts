class App_Command extends App
{
    private x: number = 0;

    constructor()
    {
        super();
        // document.getElementById("title").innerHTML = 'wahahah';
    }

    protected override update(timestamp: number): void
    {
        super.update(timestamp);
        
        this.drawer.clear();
        this.x += this.dt / 500.0;
        this.drawer.drawCircle(this.x, 50, 10, "#ff0000");
        // console.log(`App_Command: ${timestamp}`);
    }   
}

interface Command
{
    execute(): void;
}

class CommandPrintA implements Command
{
    constructor()
    {
    }

    execute(): void
    {
        console.log('a');
    }
}

class CommandPrintB implements Command
{
    constructor()
    {
    }

    execute(): void
    {
        console.log('b');
    }
}

class CommandPrintC implements Command
{
    constructor()
    {
    }
    
    execute(): void
    {
        console.log('c');
    }
}