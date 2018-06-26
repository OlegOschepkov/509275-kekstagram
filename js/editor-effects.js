'use strict';
window.editorEffects = (function () {
  // Применение эффекта и изменение размера
  var effect = document.querySelectorAll('.effects__item');
  var sliderBlock = document.querySelector('.img-upload__scale');
  sliderBlock.classList.add('hidden');
  var scaleValue = document.querySelector('.scale__value');
  var utility = window.utility;
  var resize = window.editorResize;


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

  var applyEffect = function (collection) {
    for (var i = 0; i < collection.length; i++) {
      collection[i].addEventListener('click', function (evt) {
        resize.setValueSize(utility.defaultQuantity);
        setEffectClass(getEffectClass(evt.currentTarget), resize.previewImg);
        resize.quantity = utility.defaultQuantity;
        // utility.effectValue = '';
        if (resize.previewImg.classList.contains('effects__preview--none')) {
          sliderBlock.classList.add('hidden');
        } else if (sliderBlock.classList.contains('hidden') && !resize.previewImg.classList.contains('effects__preview--none')) {
          sliderBlock.classList.remove('hidden');
        }
      });
    }
  };

  applyEffect(effect);

  var setNewStyle = function (block) {
    var quantity;
    var effectName;
    var newStyle;
    var temp = ((1 / 100) * utility.proportion()).toFixed(2); // округляю чтоб избежать бага с добавлением одной миллиардной
    if (temp <= 0) {
      temp = 0;
    } else if (temp >= 1) {
      temp = 1;
    }
    if (block.classList.contains('effects__preview--none')) {
      quantity = 0;
      effectName = 'none';
    } else if (block.classList.contains('effects__preview--chrome')) {
      quantity = 1 * temp;
      effectName = 'grayscale';
    } else if (block.classList.contains('effects__preview--sepia')) {
      quantity = 1 * temp;
      effectName = 'sepia';
    } else if (block.classList.contains('effects__preview--marvin')) {
      quantity = 100 * temp + '%';
      effectName = 'invert';
    } else if (block.classList.contains('effects__preview--phobos')) {
      quantity = temp * 3 + 'px';
      effectName = 'blur';
    } else if (block.classList.contains('effects__preview--heat')) {
      quantity = 1 + temp * 2;
      effectName = 'brightness';
    } else if (quantity < 0) {
      quantity = 0;
    }
    newStyle = 'filter: ' + effectName + '(' + quantity + ');';
    utility.effectValue = newStyle;
    return newStyle;
  };
  // var chooseCustom = function (to, from) {
  //   var choosen = Math.floor(Math.random() * (to - from + 1) + from);
  //   console.log(choosen + ' choosen');
  //
  //   return choosen;
  // };


  return {
    setNewStyle: setNewStyle,
    scaleValue: scaleValue,
    clearClassAndStyle: clearClassAndStyle,
    sliderBlock: sliderBlock,
    effectStyle: effectStyle
  };
})();
