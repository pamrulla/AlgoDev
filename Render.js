// JavaScript File
/*global d3*/
/*global NodeText*/
/*global Node*/
/*global mainSvg*/
/*global width*/
/*global height*/
/*global padding*/

function RenderData(nodesArray)
{
    for(var i=0; i < nodesArray.length; i++)
    {
        RenderOneNode(nodesArray[i]);
    }
}

function RenderOneNode(node)
{
    mainSvg.append("rect")
        .attr("x", node.x)
        .attr("y", 0)
        .attr("width", node.width)
        .attr("height", node.height)
        .attr("fill", node.color)
        .attr("id", node.id);
        
    d3.select("#"+node.id).transition()
                        .attr("y", node.y)
                        .ease(d3.easeBounce)
                        .duration(1000);
        
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
                d3.select("#"+states[i].Nodes[j].id).transition()
                    .attr("fill", states[i].Nodes[j].color)
                    .attr("x", states[i].Nodes[j].x).duration(1000)
                    .attr("y", states[i].Nodes[j].y).duration(1000)
                    .ease(d3.easeBounce)
                    .duration(1000);
                d3.select("#"+states[i].Nodes[j].text.id).transition()
                    .attr("fill", states[i].Nodes[j].text.color)
                    .attr("x", states[i].Nodes[j].text.x)
                    .attr("y", states[i].Nodes[j].text.y)
                    .attr("text-anchor", "middle")
                    .ease(d3.easeBounce)
                    .duration(1000);
            }
        }
        await sleep(1000);
    }
}