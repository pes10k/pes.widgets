(function (pes, $) {

  pes.feedback = function (elm, options) {

    var $elm = $(elm);

    return {
      displayInfo: function (text) {
        this.setMessage(text)
          .clearClasses()
          .setClass("alert alert-info")
          .show()
          .hideIn(5);
        return this;
      },
      displayError: function (text) {
        this.setMessage(text)
          .clearClasses()
          .setClass("alert alert-error")
          .show()
          .hideIn(5);
        return this;
      },
      setMessage: function (text) {
        $elm.text(text);
        return this;
      },
      hideIn: function (secs) {
        setTimeout(function () {
          $elm.fadeOut();
          $elm.removeClass();
        }, secs * 1000);
        return this;
      },
      hide: function () {
        $elm.fadeOut();
        return this;
      },
      show: function () {
        $elm.fadeIn();
        return this;
      },
      clearClasses : function () {
        $elm.removeClass();
        return this;
      },
      setClass: function (class_name) {
        $elm.addClass(class_name);
        return this;
      },
      elm: function () {
        return $elm;
      }
    };
  };

}(window.PES.widget, jQuery));