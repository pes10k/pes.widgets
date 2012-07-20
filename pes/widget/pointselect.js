(function (pes, $) {
  "use strict";

  pes.pointSelect = function (elm, options) {

    var
      is_active = true,
      options = options || {},
      width = options.width || 10,
      height = options.width || 10,
      $elm = $(elm).css({
        "position" : "relative",
        "overflow" : "hidden",
        "cursor" : "pointer"
      }),
      pos = $elm.offset(),
      pos_x = parseInt(pos.left, 10),
      pos_y = parseInt(pos.top, 10),
      selection = [-1, -1],
      // The center element is the small point we drop down to mark which point
      // the user selected as the relevant point.
      $center_elm = $("<div />")
        .css({
          "width" : width,
          "height" : height,
          "opacity" : .9,
          "border" : "1px solid black",
          "background-color" : options.color || "white",
          "border-radius" : "5px",
          "position" : "absolute",
          "display" : "none"
        })
        .insertAfter($elm),
      // "private" functions
      hide_center = function () {
        selection = [-1, -1];
        $center_elm.hide();
      },
      place_center_at_selection = function () {
        $center_elm.css({
          "left" : selection[0],
          "top" : selection[1]
        });
      },
      dispatch_position_update = function () {
        var event = document.createEvent("Event");
        event.initEvent('centerChanged', true, false);
        event.position = selection;
        $elm.get(0).dispatchEvent(event);
      };

    // Allow clients to register for event updates for when the center point
    // changes.

    $elm
      .on("dblclick", function (event) {

        if (is_active) {
          dispatch_position_update();
          hide_center();
        }
      })
      .on("click", function (event) {
        if (is_active) {
          hide_center();
          selection = [event.pageX - Math.floor(width / 2), event.pageY - Math.floor(height / 2)];
          place_center_at_selection();
          dispatch_position_update();
          $center_elm.show();
        }
      });

    return {
      selection: function () {
        return selection;
      },
      clear: function () {
        hide_center();
      },
      disable: function () {
        $elm.css("cursor", "default");
        is_active = false;
      },
      enable: function () {
        $elm.css("cursor", "pointer");
        is_active = true;
      }
    };
  };

}(window.PES.widget, jQuery));
