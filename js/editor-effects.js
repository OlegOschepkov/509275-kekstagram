'use strict';
window.editorEffects = (function () {
  var effect = document.querySelectorAll('.effects__item');
  var sliderBlock = document.querySelector('.img-upload__scale');
  sliderBlock.classList.add('hidden');
  var scaleValue = document.querySelector('.scale__value');
  var utility = window.utility;
  var resize = window.editorResize;
  var maxEffect;


  var clearClassAndStyle = function (element) {
    element.className = '';
    element.setAttribute('style', '');
  };

  var getEffectClass = function (element) {
    var span = element.querySelector('span');
    var effectClass;
    for (var i = 0; i < span.classList.length; i++) {
      if (span.classList.item(i).startsWith('effects__preview--')) {
        effectClass = span.classList.item(i);
      }
    }
    return effectClass;
  };

  var effectStyle;

  var setEffectClass = function (value, img) {
    clearClassAndStyle(img);
    img.classList.add(value);
    img.setAttribute('style', window.editorEffects.setNewStyle(resize.previewImg));
    utility.effectValue = window.editorEffects.setNewStyle(resize.previewImg);
  };

  var applyNewEffect = function (collection) {
    for (var i = 0; i < collection.length; i++) {
      collection[i].addEventListener('click', function (evt) {
        resize.setValueSize(utility.DEFAULT_QUANTITY);
        setEffectClass(getEffectClass(evt.currentTarget), resize.previewImg);
        utility.effectValue = maxEffect;
        resize.updatePreviewStyle(maxEffect, utility.makeResize(utility.DEFAULT_QUANTITY));
        window.utility.sliderPin.style.left = utility.scaleLine.offsetWidth + 'px';
        utility.scaleLevel.style.width = utility.sliderPin.style.left;
        if (resize.previewImg.classList.contains('effects__preview--none')) {
          sliderBlock.classList.add('hidden');
        } else if (sliderBlock.classList.contains('hidden') && !resize.previewImg.classList.contains('effects__preview--none')) {
          sliderBlock.classList.remove('hidden');
        }
      });
    }
  };

  applyNewEffect(effect);

  var setNewStyle = function (block) {
    var quantity;
    var effectName;
    var newStyle;
    var temp = ((1 / 100) * utility.getProportion()).toFixed(2); // округляю чтоб избежать бага с добавлением одной миллиардной
    if (temp <= 0) {
      temp = 0;
    } else if (temp >= 1) {
      temp = 1;
    }
    if (block.classList.contains('effects__preview--none')) {
      quantity = 0;
      effectName = 'none';
      maxEffect = '';
    } else if (block.classList.contains('effects__preview--chrome')) {
      quantity = 1 * temp;
      effectName = 'grayscale';
      maxEffect = 1;
    } else if (block.classList.contains('effects__preview--sepia')) {
      quantity = 1 * temp;
      effectName = 'sepia';
      maxEffect = 1;
    } else if (block.classList.contains('effects__preview--marvin')) {
      quantity = 100 * temp + '%';
      effectName = 'invert';
      maxEffect = '100%';
    } else if (block.classList.contains('effects__preview--phobos')) {
      quantity = temp * 3 + 'px';
      effectName = 'blur';
      maxEffect = '3px';
    } else if (block.classList.contains('effects__preview--heat')) {
      quantity = 1 + temp * 2;
      effectName = 'brightness';
      maxEffect = 3;
    } else if (quantity < 0) {
      quantity = 0;
    }
    newStyle = 'filter: ' + effectName + '(' + quantity + ');';
    maxEffect = 'filter: ' + effectName + '(' + maxEffect + ');';
    utility.effectValue = newStyle;
    return newStyle;
  };

  return {
    setNewStyle: setNewStyle,
    scaleValue: scaleValue,
    clearClassAndStyle: clearClassAndStyle,
    sliderBlock: sliderBlock,
    effectStyle: effectStyle
  };
})();
