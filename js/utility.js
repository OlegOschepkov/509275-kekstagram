'use strict';

window.utility = (function () {
  return {
    DEFAULT_QUANTITY: 100,
    addClassHidden: function (element) {
      element.classList.add('hidden');
    },
    findPopupCloseButton: function (element) {
      return element.querySelector('.cancel');
    },
    effectValue: '',
    previewImgBlock: document.querySelector('.img-upload__preview'),
    slider: document.querySelector('.img-upload__scale'),
    sizeValue: '',
    sliderPin: document.querySelector('.scale__pin'),
    scaleLine: document.querySelector('.scale__line'),
    scaleLevel: document.querySelector('.scale__level'),
    getProportion: function () {
      var percentage = Math.floor(100 / (window.utility.scaleLine.offsetWidth / window.utility.sliderPin.offsetLeft));
      percentage = Math.max(0, Math.min(100, percentage));
      return percentage;
    },
    valueSize: document.querySelector('.resize__control--value'),
    makeResize: function (number) {
      var newSize;
      newSize = 'transform: scale(' + (number / 100) + ');';
      window.utility.sizeValue = newSize;
      return newSize;
    },
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    getRandomElement: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    }
  };
})();
