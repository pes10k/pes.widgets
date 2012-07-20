(function ($) {
  $(function () {
    var file_picker = $("#image_picker"),
      selected_file_hash = false,
      $canvas = $("#image-canvas"),
      canvas = $canvas.get(0),
      selected_file_object,
      plate_selection_elm = $("<div />"),
      car_selection_form = $("#car-selection-container"),
      plate_selection_form = $("#plate-selection-container"),
      disable_form_elements = function (elm) {
        $(elm).find(":input, button").attr("disabled", "disabled");
        return elm;
      },
      enable_form_elements = function (elm) {
        $(elm).find(":input, button").removeAttr("disabled");
        return elm;
      },
      plate_selection_control,
      car_selection_control,
      current_image_scale,
      feedback_zone = $("#feedback-zone"),
      feedback_control = PES.widget.feedback(feedback_zone),
      fetch_next_plate = function () {
        feedback_control.displayInfo("Loading new image…");
        PES.plates.fetchPlate(function (data) {

          if (!data) {
            feedback_control.displayInfo("No more plates to markup");
          } else {
            feedback_control.hide();
            PES.image.displayURLInCenterOfParent(data.url, $("#image-canvas"), $("#image-canvas-container"), function (result) {
              selected_file_hash = data.hash;
              current_image_scale = result.scale;
              plate_selection_control.clear();
              car_selection_control.clear();
              feedback_control.hide();
            });
          }
        });
      };

    feedback_zone.hide();
    fetch_next_plate();

    car_selection_control = PES.widget.regionSelect($("#image-canvas-container"));
    plate_selection_control = PES.widget.regionSelect($("#image-canvas-container"), {"color" : "red"});
    plate_selection_control.disable();

    $("#car-selection, #plate-selection").click(function () {
      var is_car_selection = $(this).is("#car-selection");
      $(this).addClass("active");

      disable_form_elements(is_car_selection ? plate_selection_form : car_selection_form).hide();
      enable_form_elements(is_car_selection ? car_selection_form : plate_selection_form).show();
      (is_car_selection ? plate_selection_control : car_selection_control).disable();
      (is_car_selection ? car_selection_control : plate_selection_control).enable();
      (is_car_selection ? $("#plate-selection") : $("#car-selection")).removeClass("active");
    });

    $("#car-selection-clear, #plate-selection-clear").click(function () {
      var is_car_selection = $(this).is("#car-selection-clear");
      (is_car_selection ? car_selection_control : plate_selection_control).clear();
    });

    $("#car-selection").click();

    $("#selections-save").click(function () {
    
      var plate_selection = plate_selection_control.selection(),
        car_selection = car_selection_control.selection();

      $.post(
        "/receiver.php", {
          hash: selected_file_hash,
          ratio: current_image_scale,
          plate_cords: plate_selection,
          car_cords: car_selection,
          width: $canvas.width()
        },
        function (response) {
          if (response.error) {
            feedback_control.displayError("Some error…");
          } else {
            feedback_control.displayInfo("Some success!");
            fetch_next_plate();
          }
        },
        "json"
      )
    });
  });
}(jQuery));