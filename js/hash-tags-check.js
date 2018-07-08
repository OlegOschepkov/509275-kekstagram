'use strict';
window.hashTags = (function () {
  var MAX_HASH_QUANTITY = 5;
  var MAX_COMMENTARY_LENGTH = 140;
  var textArea = document.querySelector('.text__description');
  var hashTagField = document.querySelector('.text__hashtags');
  var form = document.querySelector('.img-upload__form');
  // var imageSection = document.querySelector('.img-upload');
  var errorWindowTemplate = document.querySelector('#picture')
    .content
    .querySelectorAll('.img-upload__message');
  var errorWindow;

  var findBlock = function () {
    Array.from(errorWindowTemplate).forEach(function (element) {
      if (element.classList.contains('img-upload__message--error')) {
        errorWindow = element;
      }
    });
  };

  var makeRedBorder = function (element) {
    element.setAttribute('style', 'border-color: red; border-style: double; border-width: 10px');
  };

  var removeRedBorder = function (element) {
    element.setAttribute('style', '');
  };

  var checkCommentaryLength = function (element) {
    var array = element.value.split('');
    var message = '';
    if (array.length > MAX_COMMENTARY_LENGTH) {
      message = 'Максимальная длина комментария - 140 символов';
    }
    return message;
  };

  var checkHashTagQuantity = function (element, array) {
    var message = '';
    if (array.length > MAX_HASH_QUANTITY) {
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

  var checkValidity = function (element) {
    var arrayOfTags;
    var errorMessage;
    if (element === hashTagField) {
      arrayOfTags = element.value.trim().split(/\s+/);
      errorMessage = checkHashTagQuantity(element, arrayOfTags) || checkDuplicates(element, arrayOfTags) || checkHashTags(element, arrayOfTags);
      element.setCustomValidity(errorMessage);
    } else if (element === textArea) {
      errorMessage = checkCommentaryLength(element);
      element.setCustomValidity(errorMessage);
    }
    if (errorMessage) {
      makeRedBorder(element);
    } else {
      removeRedBorder(element);
    }
  };

  var elementChecking = function (evt) {
    if (evt.target.value !== '') {
      checkValidity(evt.target);
    } else {
      evt.target.setCustomValidity('');
      removeRedBorder(evt.target);
    }
  };

  var sendSuccess = function () {
    window.editorResize.imageEditor.classList.add('hidden');
  };

  var sendError = function (errorMessage) {
    findBlock();
    var errorElement = errorWindow.cloneNode(true);
    errorElement.classList.remove('hidden');
    errorElement.setAttribute('style', 'z-index: 111');
    errorElement.textContent = errorMessage;
    window.utility.fragment.appendChild(errorElement);
    document.appendChild(window.utility.fragment);
  };

  var submitForm = function (evt) {
    window.backend.save(new FormData(form), sendSuccess, sendError);
    evt.preventDefault();
  };

  return {
    hashTagField: hashTagField,
    textArea: textArea,
    submitForm: submitForm,
    form: form,
    elementChecking: elementChecking
  };

})();
