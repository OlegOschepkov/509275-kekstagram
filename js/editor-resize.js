'use strict';

window.editorResize = (function () {
  var uploadFile = document.querySelector('#upload-file');
  var imageEditor = document.querySelector('.img-upload__overlay');
  // imageEditor.classList.remove('hidden');


  var minusSize = document.querySelector('.resize__control--minus');
  var plusSize = document.querySelector('.resize__control--plus');
  var previewImg = window.utility.previewImgBlock.querySelector('img');
  var MAX_QUANITY = 100;
  var MIN_QUANITY = 25;
  var QUANITY_STEP = 25;

  uploadFile.addEventListener('change', function () {
    imageEditor.classList.remove('hidden');
    window.editorEffects.sliderBlock.classList.add('hidden');
  });

  window.utility.findPopupCloseButton(imageEditor).addEventListener('click', function () {
    window.utility.addClassHidden(imageEditor);
    imageEditor.removeAttribute('value');
    window.editorEffects.clearClassAndStyle(window.editorResize.previewImg);
    window.editorResize.setValueSize(window.utility.defaultQuantity);
    window.editorResize.quantity = window.utility.defaultQuantity;
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
    window.utility.valueSize.setAttribute('value', size + '%');
    previewImg.setAttribute('style', window.utility.makeResize(size));
  };

  setValueSize(window.utility.defaultQuantity);

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
    if (effectDescription === null || undefined) {
      effectDescription = '';
    } else if (sizeDescription === null || undefined) {
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
