/*global d3*/
var dataset = [25, 20, 15, 10, 5];
var width = 400,
    height = 150;
    
var padding = 5

var mainSvg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

mainSvg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("id", function(d, i) { return "bar"+i;})
        .attr("x", function(d, i){ return (width / dataset.length) * i;  })
        .attr("y", function(d) { return height - (d*4); })
        .attr("width", width / dataset.length - padding)
        .attr("height", function(d){ return d*4; })
        .attr("fill", "orange");

mainSvg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .attr("id", function(d, i) { return "tbar"+i;})
    .text(function(d) { return d; })
    .attr("text-anchor", "middle")
    .attr("x", function(d, i) { return (i * (width / dataset.length)) + (width / dataset.length - padding)/2;  })
    .attr("y", function(d) { return height - (d*4) - padding; })
    .attr("font-family", "sanserif")
    .attr("font-size", 20)
    .attr("fill", "gray");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
  await sleep(2000);
  d3.select("#bar0").transition().style("fill", "red").duration(1000);
  d3.select("#bar1").transition().style("fill", "red").duration(1000);
  
  var x1 = parseInt(d3.select("#bar0").property("x").baseVal.value);
  var x2 = parseInt(d3.select("#bar1").property("x").baseVal.value);
  
  d3.select("#bar0").transition().attr("x", x2).duration(1000);
  d3.select("#bar1").transition().attr("x", x1).duration(1000);
  
  var tx1 = parseInt(d3.select("#tbar0").property("x").baseVal.value);
  var tx2 = parseInt(d3.select("#tbar1").property("x").baseVal.value);
  console.log("khan");
  console.log(d3.select("#tbar1"));
  //d3.select("#tbar0").transition().attr("x", tx2).duration(1000);
  //d3.select("#tbar1").transition().attr("x", tx1).duration(1000);
}

demo();