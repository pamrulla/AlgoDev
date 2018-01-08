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
        ProcessRender(controller);
        var type = window['typename'];
        controller.ProcessSorting(type);
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
    
    buttonStopPress();
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

function ShowErrorModal(content = "This is the error") {
    $("#errorModalForm").html(content);
    $("#errorModal").modal({show: true});
}

function CheckForMaxNodes(existingNodesCount, newNodesCount, maxNodesAllowed) {
    if((existingNodesCount + newNodesCount) > maxNodesAllowed) {
        ShowErrorModal("Maximum nodes allowed are " + maxNodesAllowed);
        return true;
    }
}

function IsInvalidNumber(number) {
    if(isNaN(number)) {
        ShowErrorModal('<p>Invalid input</p><h6>Rules for input:</h6><ul><li>Values should be separated by comma</li><li>No special characters are allowed other than comma</li><li>Only integers allowed.</li><li>Range should be 0 to 255</li></ul>');
        return true;
    }
    else {
        if(number > 255 || number < 0) {
            ShowErrorModal('<p>Invalid input</p><h6>Rules for input:</h6><ul><li>Values should be separated by comma</li><li>No special characters are allowed other than comma</li><li>Only integers allowed.</li><li>Range should be 0 to 255</li></ul>');
            return true;
        }
    }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function ProcessInput(customValues, numberOfDefault) {
    var dataset = [];
    if(customValues == null)
    {
        while(numberOfDefault--) {
            dataset.push(getRandomInt(0, 50));
        }
    }
    else
    {
        dataset = customValues.split(',').map(function(item) {
            return parseInt(item, 10);
        });
    }
    
    return dataset;
}

function processSpeed(value) {
    speed = defaultSpeed / value;
}