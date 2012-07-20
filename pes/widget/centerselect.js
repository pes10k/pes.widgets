(function (pes, $) {

  var adjust_cords = function (cords, element) {
    
  }

  pes.centerSelect = function (elm, options) {

    var
      is_active = true,
      options = options || {},
      $elm = $(elm).css({
        "position" : "relative",
        "overflow" : "hidden",
        "cursor" : "pointer"
      }),
      pos = $elm.offset(),
      pos_x = parseInt(pos.left, 10),
      pos_y = parseInt(pos.top, 10),
      selection = [-1, -1],
      $center_elm = $("<div />")
        .css({
          "width" : "10px",
          "height" : "10px",
          "opacity" : .9,
          "border" : "1px solid black",
          "background-color" : "white",
          "border-radius" : "5px",
          "position" : "relative",
          "display" : "none"
        }),
      // "private" functions
      hide_center = function () {
        selection = [-1, -1];
        center_elm.hide();
      },
      place_center_at_selection = function () {
        $center_elm.css({
          "left" : selection[0],
          "top" : selection[1]
        });
      }

    $elm
      .on("dblclick", function (event) {
        if (is_active) {
          hide_center();
        }
      })
      .on("mousedown", function (event) {
        if (is_active) {
          hide_center();
          selection = [event.pageX - pos_x, event.pageY - pos_y];
          place_center_at_selection();
          $center_elm.show();
        }
      });

    return {
      selection: function () {
        return adjust_cords(selection[0], selection[1]);
      },
      clear: function () {
        hide_shades();
      },
      disable: function () {
        is_active = false;
      },
      enable: function () {
        is_active = true;
      }
    };
  };

}(window.PES.widget, jQuery));
