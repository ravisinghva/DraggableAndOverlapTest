"use strict";

$( function() {

    // Initialize Static box valiables 
    var staticDivPos = $( "#staticDiv" ).offset(); // get absolute position for overlap detection
    var staticDivW = $( "#staticDiv" ).outerWidth(); // get outer width to include border width
    var staticDivH = $( "#staticDiv" ).outerHeight(); // get outer width to include border height
    var draggableDivW = $( "#draggableDiv" ).outerWidth(); // get outer width to include border width
    var draggableDivH = $( "#draggableDiv" ).outerHeight(); // get outer width to include border height

    function onDragHandler( event, ui ) {
        var draggableDivPos = $( "#draggableDiv" ).offset(); // get absolute position for overlap detection
        var text = "";
        /*
        // for debugging output
        text += draggableDivPos.left + "," + draggableDivPos.top;
        text += ", " + (draggableDivPos.left + draggableDivW) + "," + (draggableDivPos.top + draggableDivH);
        text += " st -> " +staticDivPos.left + "," + staticDivPos.top;
        text += " st -> " +(staticDivPos.left + staticDivW) + "," + (staticDivPos.top + staticDivH);
        */
        if(
            ((draggableDivPos.left >= staticDivPos.left && draggableDivPos.left <= (staticDivPos.left + staticDivW) &&
            (draggableDivPos.top >=  staticDivPos.top && draggableDivPos.top <=  staticDivPos.top + staticDivH)) ||

            ((draggableDivPos.left >= staticDivPos.left && draggableDivPos.left <= staticDivPos.left + staticDivW) &&
            ((draggableDivPos.top + draggableDivH) >= staticDivPos.top && (draggableDivPos.top + draggableDivH) <= (staticDivPos.top + staticDivH))) ||
            
            (((draggableDivPos.left + draggableDivW) >= staticDivPos.left && (draggableDivPos.left + draggableDivW) <= (staticDivPos.left + staticDivW)) &&
            ((draggableDivPos.top + draggableDivH) >= staticDivPos.top && (draggableDivPos.top + draggableDivH) <= (staticDivPos.top + staticDivH))) ||

            (((draggableDivPos.left + draggableDivW) >= staticDivPos.left && (draggableDivPos.left + draggableDivW) <= (staticDivPos.left + staticDivW)) &&
            (draggableDivPos.top >= staticDivPos.top && draggableDivPos.top <= (staticDivPos.top + staticDivH))))
        )
        {
            var d = new Date();
            $( "#dtlabel" ).text(d.toLocaleTimeString());
            if(!$( "#staticDiv" ).hasClass("overlap"))
                $( "#staticDiv" ).addClass("overlap");
            if($( "#staticDiv" ).hasClass("nooverlap"))
                $( "#staticDiv" ).removeClass("nooverlap");
        }
        else
        {
            $( "#dtlabel" ).text(text + "Static box for Overlap Detection");
            if($( "#staticDiv" ).hasClass("overlap"))
                $( "#staticDiv" ).removeClass("overlap");
            if(!$( "#staticDiv" ).hasClass("nooverlap"))
                $( "#staticDiv" ).addClass("nooverlap");
        }
    }

    function onDragStopHandler( event, ui ) {
        // Reset position of draggable box is it is dragged out of bounds
        if(ui.position.left < 0)
            $( "#draggableDiv" ).css("left", 0);
        if(ui.position.top < 0)
            $( "#draggableDiv" ).css("top", 0);
    }
    // Make Draggable box 
    $( "#draggableDiv" ).draggable();

    // Attach On Drag event Handler
    $( "#draggableDiv" ).on( "drag", onDragHandler);
    
    // Attach On DragStop event Handler
    $( "#draggableDiv" ).on( "dragstop", onDragStopHandler);
  });
