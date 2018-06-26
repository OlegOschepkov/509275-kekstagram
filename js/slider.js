'use strict';
window.slider = (function () {

  var setValueScale = function (xOfSlider, xOfPin) {
    window.editorEffects.scaleValue.setAttribute('value', window.utility.proportion(xOfSlider, xOfPin));
  };

  var pinX;
  var scaleLineX;

  var getPinCoords = function () {
    pinX = window.utility.sliderPin.offsetLeft;
    return pinX;
  };

  var getSliderCoords = function () {
    scaleLineX = window.utility.scaleLine.offsetLeft;
    return scaleLineX;
  };

  var translatePinToEffect = function () {
    pinX = getPinCoords();
    scaleLineX = getSliderCoords();
    setValueScale(scaleLineX, pinX);
  };

  var renewStyle = function () {
    pinX = getPinCoords();
    scaleLineX = getSliderCoords();
    window.editorResize.previewImg.removeAttribute('style');
    window.editorResize.previewImg.setAttribute('style', window.editorEffects.setNewStyle(window.editorResize.previewImg, scaleLineX, pinX));
    window.editorResize.updatePreviewStyle(window.utility.effectValue, window.utility.sizeValue);
  };

  window.utility.sliderPin.addEventListener('mousedown', function (evt) {
    translatePinToEffect();
    renewStyle();
    var startCoords = {
      x: evt.clientX
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
      };

      startCoords = {
        x: moveEvt.clientX
      };

      if (pinX < 0) {
        // console.log(startCoords.x);
        // console.log(window.utility.scaleLineX.left);
        window.utility.sliderPin.style.left = 0 + 'px';
        startCoords.x = window.utility.scaleLine.left;
      } else if (pinX > window.utility.scaleLine.offsetWidth) {
        window.utility.sliderPin.style.left = window.utility.scaleLine.offsetWidth + 'px';
      } else {
        window.utility.sliderPin.style.left = (window.utility.sliderPin.offsetLeft - shift.x) + 'px';
      }
      window.utility.scaleLevel.style.width = window.utility.sliderPin.style.left;
      translatePinToEffect();
      renewStyle();

    };

    var onMouseUp = function (upEvt) {
      translatePinToEffect();
      onMouseMove(upEvt);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
