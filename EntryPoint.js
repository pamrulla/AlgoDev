// JavaScript File
/*global d3*/
/* global Sort*/
/* global LinkedList*/
/*global $*/
/*global RenderData*/
/* global PlayAnimation*/

$( document ).ready(function() {
    var controller = new LinkedList();
    RenderData(controller.Nodes);
    
    //controller.BubbleSort();
    //controller.SelectionSort();
    
    PlayAnimation(controller.sortStates);
});
