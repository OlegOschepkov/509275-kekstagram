'use strict';
(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureBlocks = bigPicture.querySelector('.social__comments');
  bigPicture.querySelector('.close');

  var MIN_AVATAR_NUMBER = 1; // эти две переменные отвечают за подбор случайного аватара (в задании src="img/avatar-{{случайное число от 1 до 6}}.svg")
  var MAX_AVATAR_NUMBER = 6;
  var AVATAR_HEIGHT = 35;
  var AVATAR_WIDTH = 35;
  var AVATAR_ALT = 'Аватар комментатора фотографии';

  var createNewElement = function (picture, commArray) {
    var arrLenght = window.data.countComments(commArray);
    for (var i = 0; i < arrLenght; i++) {
      var listElem = document.createElement('li');
      listElem.className = 'social__comment social__comment--text';
      bigPictureBlocks.appendChild(listElem);
      var avatarAndText = document.createElement('img');
      var textBlock = document.createElement('p');
      listElem.appendChild(avatarAndText);
      listElem.appendChild(textBlock);
      avatarAndText.className = 'social__picture';
      avatarAndText.setAttribute('src', 'img/avatar-' + window.utility.getRandomInt(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER) + '.svg');
      avatarAndText.setAttribute('alt', AVATAR_ALT);
      avatarAndText.setAttribute('width', AVATAR_HEIGHT);
      avatarAndText.setAttribute('height', AVATAR_WIDTH);
      textBlock.insertAdjacentHTML('afterBegin', picture.commentsText[i]);
    }
    return listElem;
  };

  var renderBigPicture = function (picture) {
    bigPicture.querySelector('img').src = picture.url;
    bigPicture.querySelector('.comments-count').textContent = picture.comments;
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.social__caption').textContent = picture.description;
    bigPicture.classList.remove('hidden');
    createNewElement(picture, picture.commentsText);
  };

  var getIndexAndRender = function (evt) {
    var i = evt.currentTarget.getAttribute('data-index');
    renderBigPicture(window.data.pictures[i]);
  };

  var addBigPictureListener = function (collection) {
    for (var i = 0; i < collection.length; i++) {
      collection[i].addEventListener('click', getIndexAndRender);
    }
  };

  var smallPictures = document.querySelectorAll('.picture__link');

  addBigPictureListener(smallPictures);

  var removeOldElements = function () {
    var oldComments = bigPicture.querySelectorAll('.social__comment--text');
    for (var i = 0; i < oldComments.length; i++) {
      oldComments[i].remove();
    }
  };

  window.utility.findPopupCloseButton(bigPicture).addEventListener('click', function () {
    removeOldElements();
    window.utility.addClassHidden(bigPicture);
  });

})();