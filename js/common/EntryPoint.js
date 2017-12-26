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
    InitializeController();    
});

function InitializeController(inputs = null) {
    if(window['topic'] == "Sort"){
        controller = new Sort(inputs);
        console.log(controller);
        ProcessRender(controller);
        ProcessSorting(controller);
    }
    else if(window['topic'] == "Stack"){
        controller = new Stack(inputs);
        ProcessRender(controller);
    }
    else if(window['topic'] == "Queue"){
        controller = new Queue(inputs);
        ProcessRender(controller);
    }
    else if(window['topic'] == "LinkedList"){
        controller = new LinkedList(inputs);
        ProcessRender(controller);
    }
}

function ProcessRender(controller) {
    if(controller != null){
        RenderEvents(controller.UIOptions);
        RenderData(controller.Nodes);
    }
}

function ProcessSorting(controller) {
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
      var button = d3.select("#button_play"); 
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

function buttonStopPress(isCompleted = false){
    state = 'stop';
    var button = d3.select("#button_play").classed('btn-success', false);
    button.select("i").attr('class', "fa fa-play");
    if(controller != null && isCompleted == false)
    {
        PlayAnimation(controller.States, true);
    }
}

function UpdateModal(idx) {
    modal = $('#actionModal');
    $('#actionModalButton').html(controller.UIOptions[idx].name);
    $('#actionModalButton').attr("onclick", "ProcessAction("+idx+")");
    $('#actionModalLabel').html(controller.UIOptions[idx].name);
    var form = $("#actionModalForm");
    form.empty();
    for(var j = 0; j < controller.UIOptions[idx].inputs.length; j++) {
        var grp = form.add('<div class="form-group">');
        grp.append('<label for="'+ controller.UIOptions[idx].inputs[j] +'" class="control-label">'+ controller.UIOptions[idx].inputs[j] +':</label>');
        grp.append('<input type="text" class="form-control" id="'+ controller.UIOptions[idx].inputs[j] +'">');
        form.append('</div>');
    }
}

function ProcessAction(idx) {
    var inputs = [];
    if(controller.UIOptions[idx].type == "Input" || controller.UIOptions[idx].type == "Input-Event") {
        for(var j = 0; j < controller.UIOptions[idx].inputs.length; j++) {
            inputs.push($("#" + controller.UIOptions[idx].inputs[j]).val());
        }
    }
    
    if(controller.ProcessAction(idx, inputs)) {
        if(controller.UIOptions[idx].type == "Input") {
            InitializeController(inputs[0]);
            buttonPlayPress();
        }
        else {
            buttonPlayPress();
        }
    }
}