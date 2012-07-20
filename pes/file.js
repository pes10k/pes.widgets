(function (pes) {

  pes.file = {
    drawInCenterOfCanvas: function (file, canvas, callback) {

      var reader = new FileReader(),
        image = document.createElement("img"),
        context = canvas.getContext("2d");

      image.file = file;
      image.onload = function () {
        var image_size = PES.image.scaleCords(image, canvas.width, canvas.height),
          image_position = PES.image.centerCords(image_size, canvas.width, canvas.height);
        context.drawImage(this, image_position.x, image_position.y, image_size.width, image_size.height);
        if (callback) {
          callback({
            elm: this,
            scale: image_size.scale
          });
        }
      };

      reader.onload = (function(an_image) {
        return function (e) {
          an_image.src = e.target.result;
        };
      }(image));

      reader.readAsDataURL(file);
    }
  };
}(window.PES));