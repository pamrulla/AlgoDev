// JavaScript File
/*global d3*/
/* global Sort*/
/* global LinkedList*/
/*global $*/
/*global RenderData*/
/* global PlayAnimation*/
/* global Stack*/
/* global Queue*/


var controller = null;

$( document ).ready(function() {
    
    if(window['topic'] == "Sort"){
        controller = new Sort();
        ProcessRender(controller);
        ProcessSorting(controller);
    }
    else if(window['topic'] == "Stack"){
        controller = new Stack();
        ProcessRender(controller);
        //ProcessSorting(controller);
    }
    else if(window['topic'] == "Queue"){
        controller = new Queue();
        ProcessRender(controller);
        //ProcessSorting(controller);
    }
    else if(window['topic'] == "LinkedList"){
        controller = new LinkedList();
        ProcessRender(controller);
        //ProcessSorting(controller);
    }
});

function ProcessRender(controller)
{
    if(controller != null){
        RenderData(controller.Nodes);
    }
}

function ProcessSorting(controller)
{
    var type = window['typename'];
    if(type == "BubbleSort")
    {
        controller.BubbleSort();
    }
}

function buttonBackPress() {
    if(controller != null)
    {
        PlayAnimation(controller.States, false, false, true);
    }
}

function buttonForwardPress() {
    if(controller != null)
    {
        PlayAnimation(controller.States, false, true);
    }
}

function buttonRewindPress() {
    if(controller != null)
    {
        PlayAnimation(controller.States, true);
    }
}

function buttonFastforwardPress() {
    if(controller != null)
    {
        PlayAnimation(controller.States, false, false, false, true);
    }
}

function buttonPlayPress() {
    if(state=='stop'){
      state='play';
      var button = d3.select("#button_play").classed('btn-success', true); 
      button.select("i").attr('class', "fa fa-pause");
      
      if(controller != null)
      {
          PlayAnimation(controller.States);
      }
    }
    else if(state=='play' || state=='resume'){
      state = 'pause';
      d3.select("#button_play i").attr('class', "fa fa-play");  
    }
    else if(state=='pause'){
      state = 'resume';
      d3.select("#button_play i").attr('class', "fa fa-pause");
      if(controller != null)
      {
          PlayAnimation(controller.States);
      }
    }
}

function buttonStopPress(){
    state = 'stop';
    var button = d3.select("#button_play").classed('btn-success', false);
    button.select("i").attr('class', "fa fa-play");
    if(controller != null)
    {
        PlayAnimation(controller.States, true);
    }
}