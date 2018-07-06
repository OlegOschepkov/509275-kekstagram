'use strict';

window.smallRender = (function () {
  var similarListElement = document.querySelector('.pictures');
  var similarListTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture__link');
  // similarListTemplate.setAttribute('data-index', 0);


  var renderPhoto = function (picture) {
    var photoElement = similarListTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = picture.url;
    photoElement.querySelector('.picture__stat--comments').textContent = window.data.countComments(picture.comments);
    photoElement.querySelector('.picture__stat--likes').textContent = picture.likes;
    photoElement.setAttribute('data-index', picture.indexForData);
    return photoElement;
  };

  // var setDataAttrib = function (element, index) {
  //   element.setAttribute('data-index', index);
  // };

  // for (var j = 0; j < window.data.pictures.length; j++) {
  //   window.utility.fragment.appendChild(renderPhoto(window.data.pictures[j]));
  //   setDataAttrib(similarListTemplate, j);
  // }
  //
  // similarListElement.appendChild(window.utility.fragment);
  // var getCollection = function () {
  //   var pics = document.querySelectorAll('.picture__link');
  //   return pics;
  // };
  //
  var renderTile = function (array) {
    array.forEach(function (element) {
      window.utility.fragment.appendChild(renderPhoto(element));
      // similarListTemplate.setAttribute();
      // setDataAttrib(similarListTemplate, element.indexForData);
    });
    similarListElement.appendChild(window.utility.fragment);
  };


  var onLoad = function (pictures) {
    pictures.forEach(function (element, index) {
      element.indexForData = index;
    });
    renderTile(pictures);
    var smallPictures = document.querySelectorAll('.picture__link');
    window.renderBig.addBigPictureListener(smallPictures);
    window.sorting.makeSorting(pictures);
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; width: 500px; height: 150px; position: absolute; top: 50%; left: 50%; transform: translateY(-50%) translateX(-50%); font-size: 30px; color: black; background-color: red; text-align: center';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var getServerData = function (data) {
    return data;
  };

  window.data.loadData(getServerData);
  window.backend.load(onLoad, onError);

  // var smallPictures;
  // onLoad.complete = function () {
  //   smallPictures = document.querySelectorAll('.picture__link');
  //   console.log(smallPictures + ' later');
  //   return smallPictures;
  // };
  //
  //
  return {
    onError: onError,
    renderTile: renderTile
  };
})();
