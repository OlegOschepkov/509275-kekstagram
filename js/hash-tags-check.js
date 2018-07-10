'use strict';
window.hashTagsCheck = (function () {
  var MAX_HASH_QUANTITY = 5;
  var MAX_COMMENTARY_LENGTH = 140;
  var textArea = document.querySelector('.text__description');
  var hashTagField = document.querySelector('.text__hashtags');
  var form = document.querySelector('.img-upload__form');
  var errorWindowTemplate = document.querySelector('#picture')
    .content
    .querySelectorAll('.img-upload__message');
  var errorWindow;

  var findBlock = function (block, className) {
    Array.from(block).forEach(function (element) {
      if (element.classList.contains(className)) {
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
    var letters = element.value.split('');
    var message = (letters.length > MAX_COMMENTARY_LENGTH) ? 'Максимальная длина комментария - 140 символов' : '';
    return message;
  };

  var checkHashTagQuantity = function (element, tags) {
    var message = (tags.length > MAX_HASH_QUANTITY) ? 'Максимальное количество хешгетов - 5. Удалите один или несколько хешгетов' : '';
    return message;
  };

  var checkDuplicates = function (element, tags) {
    tags.sort();
    for (var i = 0; i < tags.length - 1; i++) {
      var message = (String(tags[i]).toUpperCase() === String(tags[i + 1]).toUpperCase()) ? 'один и тот же хэш-тег не может быть использован дважды' : '';
    }
    return message;
  };

  var checkHashTags = function (element, tags) {
    var regExp = /^#[^\s]{1,19}$/i;
    for (var i = 0; i < tags.length; i++) {
      var message = (!regExp.test(tags[i].toString())) ?
        'Пожалуйста проверьте, что хэш-тег начинается с символа # (решётка), хэш-теги разделяются пробелами, длина хештега не превышает 20 символов, также хеш-тег не может состоять только из одной решётки'
        : '';
      break;
    }
    return message;
  };

  var checkValidity = function (element) {
    var tags;
    var errorMessage;
    if (element === hashTagField) {
      tags = element.value.trim().split(/\s+/);
      errorMessage = checkHashTagQuantity(element, tags) || checkDuplicates(element, tags) || checkHashTags(element, tags);
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

  var onElementInput = function (evt) {
    if (evt.target.value !== '') {
      checkValidity(evt.target);
    } else {
      evt.target.setCustomValidity('');
      removeRedBorder(evt.target);
    }
  };

  var onSuccess = function () {
    window.editorResize.imageEditor.classList.add('hidden');
    var oldErrors = document.querySelectorAll('.img-upload__message--error');
    Array.from(oldErrors).forEach(function (element) {
      element.remove();
    });
  };

  var onError = function (errorMessage) {
    findBlock(errorWindowTemplate, 'img-upload__message--error');
    var errorElement = errorWindow.cloneNode(true);
    errorElement.classList.remove('hidden');
    errorElement.setAttribute('style', 'z-index: 111');
    errorElement.textContent = errorMessage;
    form.appendChild(errorElement);
  };

  var onSubmitForm = function (evt) {
    window.backend.save(new FormData(form), onSuccess, onError);
    evt.preventDefault();
  };

  return {
    hashTagField: hashTagField,
    textArea: textArea,
    onSubmitForm: onSubmitForm,
    form: form,
    onElementInput: onElementInput
  };

})();
