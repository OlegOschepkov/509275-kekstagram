'use strict';

window.editorResize = (function () {
  var uploadFile = document.querySelector('#upload-file');
  var imageEditor = document.querySelector('.img-upload__overlay');
  // imageEditor.classList.remove('hidden');
  var utility = window.utility;
  var quantity = window.utility.DEFAULT_QUANTITY;

  var minusSize = document.querySelector('.resize__control--minus');
  var plusSize = document.querySelector('.resize__control--plus');
  var previewImg = utility.previewImgBlock.querySelector('img');
  var MAX_QUANITY = 100;
  var MIN_QUANITY = 25;
  var QUANITY_STEP = 25;

  uploadFile.addEventListener('change', function () {
    imageEditor.classList.remove('hidden');
    document.addEventListener('keydown', onEscPress);
    window.editorEffects.sliderBlock.classList.add('hidden');
    utility.findPopupCloseButton(imageEditor).addEventListener('click', closeEditor);
    minusSize.addEventListener('click', onSizeClick(0));
    plusSize.addEventListener('click', onSizeClick(1));
  });

  var onEscPress = function (evt) {
    if (evt.target !== window.hashTags.hashTagField && evt.target !== window.hashTags.textArea && evt.keyCode === window.renderBig.ESC_KEYCODE) {
      closeEditor();
    }
  };

  var closeEditor = function () {
    imageEditor.removeAttribute('value');
    window.editorEffects.clearClassAndStyle(previewImg);
    setValueSize(utility.DEFAULT_QUANTITY);
    quantity = utility.DEFAULT_QUANTITY;
    utility.effectValue = '';
    utility.sizeValue = '';
    utility.addClassHidden(imageEditor);
    document.removeEventListener('keydown', onEscPress);
    minusSize.removeEventListener('click', onSizeClick(0));
    plusSize.removeEventListener('click', onSizeClick(1));
    window.upload.userPicture.setAttribute('src', 'img/upload-default-image.jpg');
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

  var onSizeClick = function (number) {
    setNewSize(QUANITY_STEP, number);
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
    closeEditor: closeEditor
  };

})();
