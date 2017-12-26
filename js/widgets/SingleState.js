// JavaScript File
/*global Node*/
/*global Connector*/

class SingleState
{
    constructor()
    {
        this.Nodes = [];
        this.text = "state text is empty";
    }
    
    AddANode(n)
    {
        if(n.type == "rect" )
        {
            var nn = new Node();
            nn.Update(n);
            this.Nodes.push(nn);
        }
        else if(n.type == "circle" )
        {
            var nn = new Node();
            nn.Update(n);
            this.Nodes.push(nn);
        }
        else if(n.type == "connector")
        {
            var nn = new Connector();
            nn.Update(n);
            this.Nodes.push(nn);
        }
        else if(n.type == "path")
        {
            var nn = new Connector();
            nn.Update(n);
            this.Nodes.push(nn);
        }
    }
}