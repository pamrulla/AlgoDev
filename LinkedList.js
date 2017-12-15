// JavaScript File
/*global d3*/
/*global NodeText*/
/*global Node*/
/*global mainSvg*/
/*global width*/
/*global height*/
/*global padding*/
/*global SingleState*/

class LinkedList
{
    constructor(customValues)
    {
        if(isNaN(customValues))
        {
            //var dfv = "26, 17, 48, 30, 10, 36, 1, 17, 28, 44, 26, 26, 49";
            var dfv = "5, 4, 3, 2, 1";
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
        this.maxNodes = 10;
        
        this.init();
    }
    
    init()
    {
        var nodes = this.dataset.length;
        var widthPerNode = (width - this.maxNodes - 1) / ((this.maxNodes * 2)-1);
        var nodeHeight = 50;
        var widthOfNextPointer = widthPerNode * 30 / 100;
        var widthOfData = widthPerNode - widthOfNextPointer;
        var topPadding = 50;
        var leftPadding = 0;
        
        var offset = 0;
        
        for(var i = 0; i<nodes; i++)
        {
            offset += leftPadding;
            
            var n = new Node();
            n.x = offset;
            n.y = topPadding;
            n.color = "orange";
            n.width = widthOfData;
            n.height = nodeHeight;
            n.id = "node-" + i;
            
            n.text.value = this.dataset[i];
            n.text.color = "black";
            n.text.font = "sanserif";
            n.text.size = "14";
            n.text.x = offset + widthOfData / 2;
            n.text.y = topPadding + (nodeHeight / 2) + 7;
            n.text.id = "tbar-" + i;
            
            this.Nodes.push(n);
            
            offset += widthOfData;
            
            var n1 = new Node();
            n1.x = offset;
            n1.y = topPadding;
            n1.color = "lightblue";
            n1.width = widthOfNextPointer;
            n1.height = nodeHeight;
            n1.id = "pnode-" + i;
            
            this.Nodes.push(n1);
            
            offset += widthOfNextPointer;
            
            offset += widthPerNode;
            
        }
    }
}