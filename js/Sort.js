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
        
        this.dataset = [];
        this.Nodes = [];
        this.States = [];
        this.UIOptions = [];
        
        this.maxNodes = 20;
        
        this.bottomBarPadding = 50;
        this.bottomTextPadding = 30;
        
        this.dataset = ProcessInput(customValues, 8);
        this.init();
        this.UpdateUIOptions();
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
        
        var widthPerNode = width / nodes;
        var offset = 1;
        var hscale = d3.scaleLinear()
                        .domain([d3.min(this.dataset) - offset, d3.max(this.dataset)])
                        .range([0, height - this.bottomBarPadding]);
                        
        var yscale = d3.scaleLinear()
                        .domain([d3.min(this.dataset) - offset, d3.max(this.dataset)])
                        .range([height - this.bottomBarPadding, 0]);
        
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
            n.text.y = height - this.bottomTextPadding;
            n.text.id = "tbar-" + i;
            
            this.Nodes.push(n);
        }
    }
    
    UpdateUIOptions() {
        this.UIOptions.push({
                'name': 'Create', 
                'type': 'Input', 
                'inputs': ['Values']
            });
    }
    
    ProcessAction(idx, inputs) {
        if(this.UIOptions[idx].name == "Create") {
            return true;
        }
    }
    
    InsertStateSortedNode(index, tempList) {
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
        st2.text = "The values " + this.Nodes[tempList[index].id].text.value + " is sorted.";
        this.States.push(st2);
    }
    
    InsertStateSwappingNodes(index, index1, tempList) {
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
        st1.text = "Swapping values " + this.Nodes[tempList[index].id].text.value + " & " + this.Nodes[tempList[index1].id].text.value + ".";
        this.States.push(st1);
    }
    
    InsertInitialState() {
        //insert a state
        var state = new SingleState();
        for(var i = 0; i < this.Nodes.length; i++)
        {
          state.AddANode(this.Nodes[i]);
          state.Nodes[i].isUpdated = 'true';
        }
        state.text = "Initial order of values";
        this.States.push(state);
    }
    
    InsertStateSelectedNodes(index, index1, tempList) {
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
        
        if(index1 != -1) {
            st.text = "Selecting values " + this.Nodes[tempList[index].id].text.value + " & " + this.Nodes[tempList[index1].id].text.value + " for comparison.";
        }
        else {
            st.text = "Selecting value " + this.Nodes[tempList[index].id].text.value ;
        }
        
        this.States.push(st);
    }
    
    SwapMasterNodes(index, index1, tempList) {
        var t = this.Nodes[tempList[index].id].x;
        this.Nodes[tempList[index].id].x = this.Nodes[tempList[index1].id].x;
        this.Nodes[tempList[index1].id].x = t;
        
        t = this.Nodes[tempList[index].id].text.x;
        this.Nodes[tempList[index].id].text.x = this.Nodes[tempList[index1].id].text.x;
        this.Nodes[tempList[index1].id].text.x = t;
    }
    
    BubbleSort() {
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
    
    SelectionSort() {
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
    
    /* Insertion Sort Region Starts */
    
    InsertState(text) {
        //insert a state
        var st = new SingleState();
        for(var k = 0; k < this.Nodes.length; k++)
        {
            st.AddANode(this.Nodes[k]);
            st.Nodes[k].isUpdated = true;
        }
        
        st.text = text;
        
        this.States.push(st);
    }
    
    InsertionSort() {
        
        var offset = 1;
        var newheight = height / 2;
        
        var hscale = d3.scaleLinear()
                        .domain([d3.min(this.dataset) - offset, d3.max(this.dataset)])
                        .range([0, newheight - this.bottomBarPadding]);
                        
        var yscale = d3.scaleLinear()
                        .domain([d3.min(this.dataset) - offset, d3.max(this.dataset)])
                        .range([newheight - this.bottomBarPadding, 0]);
        
        var hscale1 = d3.scaleLinear()
                        .domain([d3.min(this.dataset) - offset, d3.max(this.dataset)])
                        .range([0, height - this.bottomBarPadding]);
        
        var yscale1 = d3.scaleLinear()
                        .domain([d3.min(this.dataset) - offset, d3.max(this.dataset)])
                        .range([height - this.bottomBarPadding, newheight]);
        
        var yscale2 = d3.scaleLinear()
                        .domain([d3.min(this.dataset) - offset, d3.max(this.dataset)])
                        .range([height - this.bottomBarPadding, 0]);
        
        // Re arranging nodes
        for(var i = 0; i<this.Nodes.length; i++)
        {
            this.Nodes[i].y = yscale(this.dataset[i]);
            this.Nodes[i].height = hscale(this.dataset[i]);
            
            this.Nodes[i].text.y = newheight - this.bottomTextPadding;
        }
        
        this.InsertState("Initial State");
        
        var key;
        var key_item;
        var tx = 0;
        var ttx = 0;
        
        for(i=0; i<this.Nodes.length; i++) {
            key = i;
            key_item = this.Nodes[i].text.value;
            tx = this.Nodes[key].x;
            ttx = this.Nodes[key].text.x;
            
            //Move Key to lower portion
            this.Nodes[key].y = yscale1(this.Nodes[key].text.value);
            this.Nodes[key].text.y = height - this.bottomTextPadding;
            this.Nodes[key].color = "red";
            this.InsertState("Selecting key element " + key_item);
            
            for(var j=i-1; j >= 0; j--) {
                this.Nodes[j].color = "red";
                this.InsertState("Comparing key element " + key_item + " with " + this.Nodes[j].text.value);
                
                if(key_item < this.Nodes[j].text.value) {
                    var temp = this.Nodes[j].x;
                    this.Nodes[j].x = tx;
                    tx =temp;
                    
                    temp = this.Nodes[j].text.x;
                    this.Nodes[j].text.x = ttx;
                    ttx = temp;
                    
                    var t = this.Nodes[j];
                    this.Nodes[j] = this.Nodes[j+1];
                    this.Nodes[j+1] = t;
                    
                    key = j;
                    
                    this.InsertState(key_item + " < " + this.Nodes[j+1].text.value + " is true, hence moving " + this.Nodes[j+1].text.value + " to right by 1");
                    this.Nodes[j+1].color = "green";
                }
                else {
                    this.Nodes[j].color = "green";
                    break;
                }
            }
            
            this.Nodes[key].x = tx;
            this.Nodes[key].text.x = ttx;
            this.InsertState("Inserting key element " + key_item + " into exact position.");
                        
            this.Nodes[key].y = yscale(this.Nodes[key].text.value);
            this.Nodes[key].text.y = newheight - this.bottomTextPadding;
            this.InsertState("Inserting key element " + key_item + " into exact position.");
            
            this.Nodes[key].color = "green";
            this.InsertState("Inserting key element " + key_item + " into exact position.");
        }
        
        // Re arranging nodes
        for(var i = 0; i<this.Nodes.length; i++)
        {
            this.Nodes[i].y = yscale2(this.dataset[i]);
            this.Nodes[i].height = hscale1(this.dataset[i]);
            
            this.Nodes[i].text.y = height - this.bottomTextPadding;
        }
        
        this.InsertState("Final State");
    }
    
    /* Insertion Sort Region Ends */
    
    ProcessSorting(type) {
        if(type == "BubbleSort")
        {
            this.BubbleSort();
        }
        else if(type == "SelectionSort")
        {
            this.SelectionSort();
        }
        else if(type == "InsertionSort")
        {
            this.InsertionSort();
        }
    }
}
