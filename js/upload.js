'use strict';

window.upload = (function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var fileChooser = document.querySelector('.img-upload__input');
  var preview = document.querySelector('.img-upload__preview');
  var userPicture = preview.querySelector('img');

  var uploadFile = function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        userPicture.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  fileChooser.addEventListener('change', uploadFile);

  return {
    fileChooser: fileChooser,
    userPicture: userPicture
  };

})();
