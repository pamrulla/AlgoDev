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
        
        this.NumberOfSVGNodesPerListNode = 3;
        
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
                {'name': 'InsertAtEnd', 
                'type': 'Input-Event', 
                'inputs': ['Value']
            });
    }
    
    ProcessInput(customValues) {
        if(customValues == null)
        {
            //var dfv = "26, 17, 48, 30, 10, 36, 1, 17, 28, 44, 26, 26, 49";
            var dfv = "5, 4, 3, 2, 1";
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
            n.id = "node-" + i;
            
            n.text.value = this.dataset[i];
            n.text.color = "black";
            n.text.font = "sanserif";
            n.text.size = "14";
            n.text.x = offset + this.widthOfData / 2;
            n.text.y = this.topPadding + (this.nodeHeight / 2) + 7;
            n.text.id = "tbar-" + i;
            
            this.Nodes.push(n);
            
            offset += this.widthOfData;
            
            var n1 = new Node();
            n1.x = offset;
            n1.y = this.topPadding;
            n1.color = "lightblue";
            n1.width = this.widthOfNextPointer;
            n1.height = this.nodeHeight;
            n1.id = "pnode-" + i;
            
            this.Nodes.push(n1);
            
            offset += this.widthOfNextPointer;
            
            if(i != nodes-1)
            {
                var con = new Connector();
                con.x1 = n1.x + n1.width / 2;
                con.y1 = n1.y + n1.height / 2;
                con.x2 = con.x1 + this.widthPerNode;
                con.y2 = con.y1;
                con.id = "con" + i;
                
                this.Nodes.push(con);
            }
            
            offset += this.widthPerNode;
            
        }
    }
    
    ProcessAction(idx, inputs) {
        if(this.UIOptions[idx].name == "Create") {
            return true;
        }
        else if(this.UIOptions[idx].name == "InsertAtEnd") {
            this.InsertAtEnd(parseInt(inputs[0]));
            return true;
        }
    }    
    
    InsertInitialState() {
        //insert a state
        var state = new SingleState();
        for(var i = 0; i < this.Nodes.length; i++)
        {
          state.AddANode(this.Nodes[i]);
        }
        this.States.push(state);
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
        n.id = "node-" + this.Nodes.length;
        
        n.text.value = number;
        n.text.color = "black";
        n.text.font = "sanserif";
        n.text.size = "14";
        n.text.x = offset + this.widthOfData / 2;
        n.text.y = y + (this.nodeHeight / 2) + 7;
        n.text.id = "tbar-" + this.Nodes.length;
        
        n.isUpdated = true;
        
        this.Nodes.push(n);
        
        offset += this.widthOfData;
        
        var n1 = new Node();
        n1.x = offset;
        n1.y = y;
        n1.color = "lightblue";
        n1.width = this.widthOfNextPointer;
        n1.height = this.nodeHeight;
        n1.id = "pnode-" + this.Nodes.length;
        
        n1.isUpdated = true;
        
        this.Nodes.push(n1);
    }
    
    InserStateForNewLink(idx) {
        this.CreateLink(idx);
        
        //insert a state
        var st = new SingleState();
        for(var k = 0; k < this.Nodes.length; k++)
        {
            st.AddANode(this.Nodes[k]);
            st.Nodes[k].isUpdated = true;
        }
        this.States.push(st);
    }
    
    CreateLink(idx) {
        var parentIdx = idx;
        var newIdx = this.Nodes.length - 2;
        
        var n1 = this.Nodes[idx+1];
        var n2 = this.Nodes[newIdx];
        
        var con = new Connector();
        con.x1 = n1.x + n1.width / 2;
        con.y1 = n1.y + n1.height / 2;
        con.x2 = n2.x + n2.width / 2;
        con.y2 = n2.y;
        con.id = "con" + ((idx / this.NumberOfSVGNodesPerListNode));
        con.isUpdated = true;
        
        this.Nodes.splice(newIdx, 0, con);
        
    }
    
    ReArrangeList(number) {
        this.dataset.push(number);
        
        var offset = 0;
        
        var i = 0;
        
        while(i<this.Nodes.length)
        {
            offset += this.leftPadding;
            
            this.Nodes[i].x = offset;
            this.Nodes[i].y = this.topPadding;
            this.Nodes[i].color = "orange";
            
            this.Nodes[i].text.x = offset + this.widthOfData / 2;
            this.Nodes[i].text.y = this.topPadding + (this.nodeHeight / 2) + 7;
            
            
            offset += this.widthOfData;
            
            ++i;
            
            this.Nodes[i].x = offset;
            this.Nodes[i].y = this.topPadding;
            this.Nodes[i].color = "lightblue";
            
            
            offset += this.widthOfNextPointer;
            
            ++i;
            
            if(i != this.Nodes.length)
            {
                this.Nodes[i].x1 = this.Nodes[i-1].x + this.Nodes[i-1].width / 2;
                this.Nodes[i].y1 = this.Nodes[i-1].y + this.Nodes[i-1].height / 2;
                this.Nodes[i].x2 = this.Nodes[i].x1 + this.widthPerNode;
                this.Nodes[i].y2 = this.Nodes[i].y1;
            }    
            offset += this.widthPerNode;
            
            ++i;
        }
        
        //insert a state
        var st = new SingleState();
        for(var k = 0; k < this.Nodes.length; k++)
        {
            st.AddANode(this.Nodes[k]);
            st.Nodes[k].isUpdated = true;
            
            
        }
        this.States.push(st);
    }
    
    InsertAtEnd(number) {
        this.States.splice(0, this.States.length);
        
        this.CreateNewNode(number);
        
        var PreparedData = [];
        
        for (var i = 0; i < this.dataset.length; i++)
        {
            if (i != this.dataset.length - 1)
            {
                PreparedData.push({ Data: this.dataset[i], Id: i, Next: i + 1 });
            }
            else
            {
                PreparedData.push({ Data: this.dataset[i], Id: i, Next: -1 });
            }
        }
        
        this.InsertInitialState();
       
        var idx = 0;
        var isEnd = PreparedData[idx].Next;
        
        this.InsertStateSelectedNodes(idx*this.NumberOfSVGNodesPerListNode);
        
        while(isEnd != -1)
        {
            isEnd = PreparedData[isEnd].Next;
            idx++;
            this.InsertStateSelectedNodes(idx*this.NumberOfSVGNodesPerListNode);
        }
        
        this.InsertStateFoundFinalNode(idx*this.NumberOfSVGNodesPerListNode);
        
        this.InserStateForNewLink(idx*this.NumberOfSVGNodesPerListNode);
        
        this.ReArrangeList(number);
        
        PreparedData[idx].Next = idx + 1;
        PreparedData.push({Data: number, Id: idx + 1, Next: -1});
    }
}