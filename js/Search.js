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

class Search
{
    constructor(customValues, type) {
        this.Nodes = [];
        this.States = [];
        this.UIOptions = [];
        this.dataset = [];
        
        this.type = type;
        this.maxNodes = 10;
        this.ContainerNodes = 0;
        this.nodeHeight = 50;
        this.topPadding = 50;
        this.leftRightPadding = 10;
        this.padding = 2;
        this.nodeRadius = (((width - this.leftRightPadding - this.leftRightPadding) / this.maxNodes))/2 - this.padding;
        
        this.dataset = ProcessInput(customValues, 10);
        this.init();
        this.UpdateUIOptions();

    }
    
    UpdateUIOptions() {
        this.UIOptions.push({
                'name': 'Create', 
                'type': 'Input', 
                'inputs': ['Values']
            },
            {
                'name': 'Search', 
                'type': 'Input-Event', 
                'inputs': ['Value']
            });
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
        else if(this.UIOptions[idx].name == "Search") {
            return this.Search(parseInt(inputs[0]));
        }
    }
    
    InsertState(text) {
        var state = new SingleState();
        for(var i = 0; i < this.Nodes.length; i++)
        {
          state.AddANode(this.Nodes[i]);
          state.Nodes[i].isUpdated = true;
        }
        state.text = text;
        this.States.push(state);
    }
    
    CreateNewNode(number) {
        var offset = (width/2) - this.nodeRadius;
        var yPos = this.topPadding + this.nodeHeight * 3;
        
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
        
        this.InsertState("Searching for " + number);
    }
    
    LinearSearch(number) {
        if(IsInvalidNumber(number)) {
            return false;
        }
        
        this.States.splice(0, this.States.length);
        
        this.InsertState("Initial state of values");
        
        this.CreateNewNode(number);
        
        var isFound = false;
        var i = 0;
        
        for(i = 0; i < this.dataset.length; ++i) {
            this.Nodes[i].color = "red";
            this.InsertState("Comparing " + number + " with " + this.dataset[i]);
            
            if(number == this.dataset[i]) {
                this.Nodes[i].color = "green";
                this.InsertState("Found " + number  + " at indext " + i);
                isFound = true;
                break;
            }
            else {
                this.InsertState(number + " and " + this.dataset[i] + " are not equal.");
                this.Nodes[i].color = "orange";
            }
            
        }
        
        if(!isFound) {
            this.InsertState(number + " is not found.");
            
            this.Nodes.pop();
        
            this.InsertState(number + " is not found.");
        }
        else {
            this.Nodes[i].color = "orange";
            this.Nodes.pop();
        
            this.InsertState("Found " + number  + " at indext " + i);
        }
        return true;
    } 
    
    BinarySearch(number) {
        if(IsInvalidNumber(number)) {
            return false;
        }
        
        this.States.splice(0, this.States.length);
        
        this.Nodes.splice(0, this.Nodes.length);
        this.init();
        this.InsertState("Initial state of values");
        
        var isFound = false;
        var i = 0;
        
        for(i = 0; i < this.Nodes.length; ++i) {
            for(var j = 0; j < this.Nodes.length - i - 1; ++j) {
                if(this.Nodes[j].text.value > this.Nodes[j+1].text.value)
                {
                    var t = this.Nodes[j].x;
                    this.Nodes[j].x = this.Nodes[j+1].x;
                    this.Nodes[j+1].x = t;
                    
                    t = this.Nodes[j].text.x;
                    this.Nodes[j].text.x = this.Nodes[j+1].text.x;
                    this.Nodes[j+1].text.x = t;
                    
                    t = this.Nodes[j];
                    this.Nodes[j] = this.Nodes[j+1];
                    this.Nodes[j+1] = t;
                }
            }
        }        
        this.InsertState("Sorting the input values");
        
        this.CreateNewNode(number);
        
        var l = 0;
        var r = this.Nodes.length - 2;
        var x = number;
        var m;
        
        while (l <= r)
        {
            m = parseInt(l + (r-l)/2);
            
            this.Nodes[m].color = "red";
            this.InsertState("Finding the mid value");
            
            if (this.Nodes[m].text.value == x) {
                this.Nodes[m].color = "green";
                this.InsertState("Found " + number + " at indext " + m);
                isFound = true;
                break;
            }
            else if (this.Nodes[m].text.value < x) {
                this.Nodes[m].color = "orange";
                for(var k = l; k <= m; ++k) {
                    this.Nodes[k].y = this.nodeHeight / 2;
                    this.Nodes[k].text.y = this.Nodes[k].y + this.nodeRadius / 2 - 3;
                }
                this.InsertState("value " + x + " is greater than mid, ignore left half.")
                l = m + 1;
            }
            else {
                this.Nodes[m].color = "orange";
                for(var k = m; k <= r; ++k) {
                    this.Nodes[k].y = this.nodeHeight / 2;
                    this.Nodes[k].text.y = this.Nodes[k].y + this.nodeRadius / 2 - 3;
                }
                this.InsertState("value " + x + " is greater than mid, ignore right half.")
                r = m - 1;
            }
        }
                
        if(!isFound) {
            this.InsertState(number + " is not found.");
            
            this.Nodes.pop();
        
            this.InsertState(number + " is not found.");
        }
        else {
            this.Nodes[m].color = "orange";
            this.Nodes.pop();
        
            this.InsertState("Found " + number  + " at indext " + m);
        }
        return true;
    }
    
    Search(number) {
        if(this.type == 'LinearSearch') {
            return this.LinearSearch(number);
        }
        else if(this.type == 'BinarySearch') {
            return this.BinarySearch(number);
        }
        
        return true;
    }
}
