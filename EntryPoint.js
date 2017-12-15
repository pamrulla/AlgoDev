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
    
    controller.InsertAtEnd(10);
    //controller.BubbleSort();
    //controller.SelectionSort();
    console.log(controller.sortStates);
    PlayAnimation(controller.sortStates);
});
