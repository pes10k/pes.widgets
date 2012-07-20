(function (pes, $) {

  pes.regionSelect = function (elm, options) {

    var
      is_active = true,
      options = options || {},
      $elm = $(elm).css({position: "relative", overflow: "hidden"}),
      pos = $elm.offset(),
      pos_x = parseInt(pos.left, 10),
      pos_y = parseInt(pos.top, 10),
      shade_top_left = $(document.createElement("div")),
      selection = [[0, 0], [0, 0]],
      shade_top_left = $(document.createElement("div")).css({top: 0, left: 0}),
      shade_top = $(document.createElement("div")).css("top", 0),
      shade_top_right = $(document.createElement("div")).css({top: 0, right: 0}),
      shade_left = $(document.createElement("div")).css("left", 0),
      shade_right = $(document.createElement("div")).css("right", 0),
      shade_bottom_left = $(document.createElement("div")).css({bottom: 0, left: 0}),
      shade_bottom = $(document.createElement("div")).css("bottom", 0),
      shade_bottom_right = $(document.createElement("div")).css({bottom: 0, right: 0}),
      shades = [
        shade_top_left,
        shade_top,
        shade_top_right,
        shade_left,
        shade_right,
        shade_bottom_left,
        shade_bottom,
        shade_bottom_right
      ],
      is_dragging = false,
      shades_showing = false,
      shade_color = options.color || "black",
      border_config = options.border || "1px solid white",
      hide_shades = function () {
        $.each(shades, function () {
          $(this).hide();
        });
        selection = [[0, 0], [0, 0]];
        shades_showing = false;
      },
      show_shades = function () {
        $.each(shades, function () {
          $(this).show();
        })
        shades_showing = true;
      },
      shades_with_borders = {
        "border-bottom": shade_top,
        "border-left": shade_right,
        "border-top": shade_bottom,
        "border-right": shade_left
      },
      // Takes two coordinates (arrays with two numeric elements) and returns
      // another pair of coordinates, with the first one containing the top
      // left point of the described box, and the second describing the
      // bottom right point of the box
      adjust_cords = function (cord_one, cord_two) {

        var top_point,
          left_point,
          right_point,
          bottom_point;

        if (cord_one[0] < cord_two[0]) {

          left_point = cord_one[0];
          right_point = cord_two[0];

        } else {

          right_point = cord_one[0];
          left_point = cord_two[0];

        }

        if (cord_one[1] < cord_two[1]) {

          top_point = cord_one[1];
          bottom_point = cord_two[1];

        } else {

          bottom_point = cord_one[1];
          top_point = cord_two[1];

        }

        return [[left_point, top_point], [right_point, bottom_point]];
      },
      draw_shades_around_square = function (first_cord, second_cord) {

        var adjusted_cords = adjust_cords(first_cord, second_cord),
          top_left_cord = adjusted_cords[0],
          bottom_right_cord = adjusted_cords[1],
          left_col_width = top_left_cord[0],
          right_col_width = parseInt($elm.width(), 10) - bottom_right_cord[0],
          center_col_width = parseInt($elm.width(), 10) - left_col_width - right_col_width,
          top_row_height = top_left_cord[1],
          bottom_row_height = parseInt($elm.height(), 10) - bottom_right_cord[1],
          center_row_height = parseInt($elm.height(), 10) - top_row_height - bottom_row_height;

        shade_top_left.css({
          width: left_col_width,
          height: top_row_height,
        });
        
        shade_top.css({
          width: center_col_width,
          height: top_row_height,
          left: left_col_width,
        });

        shade_top_right.css({
          width: right_col_width,
          height: top_row_height,
        });

        shade_left.css({
          width: left_col_width,
          height: center_row_height,
          top: top_row_height
        });

        shade_right.css({
          width: right_col_width,
          height: center_row_height,
          top: top_row_height,
        });

        shade_bottom_left.css({
          width: left_col_width,
          height: bottom_row_height
        });

        shade_bottom.css({
          width: center_col_width,
          height: bottom_row_height,
          left: left_col_width
        });

        shade_bottom_right.css({
          width: right_col_width,
          height: bottom_row_height,
        });

        if (!shades_showing) {
          show_shades();
        }
      };

    // Now, do some basic configuration of the shade elements
    $.each(shades, function () {
      $(this)
        .css({
          opacity: .7,
          display: "none",
          position: "absolute",
          "background-color": shade_color,
          "z-index" : 10
        })
        .prependTo(elm);
    });

    // Additionally, configure each of the 4 inward touching shades to have
    // a border touching the inside border
    $.each(shades_with_borders, function (key, value) {
      value.css(key, border_config);
    });

    $elm
      .on("dblclick", function (event) {
        if (is_active) {
          hide_shades();
        }
      })
      .on("mousedown", function (event) {
        if (is_active) {
          hide_shades();
          selection[0] = [event.pageX - pos_x, event.pageY - pos_y];
          selection[1] = selection[0];
          is_dragging = true;
          draw_shades_around_square(selection[0], selection[1]);
        }
      })
      .on("mouseup", function (event) {
        if (is_active) {
          is_dragging = false;
        }
      })
      .on("mousemove", function (event) {
        if (is_active && is_dragging) {
          selection[1] = [event.pageX - pos_x, event.pageY - pos_y];
          draw_shades_around_square(selection[0], selection[1]);
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