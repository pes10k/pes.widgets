(function (pes, $) {

  pes.image = {

    displayURLInCenterOfParent: function (url, image_elm, parent_elm, callback) {

      var parent_width = parent_elm.width(),
        parent_height = parent_elm.height(),
        image_elm = $(image_elm).get(0),
        parent_elm = $(parent_elm).get(0);

      image_elm.onload = function () {

        var image_size = PES.image.scaleCords(this, parent_width, parent_height),
          image_position = PES.image.centerCords(image_size, parent_width, parent_height);

        $(image_elm).css({
          "top" : image_position.y,
          "left" : image_position.x,
          "width" : image_size.width,
          "height" : image_size.height,
          "position" : "absolute"
        })

        if (callback) {
          callback({
            elm: this,
            scale: image_size.scale
          });
        }
      };

      image_elm.src = url;
    },

    // Calculates the width and height of the image needed to
    // make it fit in the given width and height constraints.
    scaleCords: function (image, width_constraint, height_constraint) {

      var image_width = image.width,
        image_height = image.height,
        image_ratio = image_height / image_width;
  
      // First determine if the image needs to be scalled at all
      if (image_width > width_constraint) {
        image_width = width_constraint;
        image_height = image_width * image_ratio;
      }
  
      if (image_height > height_constraint) {
        image_height = height_constraint;
        image_width = image_height / image_ratio;
      }
  
      return {
        width: image_width,
        height: image_height,
        scale: image_width / image.width
      }
    },

    // Calculates that x any y cordinates needed to center a given image
    // element within the box described by width constraint
    centerCords: function (image, width_constraint, height_constraint) {

      var image_x_pos = 0,
        image_y_pos = 0;
  
      // Next, determine if we need to center the image vertically or horizontally
      if (image.height < height_constraint) {
        image_y_pos = (height_constraint - image.height) / 2;
      }
  
      if (image.width < width_constraint) {
        image_x_pos = (width_constraint - image.width) / 2;
      }
  
      return {
        x: image_x_pos,
        y: image_y_pos
      }
    }
  };
}(window.PES, jQuery));