'use strict';

window.editorResize = (function () {
  var uploadFile = document.querySelector('#upload-file');
  var imageEditor = document.querySelector('.img-upload__overlay');
  // imageEditor.classList.remove('hidden');
  var utility = window.utility;
  var editorResize = window.editorResize;

  var minusSize = document.querySelector('.resize__control--minus');
  var plusSize = document.querySelector('.resize__control--plus');
  var previewImg = utility.previewImgBlock.querySelector('img');
  var MAX_QUANITY = 100;
  var MIN_QUANITY = 25;
  var QUANITY_STEP = 25;

  uploadFile.addEventListener('change', function () {
    imageEditor.classList.remove('hidden');
    window.editorEffects.sliderBlock.classList.add('hidden');
  });

  utility.findPopupCloseButton(imageEditor).addEventListener('click', function () {
    utility.addClassHidden(imageEditor);
    imageEditor.removeAttribute('value');
    window.editorEffects.clearClassAndStyle(editorResize.previewImg);
    editorResize.setValueSize(utility.defaultQuantity);
    editorResize.quantity = utility.defaultQuantity;
  });

  var oversizeCheck = function (number) {
    if (number >= MAX_QUANITY) {
      number = MAX_QUANITY;
    } else if (number <= MIN_QUANITY) {
      number = MIN_QUANITY;
    }
    return number;
  };

  var setValueSize = function (size) {
    utility.valueSize.setAttribute('value', size + '%');
    previewImg.setAttribute('style', utility.makeResize(size));
  };

  setValueSize(utility.defaultQuantity);

  var setNewSize = function (step, increase) {
    if (increase === 1) {
      window.editorResize.quantity = window.editorResize.quantity + step;
    } else {
      window.editorResize.quantity = window.editorResize.quantity - step;
    }
    window.editorResize.quantity = oversizeCheck(window.editorResize.quantity);
    window.editorResize.setValueSize(window.editorResize.quantity);
    var size = window.editorResize.quantity / 100;
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

  return {
    QUANITY_STEP: QUANITY_STEP,
    minusSize: minusSize,
    plusSize: plusSize,
    updatePreviewStyle: updatePreviewStyle,
    quantity: window.utility.defaultQuantity,
    setValueSize: setValueSize,
    previewImg: previewImg,
    setNewSize: setNewSize
  };

})();
