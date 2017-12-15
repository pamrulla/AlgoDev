/*global d3*/

var width = window.innerWidth, height = window.innerWidth;
    
var padding = 5

var mainSvg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);
