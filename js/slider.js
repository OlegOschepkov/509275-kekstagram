'use strict';

window.slider = (function () {
  var utility = window.utility;
  var editorResize = window.editorResize;

  var setValueScale = function (xOfSlider, xOfPin) {
    window.editorEffects.scaleValue.setAttribute('value', utility.proportion(xOfSlider, xOfPin));
  };

  var pinX;
  var scaleLineX;

  var getPinCoords = function () {
    pinX = utility.sliderPin.offsetLeft;
    return pinX;
  };

  var getSliderCoords = function () {
    scaleLineX = utility.scaleLine.offsetLeft;
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
    editorResize.previewImg.removeAttribute('style');
    editorResize.previewImg.setAttribute('style', window.editorEffects.setNewStyle(editorResize.previewImg, scaleLineX, pinX));
    editorResize.updatePreviewStyle(utility.effectValue, utility.sizeValue);
  };

  utility.sliderPin.addEventListener('mousedown', function (evt) {
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
        // console.log(utility.scaleLineX.left);
        utility.sliderPin.style.left = 0 + 'px';
        startCoords.x = utility.scaleLine.left;
      } else if (pinX > utility.scaleLine.offsetWidth) {
        utility.sliderPin.style.left = utility.scaleLine.offsetWidth + 'px';
      } else {
        utility.sliderPin.style.left = (utility.sliderPin.offsetLeft - shift.x) + 'px';
      }
      utility.scaleLevel.style.width = utility.sliderPin.style.left;
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
