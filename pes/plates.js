(function (pes, $) {

  pes.plates = {
    fetchPlate: function (callback) {
      $.get(
        "/dispatch.php",
        {},
        function(json) {
          callback(json);
        },
        "json"
      )
    }
  };

}(window.PES, jQuery));