// JavaScript File
/*global d3*/
/*global NodeText*/
/*global Node*/
/*global mainSvg*/
/*global width*/
/*global height*/
/*global padding*/
/*global SingleState*/
/*global Connector*/

class Stack
{
    constructor(customValues)
    {
        if(isNaN(customValues))
        {
            var dfv = "5, 4, 3";
            this.dataset = dfv.split(',').map(function(item) {
                return parseInt(item, 10);
            });
        }
        else
        {
            this.dataset = customValues.split(',').map(function(item) {
                return parseInt(item, 10);
            });
        }
        
        this.Nodes = [];
        this.States = [];
        this.maxNodes = 10;
        this.nodeWidth = 80;
        this.nodeHeight = (height - 50) / this.maxNodes;
        this.topPadding = this.nodeHeight * 2;
        this.xCenter = (width / 2) - (this.nodeWidth/2);
        
        this.init();
    }
    
    init()
    {
        var nodes = this.dataset.length;
        
        var container = new Node();
        container.x = this.xCenter - 5;
        container.y = this.topPadding;
        container.color = "blue";
        container.width = 2;
        container.type = "path";
        container.path = "";
        container.path += " M " + container.x + " " + container.y;
        container.path += " V " + height;
        container.path += " H " + (container.x + this.nodeWidth + 10);
        container.path += " V " + container.y;
        
        this.Nodes.push(container);
        
        var offset = height - this.nodeHeight - 5;
        
        for(var i = 0; i<nodes; i++)
        {
            var n = new Node();
            n.x = this.xCenter;
            n.y = offset;
            n.color = "orange";
            n.width = this.nodeWidth;
            n.height = this.nodeHeight;
            n.id = "node-" + i;
            
            n.text.value = this.dataset[i];
            n.text.color = "black";
            n.text.font = "sanserif";
            n.text.size = "14";
            n.text.x = (this.xCenter + this.nodeWidth / 2);
            n.text.y = n.y + this.nodeHeight / 2 + 5;
            n.text.id = "tbar-" + i;
            
            this.Nodes.push(n);
            
            offset = offset - this.nodeHeight - 5;
        }
    }
    
    CreateNewNode(number)
    {
        var n = new Node();
        n.x = this.xCenter;
        n.y = this.topPadding * 0.25;
        n.color = "DodgerBlue";
        n.width = this.nodeWidth;
        n.height = this.nodeHeight;
        n.id = "node-" + this.Nodes.length;
            
        n.text.value = number;
        n.text.color = "black";
        n.text.font = "sanserif";
        n.text.size = "14";
        n.text.x = (this.xCenter + this.nodeWidth / 2);
        n.text.y = n.y + this.nodeHeight / 2 + 5;
        n.text.id = "tbar-" + this.Nodes.length;
            
        this.Nodes.push(n);
    }
    
    InsertInitialState()
    {
        //insert a state
        var state = new SingleState();
        for(var i = 0; i < this.Nodes.length; i++)
        {
          state.AddANode(this.Nodes[i]);
          state.Nodes[i].isUpdated = true;
        }
        this.States.push(state);
    }
    
    InsertStateToPush()
    {
        var idx = this.Nodes.length - 1;
        this.Nodes[idx].y = this.Nodes[idx - 1].y - this.nodeHeight - 5;
        this.Nodes[idx].text.y = this.Nodes[idx].y + this.nodeHeight / 2 + 5;
        
        //insert a state
        var state = new SingleState();
        for(var i = 0; i < this.Nodes.length; i++)
        {
          state.AddANode(this.Nodes[i]);
          state.Nodes[i].isUpdated = true;
        }
        this.States.push(state);
    }
    
    InsertFinalState()
    {
        var idx = this.Nodes.length - 1;
        this.Nodes[idx].color = "orange";
        
        //insert a state
        var state = new SingleState();
        for(var i = 0; i < this.Nodes.length; i++)
        {
          state.AddANode(this.Nodes[i]);
          state.Nodes[i].isUpdated = true;
        }
        this.States.push(state);
    }
    
    Push(number)
    {
        this.States.splice(0, this.States.length);
        
        this.CreateNewNode(number);
        
        this.InsertInitialState();
        
        this.InsertStateToPush();
        
        this.InsertFinalState();
    }
}