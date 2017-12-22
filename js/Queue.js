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

class Queue
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
        this.maxNodes = 8;
        this.nodeHeight = 50;
        this.topPadding = 50;
        this.leftRightPadding = 50;
        this.padding = 2;
        this.nodeRadius = (((width - this.leftRightPadding - this.leftRightPadding) / this.maxNodes))/2 - this.padding;
        this.init();
    }
    
    init()
    {
        var nodes = this.dataset.length;
        
        var container = new Node();
        container.x = this.leftRightPadding;
        container.y = this.topPadding;
        container.color = "blue";
        container.width = 2;
        container.type = "path";
        container.path = "";
        container.path += " M " + this.leftRightPadding + " " + this.topPadding;
        container.path += " H " + (width - this.leftRightPadding - this.leftRightPadding);
        container.path += " M " + this.leftRightPadding + " " + (this.topPadding + this.nodeHeight);
        container.path += " H " + (width - this.leftRightPadding - this.leftRightPadding);
        
        this.Nodes.push(container);
        
        var offset = this.leftRightPadding + this.nodeRadius;
        var yPos = this.topPadding + this.nodeHeight / 2;
        
        for(var i = 0; i<nodes; i++)
        {
            var n = new Node();
            n.x = offset;
            n.y = yPos;
            n.color = "orange";
            n.width = this.nodeRadius;
            n.height = this.nodeHeight;
            n.id = "node-" + i;
            n.type = "circle";
            
            n.text.value = this.dataset[i];
            n.text.color = "black";
            n.text.font = "sanserif";
            n.text.size = "14";
            n.text.x = offset;
            n.text.y = n.y + this.nodeRadius / 2 - 3;
            n.text.id = "tbar-" + i;
            
            this.Nodes.push(n);
            
            offset = offset + this.nodeRadius + this.nodeRadius + this.padding;
        }
    }
    
    CreateNewNode(number)
    {
        var offset = width - this.leftRightPadding - this.padding;
        var yPos = this.topPadding + this.nodeHeight / 2;
        
        var n = new Node();
        n.x = offset;
        n.y = yPos;
        n.color = "DodgerBlue";
        n.width = this.nodeRadius;
        n.height = this.nodeHeight;
        n.id = "node-" + this.Nodes.length;
        n.type = "circle";
            
        n.text.value = number;
        n.text.color = "black";
        n.text.font = "sanserif";
        n.text.size = "14";
        n.text.x = offset;
        n.text.y = n.y + this.nodeRadius / 2 - 3;
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
        this.Nodes[idx].x = this.Nodes[idx - 1].x + this.padding + this.nodeRadius * 2;
        this.Nodes[idx].text.x = this.Nodes[idx].x;
        
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