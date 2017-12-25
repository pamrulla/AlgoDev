/*global d3*/
var width;
var height;
var mainSvg;
var defs;
var padding;
var state = 'stop';

var $ = jQuery.noConflict();

$( document ).ready(function() {
    width = 280;
    height = 300;
        
    padding = 5;

    mainSvg = d3.select("#sim-area")
                .append("svg")
                .attr("width", width)
                .attr("height", height);

    defs = mainSvg.append("defs");
        
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

});
