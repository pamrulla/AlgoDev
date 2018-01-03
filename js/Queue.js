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
    constructor(customValues) {
        this.Nodes = [];
        this.States = [];
        this.UIOptions = [];
        this.dataset = [];
        
        this.maxNodes = 8;
        this.ContainerNodes = 3;
        this.nodeHeight = 50;
        this.topPadding = 50;
        this.leftRightPadding = 50;
        this.padding = 2;
        this.nodeRadius = (((width - this.leftRightPadding - this.leftRightPadding) / this.maxNodes))/2 - this.padding;
        
        this.ProcessInput(customValues);
        this.init();
        this.UpdateUIOptions();
    }
    
    UpdateUIOptions() {
        this.UIOptions.push({
                'name': 'Create', 
                'type': 'Input', 
                'inputs': ['Values']
            },
                {'name': 'Enqueue', 
                'type': 'Input-Event', 
                'inputs': ['Value']
            },
            {'name': 'Dequeue', 
                'type': 'Event', 
                'inputs': []
            });
    }
    
    ProcessInput(customValues) {
        if(customValues == null)
        {
            //var dfv = "26, 17, 48, 30, 10, 36, 1, 17, 28, 44, 26, 26, 49";
            var dfv = "5, 4, 3";
            this.dataset = dfv.split(',').map(function(item) {
                return parseInt(item, 10);
            });
        }
        else
        {
            console.log(customValues);
            this.dataset = customValues.split(',').map(function(item) {
                return parseInt(item, 10);
            });
        }
    }
    
    init() {
        var nodes = this.dataset.length;
        
        if(CheckForMaxNodes(0, nodes, this.maxNodes)) {
            return;
        }
        
        for(var kk = 0; kk < this.dataset.length; kk++) {
            if(IsInvalidNumber(this.dataset[kk])) {
                return;
            }
        }
        
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
        
        var nn = new Node();
            nn.x = this.leftRightPadding;
            nn.y = (this.topPadding + this.nodeHeight + 10);
            nn.color = "transparent";
            nn.width = 100;
            nn.height = 100;
            nn.id = "head-front";
            
            nn.text.value = "Head/Front";
            nn.text.color = "black";
            nn.text.font = "sanserif";
            nn.text.size = "14";
            nn.text.x = this.leftRightPadding;
            nn.text.y = nn.y + this.nodeRadius / 2 - 3;
            nn.text.id = "thead-front";
            
            this.Nodes.push(nn);
            
        var nn1 = new Node();
            nn1.x = this.leftRightPadding;
            nn1.y = (this.topPadding + this.nodeHeight + 10);
            nn1.color = "transparent";
            nn1.width = 100;
            nn1.height = 100;
            nn1.id = "tail-rear";
            
            nn1.text.value = "Tail/Rear";
            nn1.text.color = "black";
            nn1.text.font = "sanserif";
            nn1.text.size = "14";
            nn1.text.x = (width - this.leftRightPadding - this.leftRightPadding)
            nn1.text.y = nn.y + this.nodeRadius / 2 - 3;
            nn1.text.id = "ttail-rear";
            
            this.Nodes.push(nn1);
        
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
    
    ProcessAction(idx, inputs) {
        if(this.UIOptions[idx].name == "Create") {
            return true;
        }
        else if(this.UIOptions[idx].name == "Enqueue") {
            return this.Enqueue(parseInt(inputs[0]));
        }
        else if(this.UIOptions[idx].name == "Dequeue") {
            return this.Dequeue(parseInt(inputs[0]));
        }
    }
    
    CreateNewNode(number) {
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
        
        var state = new SingleState();
        for(var i = 0; i < this.Nodes.length; i++)
        {
          state.AddANode(this.Nodes[i]);
          state.Nodes[i].isUpdated = true;
        }
        state.text = "Added new node " + number;
        this.States.push(state);
    }
    
    InsertInitialState() {
        //insert a state
        var state = new SingleState();
        for(var i = 0; i < this.Nodes.length; i++)
        {
          state.AddANode(this.Nodes[i]);
          state.Nodes[i].isUpdated = true;
        }
        state.text = "Initial state of Queue";
        this.States.push(state);
    }
    
    InsertStateToPush() {
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
        state.text = "Inserting new value " + this.Nodes[idx].text.value + " from tail.";
        this.States.push(state);
    }
    
    InsertFinalState() {
        var idx = this.Nodes.length - 1;
        this.Nodes[idx].color = "orange";
        
        //insert a state
        var state = new SingleState();
        for(var i = 0; i < this.Nodes.length; i++)
        {
          state.AddANode(this.Nodes[i]);
          state.Nodes[i].isUpdated = true;
        }
        state.text = "Final State of Queue."
        this.States.push(state);
    }
    
    SelectHeadNode() {
        var idx = this.ContainerNodes;
        this.Nodes[idx].color = "dodgerblue";
        
        //insert a state
        var state = new SingleState();
        for(var i = 0; i < this.Nodes.length; i++)
        {
          state.AddANode(this.Nodes[i]);
          state.Nodes[i].isUpdated = true;
        }
        state.text = "Selecting value " + this.Nodes[idx].text.value + " at head of queue."
        this.States.push(state);
    }
    
    InsertStateToPop() {
        var idx = this.ContainerNodes;
        for(var i = this.Nodes.length-1; i > idx; i--) {
            this.Nodes[i].x = this.Nodes[i-1].x;
            this.Nodes[i].text.x = this.Nodes[i-1].text.x;
        }
        
        this.Nodes[idx].x = this.nodeRadius;
        this.Nodes[idx].text.x = this.nodeRadius;
        
        //insert a state
        var state = new SingleState();
        for(i = 0; i < this.Nodes.length; i++)
        {
          state.AddANode(this.Nodes[i]);
          state.Nodes[i].isUpdated = true;
        }
        state.text = "Removing head node from queue."
        this.States.push(state);
    }
    
    Enqueue(number) {
        if(CheckForMaxNodes(this.Nodes.length - this.ContainerNodes, 1, this.maxNodes)) {
            return false;
        }
        
        if(IsInvalidNumber(number)) {
            return false;
        }
        
        this.States.splice(0, this.States.length);
        
        this.InsertInitialState();
        
        this.CreateNewNode(number);
        
        this.InsertStateToPush();
        
        this.InsertFinalState();
        
        return true;
    }
    
    DeletePopNode() {
        
        var idx = this.ContainerNodes;
        
        this.Nodes[idx].isDelete = true;
        
        //insert a state
        var state = new SingleState();
        for(var i = 0; i < this.Nodes.length; i++)
        {
          state.AddANode(this.Nodes[i]);
          state.Nodes[i].isUpdated = true;
        }
        state.text = "Delete head node."
        this.States.push(state);
        this.Nodes.splice(idx, 1);
    }
    
    Dequeue(number) {
        this.States.splice(0, this.States.length);
        
        this.InsertInitialState();
        
        if(this.Nodes.length != this.ContainerNodes) {
            this.SelectHeadNode(number);

            this.InsertStateToPop();

            this.DeletePopNode();

            this.InsertFinalState();
        }
        else {
            var st = new SingleState();
            st.text = "Queue is already emtpy!!!";
            this.States.push(st);
        }
        return true;
    }
}
