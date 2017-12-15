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
        this.sortStates = [];
        this.maxNodes = 6;
        this.nodeHeight = 30;
        this.widthPerNode = (width - this.maxNodes - 1) / ((this.maxNodes * 2)-1);
        this.widthOfNextPointer = this.widthPerNode * 30 / 100;
        this.widthOfData = this.widthPerNode - this.widthOfNextPointer;
        this.topPadding = 50;
        this.leftPadding = 0;
        
        this.NumberOfSVGNodesPerListNode = 3;
        
        this.init();
    }
    
    init()
    {
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
    
    InsertInitialState()
    {
        //insert a state
        var state = new SingleState();
        for(var i = 0; i < this.Nodes.length; i++)
        {
          state.AddANode(this.Nodes[i]);
        }
        this.sortStates.push(state);
    }
    
    InsertStateSelectedNodes(index)
    {
        //insert a state
        var st = new SingleState();
        for(var k = 0; k < this.Nodes.length; k++)
        {
            st.AddANode(this.Nodes[k]);
            st.Nodes[k].isUpdated = true;
            if(k == index)
            {
                st.Nodes[k].color = "OrangeRed";
            }
        }
        this.sortStates.push(st);
    }
    
    InsertStateFoundFinalNode(index)
    {
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
        this.sortStates.push(st);
    }
    
    InsertAtEnd(number)
    {
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
        
        PreparedData[idx].Next = idx + 1;
        PreparedData.push({Data: number, Id: idx + 1, Next: -1});
    }
}