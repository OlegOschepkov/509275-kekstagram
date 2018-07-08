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
    // sliderCoords: document.querySelector('.img-upload__scale').getBoundingClientRect(),
    sizeValue: '',
    sliderPin: document.querySelector('.scale__pin'),
    // pinCoords: document.querySelector('.scale__pin').getBoundingClientRect(),
    scaleLine: document.querySelector('.scale__line'),
    scaleLevel: document.querySelector('.scale__level'),
    getProportion: function () {
      var percentage = Math.floor(100 / (window.utility.scaleLine.offsetWidth / window.utility.sliderPin.offsetLeft));
      if (percentage < 0) {
        percentage = 0;
      } else if (percentage > 100) {
        percentage = 100;
      }
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
    },
    fragment: document.createDocumentFragment(),
  };
})();
