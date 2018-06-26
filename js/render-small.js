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
    photoElement.querySelector('.picture__stat--comments').textContent = picture.comments;
    photoElement.querySelector('.picture__stat--likes').textContent = picture.likes;

    return photoElement;
  };

  var setDataAttrib = function (element, j) {
    element.setAttribute('data-index', j + 1);
  };

  for (var j = 0; j < window.data.pictures.length; j++) {
    window.utility.fragment.appendChild(renderPhoto(window.data.pictures[j]));
    setDataAttrib(similarListTemplate, j);
  }

  similarListElement.appendChild(window.utility.fragment);
})();
