// JavaScript File
/*global d3*/
/* global Sort*/
/* global LinkedList*/
/*global $*/
/*global RenderData*/
/* global PlayAnimation*/
/* global Stack*/
/* global Queue*/

$( document ).ready(function() {
    var controller = new Queue();
    RenderData(controller.Nodes);
    
    controller.Push(10);
   // controller.BubbleSort();
    //controller.SelectionSort();
    // console.log(controller.States);
    PlayAnimation(controller.States).then(() => {
        controller.Push(12);
        PlayAnimation(controller.States);
    });
    
});
