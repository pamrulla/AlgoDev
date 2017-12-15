// JavaScript File
/*global d3*/
/*global NodeText*/
/*global Node*/
/*global mainSvg*/
/*global width*/
/*global height*/
/*global padding*/
/*global SingleState*/

class Sort {
    constructor(customValues) {
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
        
        this.init();
    }
    
    init()
    {
        var nodes = this.dataset.length;
        var widthPerNode = width / nodes;
        var offset = 1;
        var bottomBarPadding = 50;
        var bottomTextPadding = 30;
        var hscale = d3.scaleLinear()
                        .domain([d3.min(this.dataset) - offset, d3.max(this.dataset)])
                        .range([0, height - bottomBarPadding]);
                        
        var yscale = d3.scaleLinear()
                        .domain([d3.min(this.dataset) - offset, d3.max(this.dataset)])
                        .range([height - bottomBarPadding, 0]);
        
        for(var i = 0; i<nodes; i++)
        {
            var n = new Node();
            n.x = widthPerNode * i;
            n.y = yscale(this.dataset[i]);
            n.color = "orange";
            n.width = widthPerNode - padding;
            n.height = hscale(this.dataset[i]);
            n.id = "bar-" + i;
            
            n.text.value = this.dataset[i];
            n.text.color = "gray";
            n.text.font = "sanserif";
            n.text.size = "20";
            n.text.x = (widthPerNode * i) + ((widthPerNode - padding) / 2);
            n.text.y = height - bottomTextPadding;
            n.text.id = "tbar-" + i;
            
            this.Nodes.push(n);
        }
    }
    
    InsertStateSortedNode(index, tempList)
    {
        var st2 = new SingleState();
        for(var k = 0; k < this.Nodes.length; k++)
        {
            st2.AddANode(this.Nodes[k]);
            st2.Nodes[k].isUpdated = true;
            if(k == tempList[index].id)
            {
                st2.Nodes[k].color = "green";
                this.Nodes[tempList[index].id].color = "green";
            }
        }
        this.sortStates.push(st2);
    }
    
    InsertStateSwappingNodes(index, index1, tempList)
    {
        //insert a state
        var st1 = new SingleState();
        for(var k = 0; k < this.Nodes.length; k++)
        {
            st1.AddANode(this.Nodes[k]);
            st1.Nodes[k].isUpdated = true;
            if(k == tempList[index].id || k == tempList[index1].id)
            {
                st1.Nodes[k].color = "red";
            }
        }
        
        this.sortStates.push(st1);
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
    
    InsertStateSelectedNodes(index, index1, tempList)
    {
        //insert a state
        var st = new SingleState();
        for(var k = 0; k < this.Nodes.length; k++)
        {
            st.AddANode(this.Nodes[k]);
            st.Nodes[k].isUpdated = true;
            if(k == tempList[index].id)
            {
                st.Nodes[k].color = "red";
            }
            else if(index1 != -1 && k == tempList[index1].id)
            {
                st.Nodes[k].color = "red";
            }
        }
        this.sortStates.push(st);
    }
    
    SwapMasterNodes(index, index1, tempList)
    {
        var t = this.Nodes[tempList[index].id].x;
        this.Nodes[tempList[index].id].x = this.Nodes[tempList[index1].id].x;
        this.Nodes[tempList[index1].id].x = t;
        
        t = this.Nodes[tempList[index].id].text.x;
        this.Nodes[tempList[index].id].text.x = this.Nodes[tempList[index1].id].text.x;
        this.Nodes[tempList[index1].id].text.x = t;
    }
    
    BubbleSort()
    {
      var tempList = [];
      for(var i=0; i<this.dataset.length; i++)
      {
        tempList.push({value: this.dataset[i], id: i});
      }
    
      this.InsertInitialState();
      
      //Bubble Sorting
      for(i=0; i<tempList.length; i++)
      {
        var j =0;
        for(; j<tempList.length - i - 1; j++)
        {
          this.InsertStateSelectedNodes(j, j+1, tempList);
          
          if(tempList[j].value > tempList[j+1].value)
          {
            this.SwapMasterNodes(j, j+1, tempList);
            
            var t = tempList[j];
            tempList[j] = tempList[j+1];
            tempList[j+1] = t;
            
            this.InsertStateSwappingNodes(j, j+1, tempList);
            
          }
        }
        
        this.InsertStateSortedNode(j, tempList);
      }
      
    }
    
    SelectionSort()
    {
      var tempList = [];
      for(var i=0; i<this.dataset.length; i++)
      {
        tempList.push({value: this.dataset[i], id: i});
      }
      
      this.InsertInitialState();
      
      var min;
      var min_idx;
      
      for(i=0; i<tempList.length; i++)
      {
          min_idx = i;
          for(var j=i+1; j<tempList.length; j++)
          {
              this.InsertStateSelectedNodes(j, min_idx, tempList);
              
              if(tempList[min_idx].value > tempList[j].value)
              {
                  min = tempList[j];
                  min_idx = j;
                  this.InsertStateSelectedNodes(j, -1, tempList);
              }
          }
          
          
          this.SwapMasterNodes(i, min_idx, tempList);
            
          var t = tempList[i];
          tempList[i] = tempList[min_idx];
          tempList[min_idx] = t;
          
          this.InsertStateSwappingNodes(i, min_idx, tempList);
          
          this.InsertStateSortedNode(i, tempList);
      }
    }
}