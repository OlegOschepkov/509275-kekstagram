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
    window.editorEffects.sliderBlock.classList.add('hidden');
  });

  utility.findPopupCloseButton(imageEditor).addEventListener('click', function () {
    utility.addClassHidden(imageEditor);
    imageEditor.removeAttribute('value');
    window.editorEffects.clearClassAndStyle(previewImg);
    setValueSize(utility.DEFAULT_QUANTITY);
    quantity = utility.DEFAULT_QUANTITY;
  });

  var checkOversize = function (number) {
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

  setValueSize(utility.DEFAULT_QUANTITY);

  var setNewSize = function (step, increase) {
    if (increase === 1) {
      quantity = quantity + step;
    } else {
      quantity = quantity - step;
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

  minusSize.addEventListener('click', function () {
    setNewSize(QUANITY_STEP, 0);
    updatePreviewStyle(utility.effectValue, utility.sizeValue);
  });

  plusSize.addEventListener('click', function () {
    setNewSize(QUANITY_STEP, 1);
    updatePreviewStyle(utility.effectValue, utility.sizeValue);
  });

  return {
    QUANITY_STEP: QUANITY_STEP,
    minusSize: minusSize,
    plusSize: plusSize,
    updatePreviewStyle: updatePreviewStyle,
    quantity: quantity,
    setValueSize: setValueSize,
    previewImg: previewImg,
    setNewSize: setNewSize,
    imageEditor: imageEditor
  };

})();
