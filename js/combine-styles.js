'use strict';
(function () {
  window.editorResize.minusSize.addEventListener('click', function () {
    window.editorResize.setNewSize(window.editorResize.QUANITY_STEP, 0);
    window.editorResize.updatePreviewStyle(window.utility.effectValue, window.utility.sizeValue);
  });

  window.editorResize.plusSize.addEventListener('click', function () {
    window.editorResize.setNewSize(window.editorResize.QUANITY_STEP, 1);
    window.editorResize.updatePreviewStyle(window.utility.effectValue, window.utility.sizeValue);
  });
})();
