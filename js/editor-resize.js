'use strict';

window.editorResize = (function () {
  var MAX_QUANITY = 100;
  var MIN_QUANITY = 25;
  var QUANITY_STEP = 25;
  var quantity = window.utility.DEFAULT_QUANTITY;
  var uploadFile = document.querySelector('#upload-file');
  var imageEditor = document.querySelector('.img-upload__overlay');
  var utility = window.utility;

  var minusSize = document.querySelector('.resize__control--minus');
  var plusSize = document.querySelector('.resize__control--plus');
  var previewImg = utility.previewImgBlock.querySelector('img');


  uploadFile.addEventListener('change', function () {
    imageEditor.classList.remove('hidden');
    document.addEventListener('keydown', onEscPress);
    window.editorEffects.sliderBlock.classList.add('hidden');
    utility.findPopupCloseButton(imageEditor).addEventListener('click', onEditorClose);
    minusSize.addEventListener('click', onSizeClickMinus);
    plusSize.addEventListener('click', onSizeClickPlus);
    window.hashTagsCheck.form.addEventListener('submit', window.hashTagsCheck.onSubmitForm);
    imageEditor.addEventListener('input', window.hashTagsCheck.onElementInput);
    utility.sliderPin.addEventListener('mousedown', window.slider.onSliderMove);
  });

  var onEscPress = function (evt) {
    if (evt.target !== window.hashTagsCheck.hashTagField && evt.target !== window.hashTagsCheck.textArea && evt.keyCode === window.renderBig.ESC_KEYCODE) {
      onEditorClose();
    }
  };

  var onEditorClose = function () {
    imageEditor.removeAttribute('value');
    window.editorEffects.clearClassAndStyle(previewImg);
    setValueSize(utility.DEFAULT_QUANTITY);
    quantity = utility.DEFAULT_QUANTITY;
    utility.effectValue = '';
    utility.sizeValue = '';
    utility.addClassHidden(imageEditor);
    document.removeEventListener('keydown', onEscPress);
    minusSize.removeEventListener('click', onSizeClickMinus);
    plusSize.removeEventListener('click', onSizeClickPlus);
    utility.findPopupCloseButton(imageEditor).removeEventListener('click', onEditorClose);
    window.hashTagsCheck.form.removeEventListener('submit', window.hashTagsCheck.onSubmitForm);
    imageEditor.removeEventListener('input', window.hashTagsCheck.onElementInput);
    window.upload.userPicture.setAttribute('src', 'img/upload-default-image.jpg');
    utility.sliderPin.removeEventListener('mousedown', window.slider.onSliderMove);
  };


  var setValueSize = function (size) {
    utility.valueSize.setAttribute('value', size + '%');
    previewImg.setAttribute('style', utility.makeResize(size));
  };

  setValueSize(utility.DEFAULT_QUANTITY);

  var checkOversize = function (number) {
    if (number >= MAX_QUANITY) {
      number = MAX_QUANITY;
    } else if (number <= MIN_QUANITY) {
      number = MIN_QUANITY;
    }
    return number;
  };

  var setNewSize = function (step, increase) {
    if (increase === 1) {
      quantity = parseInt(utility.valueSize.getAttribute('value'), 10) + step;
    } else {
      quantity = parseInt(utility.valueSize.getAttribute('value'), 10) - step;
    }
    quantity = checkOversize(quantity);
    setValueSize(quantity);
    var size = quantity / 100;
    return size;
  };

  var updatePreviewStyle = function (effectDescription, sizeDescription) {
    var effect = effectDescription;
    var size = sizeDescription;
    if (effectDescription === null || effectDescription === undefined) {
      effectDescription = '';
    } else if (sizeDescription === null || sizeDescription === undefined) {
      sizeDescription = '';
    } else {
      previewImg.setAttribute('style', effect + size);
    }
  };

  var onSizeClickPlus = function () {
    setNewSize(QUANITY_STEP, 1);
    updatePreviewStyle(utility.effectValue, utility.sizeValue);
  };

  var onSizeClickMinus = function () {
    setNewSize(QUANITY_STEP, 0);
    updatePreviewStyle(utility.effectValue, utility.sizeValue);
  };

  return {
    QUANITY_STEP: QUANITY_STEP,
    minusSize: minusSize,
    plusSize: plusSize,
    updatePreviewStyle: updatePreviewStyle,
    quantity: quantity,
    setValueSize: setValueSize,
    previewImg: previewImg,
    setNewSize: setNewSize,
    imageEditor: imageEditor,
    onEditorClose: onEditorClose
  };

})();
