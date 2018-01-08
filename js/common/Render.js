// JavaScript File
/*global d3*/
/*global NodeText*/
/*global Node*/
/*global mainSvg*/
/*global width*/
/*global height*/
/*global padding*/
/*global $*/

var currentState = 0;
var idForDefs = "def-markers";

function RenderEvents(UIOptions) {
    var actions = $("#actionsdropup-list");
    actions.empty();
    
    for(var i=0; i<UIOptions.length; i++){
        if(UIOptions[i].type == "Input" || UIOptions[i].type == "Input-Event") {
            actions.append('<li><a href="#" onclick="UpdateModal('+i+');" data-toggle="modal" data-target="#actionModal">'+UIOptions[i].name+'</a></li>');        
        }
        else {
            actions.append('<li><a href="#!" onclick="ProcessAction('+i+');">'+UIOptions[i].name+'</a></li>');
        }
    }
}

function RenderData(nodesArray) {
    mainSvg.selectAll("*").remove();
    
    defs = mainSvg.append("defs")
                .attr("id", idForDefs);
        
    defs.append("marker")
        .attr("id", "Triangle")
        .attr("viewBox", "0 0 10 10")
        .attr("refX", 1)
        .attr("refY", 5)
        .attr("markerWidth", 4)
        .attr("markerHeight", 4)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M 0 0 L 10 5 L 0 10 z");
    
    for(var i=0; i < nodesArray.length; i++)
    {
        RenderOneNode(nodesArray[i]);
    }
}

function RenderOneNode(node) {
    if(node.type == "rect")
    {
        if(node.id != '') {
            mainSvg.append("rect")
                .attr("x", node.x)
                .attr("y", node.y)
                .attr("width", node.width)
                .attr("height", node.height)
                .attr("fill", node.color)
                .attr("id", node.id);
        }
        // d3.select("#"+node.id).transition()
        //                     .attr("y", node.y)
        //                     .ease(d3.easeBounce)
        //                     .duration(1000);
        if(node.text.id != '') {    
            mainSvg.append("text")
                .text(node.text.value)
                .attr("text-anchor", "middle")
                .attr("x", node.text.x)
                .attr("y", node.text.y)
                .attr("font-family", node.text.font)
                .attr("font-size", node.text.size)
                .attr("fill", node.text.color)
                .attr("id", node.text.id);
        }
    }
    if(node.type == "circle")
    {
        if(node.id != '') {
            mainSvg.append("circle")
            .attr("cx", node.x)
            .attr("cy", node.y)
            .attr("r", node.width)
            .attr("fill", node.color)
            .attr("id", node.id);
        }
            
        if(node.text.id != '') {
            mainSvg.append("text")
            .text(node.text.value)
            .attr("text-anchor", "middle")
            .attr("x", node.text.x)
            .attr("y", node.text.y)
            .attr("font-family", node.text.font)
            .attr("font-size", node.text.size)
            .attr("fill", node.text.color)
            .attr("id", node.text.id);
        }
    }
    else if(node.type == "connector")
    {
        if(node.id != '') {
            mainSvg.append("line")
                .attr("x1", node.x1)
                .attr("y1", node.y1)
                .attr("x2", node.x2)
                .attr("y2", node.y2)
                .attr("stroke-width", node.width)
                .attr("stroke", node.color)
                .attr("id", node.id)
                .attr("marker-end", "url(#Triangle)");
        }
                // .attr("marker-start", "url(#MCircle)");
    }
    else if(node.type == "path")
    {
        if(node.id != '') {
            mainSvg.append("path")
                .attr("stroke", node.color)
                .attr("stroke-width", node.width)
                .attr("fill", "none")
                .attr("d", node.path)
                .attr("id", node.id);
        }
    }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function PlayAnimation(states, isFirstFrameToRender = false, isNextFrame = false, isPrevFrame = false, isLastFrame = false) {
    if(isFirstFrameToRender){
        currentState = 0;
    }
    else if(isNextFrame) {
        currentState++;
    }
    else if(isPrevFrame) {
        --currentState;
    }
    else if(isLastFrame) {
        currentState = states.length - 1;
    }
    
    for(var i = currentState; i < states.length; i++)
    {
        if(isFirstFrameToRender || isNextFrame || isPrevFrame || isLastFrame) {
            return;
        }
        
        if(state == 'play' || state == 'resume  ') {
            await sleep(speed);
        }
        else if(state == 'stop') {
            currentState = 0;
            return;
        }
        
        currentState = i;
        $("#state-comment").html(states[i].text);
        for(var j=0; j<states[i].Nodes.length; j++)
        {
            console.log("Enterd");
            CheckAndDeleteUnwantedNodes(states[i].Nodes);
            if(states[i].Nodes[j].isUpdated)
            {
                if(states[i].Nodes[j].isDelete) {
                    if(states[i].Nodes[j].type == "rect") {
                        d3.select("#"+states[i].Nodes[j].id)
                        .remove();
                        
                        if(states[i].Nodes[j].text.id != "") {
                            d3.select("#"+states[i].Nodes[j].text.id)
                            .remove();
                        }
                        
                    }
                    else if(states[i].Nodes[j].type == "circle") {
                        d3.select("#"+states[i].Nodes[j].id)
                        .remove();
                        if(states[i].Nodes[j].text.id != "") {
                            d3.select("#"+states[i].Nodes[j].text.id)
                            .remove();
                        }
                    }
                    else if(states[i].Nodes[j].type == "connector") {
                        d3.select("#"+states[i].Nodes[j].id)
                        .remove();
                    }
                }
                else {
                    if(states[i].Nodes[j].type == "rect")
                    {
                        if (!$("#"+states[i].Nodes[j].id).length){
                            RenderOneNode(states[i].Nodes[j]);
                        }
                        d3.select("#"+states[i].Nodes[j].id).transition()
                            .attr("fill", states[i].Nodes[j].color)
                            .attr("x", states[i].Nodes[j].x)
                            .attr("y", states[i].Nodes[j].y).duration(speed / 2)
                            .duration(speed / 2);
                        if(states[i].Nodes[j].text.id != "")
                        {
                            d3.select("#"+states[i].Nodes[j].text.id).transition()
                                .attr("fill", states[i].Nodes[j].text.color)
                                .attr("x", states[i].Nodes[j].text.x)
                                .attr("y", states[i].Nodes[j].text.y)
                                .attr("text-anchor", "middle")
                                .duration(speed / 2);
                        }
                    }
                    else if(states[i].Nodes[j].type == "circle")
                    {
                        if (! $("#"+states[i].Nodes[j].id).length){
                            RenderOneNode(states[i].Nodes[j]);
                        }
                        d3.select("#"+states[i].Nodes[j].id).transition()
                            .attr("fill", states[i].Nodes[j].color)
                            .attr("cx", states[i].Nodes[j].x)
                            .attr("cy", states[i].Nodes[j].y).duration(speed / 2)
                            .duration(speed / 2);

                        if(states[i].Nodes[j].text.id != "")
                        {
                            d3.select("#"+states[i].Nodes[j].text.id).transition()
                                .attr("fill", states[i].Nodes[j].text.color)
                                .attr("x", states[i].Nodes[j].text.x)
                                .attr("y", states[i].Nodes[j].text.y)
                                .attr("text-anchor", "middle")
                                .duration(speed / 2);
                        }
                    }
                    if(states[i].Nodes[j].type == "connector")
                    {
                        if (! $("#"+states[i].Nodes[j].id).length){
                            RenderOneNode(states[i].Nodes[j]);
                        }

                        d3.select("#"+states[i].Nodes[j].id).transition()
                            .attr("x1", states[i].Nodes[j].x1)
                            .attr("y1", states[i].Nodes[j].y1)
                            .attr("x2", states[i].Nodes[j].x2)
                            .attr("y2", states[i].Nodes[j].y2).duration(speed / 2)
                            .duration(speed / 2);
                    }
                }
            }
        }
    }
    
    currentState = 0;
    buttonStopPress(true);
}

function CheckAndDeleteUnwantedNodes(Nodes) {
    var svgChildren;
    var extraIds = [];
    svgChildren = $("#mainSvg").children().map(function(){ return this.id; }).get();
    for(var i = 0; i < svgChildren.length; i++) {
        var isFound = false;
        for(var j = 0; j < Nodes.length; j++) {
            if(Nodes[j].id == svgChildren[i]) {
                isFound = true;
                break;
            }
            else if(Nodes[j].text != undefined && Nodes[j].text.id == svgChildren[i]) {
                isFound = true;
                break;
            }
        }
        if(!isFound) {
            extraIds.push(svgChildren[i]);
        }
    }
    for(var i = 0; i < extraIds.length; i++) {
        if(extraIds[i] != idForDefs) {
            $("#"+extraIds[i]).remove();
        }
    }
}