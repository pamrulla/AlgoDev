// JavaScript File
/*global d3*/
/*global NodeText*/
/*global Node*/
/*global mainSvg*/
/*global width*/
/*global height*/
/*global padding*/
/*global $*/

function RenderData(nodesArray)
{
    for(var i=0; i < nodesArray.length; i++)
    {
        RenderOneNode(nodesArray[i]);
    }
}

function RenderOneNode(node)
{
    if(node.type == "rect")
    {
        mainSvg.append("rect")
            .attr("x", node.x)
            .attr("y", node.y)
            .attr("width", node.width)
            .attr("height", node.height)
            .attr("fill", node.color)
            .attr("id", node.id);
            
        // d3.select("#"+node.id).transition()
        //                     .attr("y", node.y)
        //                     .ease(d3.easeBounce)
        //                     .duration(1000);
            
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
    else if(node.type == "connector")
    {
        mainSvg.append("line")
                .attr("x1", node.x1)
                .attr("y1", node.y1)
                .attr("x2", node.x2)
                .attr("y2", node.y2)
                .attr("stroke-width", node.width)
                .attr("stroke", node.color)
                .attr("id", node.id)
                .attr("marker-end", "url(#Triangle)");
                // .attr("marker-start", "url(#MCircle)");
    }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function PlayAnimation(states)
{
    
    for(var i = 0; i < states.length; i++)
    {
        
        for(var j=0; j<states[i].Nodes.length; j++)
        {
            if(states[i].Nodes[j].isUpdated)
            {
                if(states[i].Nodes[j].type == "rect")
                {
                    if (! $("#"+states[i].Nodes[j].id).length){
                        RenderOneNode(states[i].Nodes[j]);
                    }
                    d3.select("#"+states[i].Nodes[j].id).transition()
                        .attr("fill", states[i].Nodes[j].color)
                        .attr("x", states[i].Nodes[j].x)
                        .attr("y", states[i].Nodes[j].y).duration(1000)
                        .duration(1000);
                    if(states[i].Nodes[j].text.id != "")
                    {
                        d3.select("#"+states[i].Nodes[j].text.id).transition()
                            .attr("fill", states[i].Nodes[j].text.color)
                            .attr("x", states[i].Nodes[j].text.x)
                            .attr("y", states[i].Nodes[j].text.y)
                            .attr("text-anchor", "middle")
                            .duration(1000);
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
                        .attr("y2", states[i].Nodes[j].y2).duration(1000)
                        .duration(1000);
                }
            }
        }
        await sleep(1000);
    }
}