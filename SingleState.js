// JavaScript File
/*global Node*/

class SingleState
{
    constructor()
    {
        this.Nodes = [];
    }
    
    AddANode(n)
    {
        var nn = new Node();
        nn.Update(n);
        this.Nodes.push(nn);
    }
}