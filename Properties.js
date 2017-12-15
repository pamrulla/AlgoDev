/*global d3*/

var width = window.innerWidth, height = window.innerWidth;
    
var padding = 5

var mainSvg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

var defs = mainSvg.append("defs");
    
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
    
    // defs.append("marker")
    //     .attr("id", "MCircle")
    //     .attr("viewBox", "0 0 10 10")
    //     .attr("refX", 0)
    //     .attr("refY", 0)
    //     .attr("markerWidth", 4)
    //     .attr("markerHeight", 4)
    //     .attr("orient", "auto")
    //     .append("circle")
    //     .attr("cx", "0")
    //     .attr("cy", "0")
    //     .attr("r", "5");
        
// <defs>
//     <marker id="Triangle" viewBox="0 0 10 10" refX="1" refY="5"
//         markerWidth="6" markerHeight="6" orient="auto">
//       <path d="M 0 0 L 10 5 L 0 10 z" />
//     </marker>
//   </defs>