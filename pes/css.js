(function (pes) {

  pes.css = {
    setSizeFromStyle: function (elm) {
      var $elm = jQuery(elm);
      elm.width = $elm.css("width").replace("px", "");
      elm.height = $elm.css("height").replace("px", "");
    }
  }
}(window.PES));