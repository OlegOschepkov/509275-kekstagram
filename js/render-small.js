'use strict';

(function () {
  var similarListElement = document.querySelector('.pictures');
  var similarListTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture__link');
  similarListTemplate.setAttribute('data-index', 0);


  var renderPhoto = function (picture) {
    var photoElement = similarListTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = picture.url;
    photoElement.querySelector('.picture__stat--comments').textContent = window.data.countComments(picture.comments);
    photoElement.querySelector('.picture__stat--likes').textContent = picture.likes;

    return photoElement;
  };

  var setDataAttrib = function (element, j) {
    element.setAttribute('data-index', j + 1);
  };

  // for (var j = 0; j < window.data.pictures.length; j++) {
  //   window.utility.fragment.appendChild(renderPhoto(window.data.pictures[j]));
  //   setDataAttrib(similarListTemplate, j);
  // }

  // similarListElement.appendChild(window.utility.fragment);

  var onLoad = function (pictures) {
    for (var i = 0; i < window.data.COUNT_OF_PICTURES; i++) {
      window.utility.fragment.appendChild(renderPhoto(pictures[i]));
      setDataAttrib(similarListTemplate, i);
    }
    similarListElement.appendChild(window.utility.fragment);
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; width: 500px; height: 150px; position: absolute; top: 50%; left: 50%; transform: translateY(-50%) translateX(-50%); font-size: 30px; color: black; background-color: red; text-align: center';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(onLoad, onError);
})();
