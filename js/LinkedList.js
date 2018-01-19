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

class LinkedList
{
    constructor(customValues) {
        this.dataset = [];
        this.Nodes = [];
        this.States = [];
        this.UIOptions = [];
        
        this.maxNodes = 6;
        this.nodeHeight = 30;
        this.widthPerNode = (width - this.maxNodes - 1) / ((this.maxNodes * 2)-1);
        this.widthOfNextPointer = this.widthPerNode * 30 / 100;
        this.widthOfData = this.widthPerNode - this.widthOfNextPointer;
        this.topPadding = 50;
        this.leftPadding = 0;
        this.NodeCounter = 0;
                
        this.NumberOfSVGNodesPerListNode = 3;
        
        this.dataset = ProcessInput(customValues, 3);
        this.init();
        this.UpdateUIOptions();
    }
    
    UpdateUIOptions() {
        this.UIOptions.push({
                'name': 'Create', 
                'type': 'Input', 
                'inputs': ['Values']
            },
                {'name': 'InsertAtTail', 
                'type': 'Input-Event', 
                'inputs': ['Value']
            },
                {'name': 'InsertAtHead', 
                'type': 'Input-Event', 
                'inputs': ['Value']
            },
                {'name': 'InsertAtIndex', 
                'type': 'Input-Event', 
                'inputs': ['Position', 'Value', ]
            },
                {'name': 'RemoveAtTail', 
                'type': 'Event', 
                'inputs': []
            },
                {'name': 'RemoveAtHead', 
                'type': 'Event', 
                'inputs': []
            },
                {'name': 'RemoveAtIndex', 
                'type': 'Input-Event', 
                'inputs': ['Position']
            },
                {'name': 'Search', 
                'type': 'Input-Event', 
                'inputs': ['Value', ]
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
        
        var offset = 0;
        
        for(var i = 0; i<nodes; i++)
        {
            offset += this.leftPadding;
            
            var n = new Node();
            n.x = offset;
            n.y = this.topPadding;
            n.color = "orange";
            n.width = this.widthOfData;
            n.height = this.nodeHeight;
            n.id = "node-" + this.NodeCounter;
            
            n.text.value = this.dataset[i];
            n.text.color = "black";
            n.text.font = "sanserif";
            n.text.size = "14";
            n.text.x = offset + this.widthOfData / 2;
            n.text.y = this.topPadding + (this.nodeHeight / 2) + 7;
            n.text.id = "tbar-" + this.NodeCounter;
            
            this.Nodes.push(n);
            
            offset += this.widthOfData;
            
            var n1 = new Node();
            n1.x = offset;
            n1.y = this.topPadding;
            n1.color = "lightblue";
            n1.width = this.widthOfNextPointer;
            n1.height = this.nodeHeight;
            n1.id = "pnode-" + this.NodeCounter;
            
            this.Nodes.push(n1);
            
            offset += this.widthOfNextPointer;
            
            if(i != nodes-1)
            {
                var con = new Connector();
                con.x1 = n1.x + n1.width / 2;
                con.y1 = n1.y + n1.height / 2;
                con.x2 = con.x1 + this.widthPerNode;
                con.y2 = con.y1;
                con.id = "con" + this.NodeCounter;
                
                this.Nodes.push(con);
            }
            
            offset += this.widthPerNode;
            this.NodeCounter++;
            
        }
        
    }
    
    ProcessAction(idx, inputs) {
        
        if(this.UIOptions[idx].name == "Create") {
            return true;
        }
        else if(this.UIOptions[idx].name == "InsertAtTail") {
            return this.InsertAtEnd(parseInt(inputs[0]));
        }        
        else if(this.UIOptions[idx].name == "InsertAtHead") {
            return this.InsertAtHead(parseInt(inputs[0]));
        }
        else if(this.UIOptions[idx].name == "InsertAtIndex") {
            return this.InsertAtIndex(parseInt(inputs[0]), parseInt(inputs[1]));
        }
        else if(this.UIOptions[idx].name == "RemoveAtTail") {
            return this.RemoveAtTail();
        }
        else if(this.UIOptions[idx].name == "RemoveAtHead") {
            return this.RemoveAtHead();
        }
        else if(this.UIOptions[idx].name == "RemoveAtIndex") {
            return this.RemoveAtIndex(parseInt(inputs[0]));
        }
        else if(this.UIOptions[idx].name == "Search") {
            return this.Search(parseInt(inputs[0]));
        }
        return false;
    }    
    
    InsertInitialState() {
        //insert a state
        this.States.push(this.AddNodesToState("Initial State of Linked List"));
    }
    
    InsertStateSelectedNodes(index) {
        //insert a state
        var st = new SingleState();
        for(var k = 0; k < this.Nodes.length; k++)
        {
            st.AddANode(this.Nodes[k]);
            st.Nodes[k].isUpdated = true;
            if(k == index && k != this.Nodes.length-1)
            {
                st.Nodes[k].color = "OrangeRed";
                st.text = "Select the node " + st.Nodes[k].text.value;
            }
        }        
        this.States.push(st);
    }
    
    InsertStateFoundFinalNode(index) {
        //insert a state
        var st = new SingleState();
        for(var k = 0; k < this.Nodes.length; k++)
        {
            st.AddANode(this.Nodes[k]);
            st.Nodes[k].isUpdated = true;
            if(k == index)
            {
                st.Nodes[k].color = "DodgerBlue";
                st.text = "Select the target node " + st.Nodes[k].text.value;
            }
        }
        this.States.push(st);
    }
    
    CreateNewNode(number) {
        var x = width / 4;
        var y = height /2;// - this.nodeHeight;
        
        var offset = x;
        
        var n = new Node();
        n.x = offset;
        n.y = y;
        n.color = "DodgerBlue";
        n.width = this.widthOfData;
        n.height = this.nodeHeight;
        n.id = "node-" + this.NodeCounter;
        
        n.text.value = number;
        n.text.color = "black";
        n.text.font = "sanserif";
        n.text.size = "14";
        n.text.x = offset + this.widthOfData / 2;
        n.text.y = y + (this.nodeHeight / 2) + 7;
        n.text.id = "tbar-" + this.NodeCounter;
        
        n.isUpdated = true;
        
        this.Nodes.push(n);
        
        offset += this.widthOfData;
        
        var n1 = new Node();
        n1.x = offset;
        n1.y = y;
        n1.color = "lightblue";
        n1.width = this.widthOfNextPointer;
        n1.height = this.nodeHeight;
        n1.id = "pnode-" + this.NodeCounter;
        
        n1.isUpdated = true;
        
        this.Nodes.push(n1);
        //insert a state
        this.States.push(this.AddNodesToState("Added new node " + number));
    }
    
    InserStateForNewLink(fromIdx, toIdx, conId) {
        this.CreateLink(fromIdx, toIdx, conId);
        
        //insert a state
        this.States.push(this.AddNodesToState("Creating links between new node and target node"));
    }
    
    InsertStateForModifyLink(fromIdx, toIdx) {
        var con = this.Nodes[fromIdx];
        var toNode = this.Nodes[toIdx];
        
        con.x2 = toNode.x + toNode.width / 2;
        con.y2 = toNode.y + toNode.height / 2;
        
        this.States.push(this.AddNodesToState("Update the links"));
    }
    
    CreateLink(fromIdx, toIdx, conId) {
        
        var fromNode = this.Nodes[fromIdx];
        var toNode = this.Nodes[toIdx];
        
        var con = new Connector();
        con.x1 = fromNode.x + fromNode.width / 2;
        con.y1 = fromNode.y + fromNode.height / 2;
        con.x2 = toNode.x + toNode.width / 2;
        con.y2 = toNode.y + toNode.height / 2;
        con.id = "con" + conId;
        con.isUpdated = true;
        
        this.Nodes.splice(fromIdx+1, 0, con);
        
    }
    
    ReArrangeList(number) {
        var offset = 0;
        
        var j = 0;
        
        while(j<this.Nodes.length)
        {
            offset += this.leftPadding;
            
            this.Nodes[j].x = offset;
            this.Nodes[j].y = this.topPadding;
            this.Nodes[j].color = "orange";
            
            this.Nodes[j].text.x = offset + this.widthOfData / 2;
            this.Nodes[j].text.y = this.topPadding + (this.nodeHeight / 2) + 7;
            
            
            offset += this.widthOfData;
            
            ++j;
            
            this.Nodes[j].x = offset;
            this.Nodes[j].y = this.topPadding;
            this.Nodes[j].color = "lightblue";
            
            
            offset += this.widthOfNextPointer;
            
            ++j;
            
            if(j != this.Nodes.length)
            {
                this.Nodes[j].x1 = this.Nodes[j-1].x + this.Nodes[j-1].width / 2;
                this.Nodes[j].y1 = this.Nodes[j-1].y + this.Nodes[j-1].height / 2;
                this.Nodes[j].x2 = this.Nodes[j].x1 + this.widthPerNode;
                this.Nodes[j].y2 = this.Nodes[j].y1;
            }    
            offset += this.widthPerNode;
            
            ++j;
        }
        
        //insert a state
        this.States.push(this.AddNodesToState("Final State of Linked List"));
    }
    
    AddNodesToState(text) {
        var st = new SingleState();
        for(var k = 0; k < this.Nodes.length; k++)
        {
            st.AddANode(this.Nodes[k]);
            st.Nodes[k].isUpdated = true;
        }
        st.text = text;
        return st;
    }
    
    InsertAtEnd(number) {
        
        if(CheckForMaxNodes(this.dataset.length, 1, this.maxNodes)) {
            return false;
        }
        
        if(IsInvalidNumber(number)) {
            return false;
        }
        
        var isEmpty = this.IsEmpty();
        
        this.States.splice(0, this.States.length);
        
        this.InsertInitialState();
       
        this.CreateNewNode(number);
        
        if(!isEmpty) {
            var i = 0;
            var idx = 0;

            for(;i<this.dataset.length; i++) {
                this.InsertStateSelectedNodes(i*this.NumberOfSVGNodesPerListNode);
            }

            idx = i - 1;

            this.InsertStateFoundFinalNode(idx*this.NumberOfSVGNodesPerListNode);

            this.InserStateForNewLink(idx*this.NumberOfSVGNodesPerListNode + 1, this.Nodes.length - 2, this.NodeCounter);
        }
        this.ReArrangeList();
        
        this.dataset.push(number);
        
        this.NodeCounter++;
        
        return true;
    }
    
    IsEmpty() {
        return this.Nodes.length == 0;
    }
    
    InsertAtHead(number) {
        
        if(CheckForMaxNodes(this.dataset.length, 1, this.maxNodes)) {
            return false;
        }
        
        if(IsInvalidNumber(number)) {
            return false;
        }
        
        var isEmpty = this.IsEmpty();
        
        this.States.splice(0, this.States.length);
        
        this.InsertInitialState();
        
        this.CreateNewNode(number);
        
        if(!isEmpty) {
            var idx = 0;

            this.InsertStateSelectedNodes(idx*this.NumberOfSVGNodesPerListNode);
            this.InsertStateFoundFinalNode(idx*this.NumberOfSVGNodesPerListNode);

            this.InserStateForNewLink(this.Nodes.length - 1, idx, this.NodeCounter);

            this.Nodes.unshift(this.Nodes.pop());
            this.Nodes.unshift(this.Nodes.pop());
            this.Nodes.unshift(this.Nodes.pop());
        }
        
        this.ReArrangeList();
        
        this.dataset.unshift(number);
        
        this.NodeCounter++;
        
        return true;
    }
    
    InsertAtIndex(pos, number) {
        if(CheckForMaxNodes(this.dataset.length, 1, this.maxNodes)) {
            return false;
        }
        
        if(IsInvalidNumber(number)) {
            return false;
        }
        
        if(IsInvalidNumber(pos)) {
            return false;
        }
        
        var isEmpty = this.IsEmpty();
        if(pos == 0 || isEmpty) {
            this.InsertAtHead(number);
            return true;
        }
        else if(pos == this.dataset.length - 1) {
            this.InsertAtEnd(number);
            return true;
        }
        else if(pos >= this.dataset.length || pos < 0) {
            console.log("Error");
            return false;
        }
        
        this.States.splice(0, this.States.length);
        
        this.InsertInitialState();
       
        this.CreateNewNode(number);
        
        var i = 0;
        var idx = 0;
        
        for(;i<pos; i++) {
            this.InsertStateSelectedNodes(i*this.NumberOfSVGNodesPerListNode);
        }
        
        idx = i-1;
        
        this.InsertStateFoundFinalNode(idx*this.NumberOfSVGNodesPerListNode);
        
        
        this.InserStateForNewLink(this.Nodes.length - 1, (idx+1)*this.NumberOfSVGNodesPerListNode, this.NodeCounter);
        
        this.InsertStateForModifyLink(idx*this.NumberOfSVGNodesPerListNode + 2, this.Nodes.length - 2);
        
        this.Nodes.splice(i*this.NumberOfSVGNodesPerListNode, 0, this.Nodes.pop());
        this.Nodes.splice(i*this.NumberOfSVGNodesPerListNode, 0, this.Nodes.pop());
        this.Nodes.splice(i*this.NumberOfSVGNodesPerListNode, 0, this.Nodes.pop());
        
        this.ReArrangeList();
        
        this.dataset.push(number);
        
        this.NodeCounter++;
        
        return true;
    }
    
    RemoveAtTail() {
        var isEmpty = this.IsEmpty();
        
        this.States.splice(0, this.States.length);
        
        this.InsertInitialState();
        
        if(!isEmpty) {
            var i = 0;
            var idx = 0;

            for(;i<this.dataset.length; i++) {
                this.InsertStateSelectedNodes(i*this.NumberOfSVGNodesPerListNode);
            }

            idx = i - 1;

            this.InsertStateFoundFinalNode(idx*this.NumberOfSVGNodesPerListNode);

            this.InsertStateForDeletion(idx*this.NumberOfSVGNodesPerListNode);

            this.Nodes.pop();
            this.Nodes.pop();
            this.Nodes.pop();

            this.ReArrangeList();
            this.dataset.pop();
        }
        else {
            var st = new SingleState();
            st.text = "List is already Empty!!!";
            this.States.push(st);
        }
        
        return true;
    }
    
    InsertStateForDeletion(idx) {
        var st = new SingleState();
        
        if(idx == 0){
            
        }
        else if(idx == (this.Nodes.length - 2)) {
            this.Nodes[idx - 1].isDelete = true;
        }
        else{
            var con = this.Nodes[idx - 1];
            var toNode = this.Nodes[idx + this.NumberOfSVGNodesPerListNode];

            con.x2 = toNode.x + toNode.width / 2;
            con.y2 = toNode.y + toNode.height / 2;
        }
        
        for(var k = 0; k < this.Nodes.length; k++)
        {
            st.AddANode(this.Nodes[k]);
            st.Nodes[k].isUpdated = true;
            if(idx == k || (idx+1) == k || (idx+2) == k) {
                st.Nodes[k].isDelete = true;
            }
        }
        
        st.text = "This Node " + this.Nodes[idx].text.value + " is removed.";
        
        this.States.push(st);
    }
    
    RemoveAtHead() {
        var isEmpty = this.IsEmpty();
        
        this.States.splice(0, this.States.length);
        
        this.InsertInitialState();
        
        if(!isEmpty) {
            var idx = 0;

            this.InsertStateSelectedNodes(idx*this.NumberOfSVGNodesPerListNode);
            this.InsertStateFoundFinalNode(idx*this.NumberOfSVGNodesPerListNode);

            this.InsertStateForDeletion(idx*this.NumberOfSVGNodesPerListNode);

            this.Nodes.shift();
            this.Nodes.shift();
            this.Nodes.shift();

            this.ReArrangeList();

            this.dataset.shift();
        }
        else {
            var st = new SingleState();
            st.text = "List is already Empty!!!";
            this.States.push(st);
        }
        return true;
    }
    
    RemoveAtIndex (pos) {
        
        if(pos == 0 || this.IsEmpty()) {
            this.RemoveAtHead();
            return true;
        }
        else if(pos == this.dataset.length - 1) {
            this.RemoveAtTail();
            return true;
        }
        else if(pos >= this.dataset.length) {
            console.log("Error");
            return false;
        }
        
        this.States.splice(0, this.States.length);
        
        this.InsertInitialState();
       
        var i = 0;
        var idx = 0;
        
        for(;i<pos; i++) {
            this.InsertStateSelectedNodes(i*this.NumberOfSVGNodesPerListNode);
        }
        
        idx = i;
        
        this.InsertStateFoundFinalNode(idx*this.NumberOfSVGNodesPerListNode);
        
        this.InsertStateForDeletion(idx*this.NumberOfSVGNodesPerListNode);
        
        this.Nodes.splice(idx*this.NumberOfSVGNodesPerListNode, 3);
        
        this.ReArrangeList();
        
        this.dataset.splice(idx, 1);
        
        return true;
    }
    
    InsertFoundState(i, number) {
        var st = new SingleState();
        
        for(var k = 0; k < this.dataset.length; k++)
        {
            st.AddANode(this.Nodes[k*this.NumberOfSVGNodesPerListNode]);
            st.Nodes[k*this.NumberOfSVGNodesPerListNode].isUpdated = true;
            
            st.AddANode(this.Nodes[k*this.NumberOfSVGNodesPerListNode+1]);
            st.Nodes[k*this.NumberOfSVGNodesPerListNode+1].isUpdated = true;
            
            if(k != this.dataset.length - 1) {
                st.AddANode(this.Nodes[k*this.NumberOfSVGNodesPerListNode+2]);
                st.Nodes[k*this.NumberOfSVGNodesPerListNode+2].isUpdated = true;
            }
            
            if(i == k) {
                st.Nodes[k*this.NumberOfSVGNodesPerListNode].color = "green";
            }
            else {
                st.Nodes[k*this.NumberOfSVGNodesPerListNode].color = "orange";
            }
        }
        
        if(i != -1) {
            st.text = "This value " + number + " is found at " + i;
        }
        else {
            st.text = "This value " + number + " is not found.";
        }
        
        this.States.push(st);
    }
    
    Search(number) {
        
        if(IsInvalidNumber(number)) {
            return false;
        }
        
        this.States.splice(0, this.States.length);
        
        this.InsertInitialState();
        
        var i = 0;
        var idx = 0;
        
        for(;i<this.dataset.length; i++) {
            this.InsertStateSelectedNodes(i*this.NumberOfSVGNodesPerListNode);
            if(this.dataset[i] == number) {
                this.InsertStateFoundFinalNode(i*this.NumberOfSVGNodesPerListNode);
                this.InsertFoundState(i, number);
                return true;
            }
        }
        
        this.InsertFoundState(-1, number);
        return true;
    }
}