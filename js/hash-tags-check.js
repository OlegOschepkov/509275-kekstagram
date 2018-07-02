'use strict';
(function () {
  var hashTagField = document.querySelector('.text__hashtags');
  var form = document.querySelector('.img-upload__form');

  var checkHashTagQuantity = function (element, array) {
    var message = '';
    if (array.length > 5) {
      message = 'Максимальное количество хешгетов - 5. Удалите один или несколько хешгетов';
    }
    return message;
  };

  var checkDuplicates = function (element, array) {
    var message = '';
    array.sort();
    for (var i = 0; i < array.length - 1; i++) {
      if (String(array[i]).toUpperCase() === String(array[i + 1]).toUpperCase()) {
        message = 'один и тот же хэш-тег не может быть использован дважды';
      }
    }
    return message;
  };

  var checkHashTags = function (element, array) {
    var message = '';
    var regExp = /^#[^\s]{1,19}$/i;
    for (var i = 0; i < array.length; i++) {
      if (regExp.test(array[i].toString()) === false) {
        message =
          'Пожалуйста проверьте, что хэш-тег начинается с символа # (решётка), хэш-теги разделяются пробелами, длина хештега не превышает 20 символов, также хеш-тег не может состоять только из одной решётки'
        ;
        break;
      }
    }
    return message;
  };

  var checkHashTagValidity = function (element) {
    var arrayOfTags = element.value.trim().split(/\s+/);
    var errorMessage = checkHashTagQuantity(element, arrayOfTags) || checkDuplicates(element, arrayOfTags) || checkHashTags(element, arrayOfTags);
    element.setCustomValidity(errorMessage);
  };

  hashTagField.addEventListener('input', function () {
    checkHashTagValidity(hashTagField);
  });

  var sendSuccess = function () {
    window.editorResize.imageEditor.classList.add('hidden');
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), sendSuccess, window.smallRender.onError);
    evt.preventDefault();
  });

})();
