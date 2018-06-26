'use strict';

var bigPicture = document.querySelector('.big-picture');
var comentCount = document.querySelector('.social__comment-count');
var addComment = document.querySelector('.social__loadmore');
var bigPictureBlocks = bigPicture.querySelector('.social__comments');
var similarListElement = document.querySelector('.pictures');
var similarListTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture__link');
similarListTemplate.setAttribute('data-index', 0);
bigPicture.querySelector('.close');


var commentStrings = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var descriptions = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var COUNT_OF_PICTURES = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_COMMENTS = 1;
var MAX_COMMENTS = 6;
// var BIG_PICTURE_INDEX = 0;
var MIN_AVATAR_NUMBER = 1; // эти две переменные отвечают за подбор случайного аватара (в задании src="img/avatar-{{случайное число от 1 до 6}}.svg")
var MAX_AVATAR_NUMBER = 6;
var AVATAR_HEIGHT = 35;
var AVATAR_WIDTH = 35;
var AVATAR_ALT = 'Аватар комментатора фотографии';

var hideBlock = function (block) {
  block.classList.add('visually-hidden');
};

hideBlock(comentCount);
hideBlock(addComment);

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};


// создаю и перемешиваю массив номеров фоток
var generateSrcArray = function (countOfPicures) {
  var array = [];
  for (var i = 0; i < countOfPicures; i++) {
    array.push(i);
  }
  return array;
};

function shuffle(array) {
  var randomIndex;
  var temp;
  for (var i = array.length - 1; i > 0; i--) {
    randomIndex = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}

var sourceLinks = shuffle(generateSrcArray(COUNT_OF_PICTURES));

// создаю массив комментов для каждой фотки.
var generateComments = function (commentsArr, min, max) {
  var messageArray = [];
  for (var j = 0; j <= getRandomInt(min, max); j++) {
    var singleComment;
    if (Math.random() > 0.5) {
      singleComment = getRandomElement(commentsArr) + ' ' + getRandomElement(commentsArr);
    } else {
      singleComment = getRandomElement(commentsArr);
    }
    messageArray.push(singleComment);
  }
  return messageArray;
};

// считаю кол-во комментов в массиве
var countComments = function (array) {
  return array.length;
};

var generateDescription = function (descriptionArr) {
  return getRandomElement(descriptionArr);
};

// создаю массив картинок и присваиваю свойства
var generatePictures = function (commentsArr, descriptionArr) {
  var picturesArr = [];
  for (var i = 0; i < COUNT_OF_PICTURES; i++) {
    var commentsArray = generateComments(commentStrings, MIN_COMMENTS, MAX_COMMENTS);
    var picture = {
      url: 'photos/' + (sourceLinks[i] + 1) + '.jpg',
      likes: getRandomInt(MIN_LIKES, MAX_LIKES),
      comments: countComments(commentsArray),
      commentsText: commentsArray,
      description: generateDescription(descriptionArr)
    };
    picturesArr.push(picture);
  }
  return picturesArr;
};

var pictures = generatePictures(commentStrings, descriptions);

// отрисовка маленьких картинок с лайками и кол-вом комментов
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

//  вставляю разметку для комментов и прочего у большой картинки, кол-во блоков li зависит от кол-ва комментов
var createNewElement = function (picture, commArray) {
  var arrLenght = countComments(commArray);
  for (var j = 0; j < arrLenght; j++) {
    var listElem = document.createElement('li');
    listElem.className = 'social__comment social__comment--text';
    bigPictureBlocks.appendChild(listElem);
    var avatarAndText = document.createElement('img');
    var textBlock = document.createElement('p');
    listElem.appendChild(avatarAndText);
    listElem.appendChild(textBlock);
    avatarAndText.className = 'social__picture';
    avatarAndText.setAttribute('src', 'img/avatar-' + getRandomInt(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER) + '.svg');
    avatarAndText.setAttribute('alt', AVATAR_ALT);
    avatarAndText.setAttribute('width', AVATAR_HEIGHT);
    avatarAndText.setAttribute('height', AVATAR_WIDTH);
    textBlock.insertAdjacentHTML('afterBegin', picture.commentsText[j]);
  }
  return listElem;
};

// числовые данные для имеющихся в разметке блоков у большой картинки
var renderBigPicture = function (picture) {
  bigPicture.querySelector('img').src = picture.url;
  bigPicture.querySelector('.comments-count').textContent = picture.comments;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  bigPicture.classList.remove('hidden');

  createNewElement(picture, picture.commentsText);
};

var fragment = document.createDocumentFragment();

for (var j = 0; j < pictures.length; j++) {
  fragment.appendChild(renderPhoto(pictures[j]));
  setDataAttrib(similarListTemplate, j);
}

similarListElement.appendChild(fragment);

// спрячу .social__comment-count и .social__loadmore
var hideUnnecesary = function (blockClass) {
  var htmlBlock = document.querySelector(blockClass);
  htmlBlock.classList.add('.visually-hidden');
};

hideUnnecesary('.social__comment-count');
hideUnnecesary('.social__loadmore');

// закрытие/открытие большого фото
var getIndexAndRender = function (evt) {
  var x = evt.currentTarget.getAttribute('data-index');
  renderBigPicture(pictures[x]);
};

var addBigPictureListener = function (collection) {
  for (var i = 0; i < collection.length; i++) {
    collection[i].addEventListener('click', getIndexAndRender);
  }
};

var smallPictures = document.querySelectorAll('.picture__link');

addBigPictureListener(smallPictures);

var addClassHidden = function (element) {
  element.classList.add('hidden');
};

var findPopupCloseButton = function (element) {
  return element.querySelector('.cancel');
};

findPopupCloseButton(bigPicture).addEventListener('click', function () {
  addClassHidden(bigPicture);
});

// addClassHidden(bigPicture);

// Загрузка изображения и показ формы редактирования + закрытие
var uploadFile = document.querySelector('#upload-file');
var imageEditor = document.querySelector('.img-upload__overlay');
var effectValue = '';
var sizeValue = '';
// imageEditor.classList.remove('hidden');

uploadFile.addEventListener('change', function () {
  imageEditor.classList.remove('hidden');
  sliderBlock.classList.add('hidden');
});

findPopupCloseButton(imageEditor).addEventListener('click', function () {
  addClassHidden(imageEditor);
  imageEditor.removeAttribute('value');
  clearClassAndStyle(previewImg);
  setValueSize(defaultQuantity);
  quantity = defaultQuantity;
});

// Применение эффекта и изменение размера
var effect = document.querySelectorAll('.effects__item');
var previewImgBlock = document.querySelector('.img-upload__preview');
var previewImg = previewImgBlock.querySelector('img');
var sliderBlock = document.querySelector('.img-upload__scale');
// sliderBlock.classList.add('hidden');

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

var setEffectClass = function (value, img) {
  clearClassAndStyle(img);
  img.classList.add(value);
  img.setAttribute('style', setNewStyle(previewImg, sliderX, sliderPin.getBoundingClientRect().left));
};

var applyEffect = function (collection) {
  for (var i = 0; i < collection.length; i++) {
    collection[i].addEventListener('click', function (evt) {
      setValueSize(defaultQuantity);
      setEffectClass(getEffectClass(evt.currentTarget), previewImg);
      quantity = defaultQuantity;
      effectValue = '';
      if (previewImg.classList.contains('effects__preview--none')) {
        sliderBlock.classList.add('hidden');
      } else if (sliderBlock.classList.contains('hidden') && !previewImg.classList.contains('effects__preview--none')) {
        sliderBlock.classList.remove('hidden');
      }
    });
  }
};

applyEffect(effect);

var sliderPin = document.querySelector('.scale__pin');
var slider = document.querySelector('.scale__line');
var scaleValue = document.querySelector('.scale__value');
var scaleLevel = document.querySelector('.scale__level');

var proportion = function (xOfSlider, xOfPin) {
  var percentage = Math.floor(100 / (slider.offsetWidth / (xOfPin - xOfSlider.left)));
  if (percentage < 0) {
    percentage = 0;
  }
  return percentage;
};

var setValueScale = function (xOfSlider, xOfPin) {
  scaleValue.setAttribute('value', proportion(xOfSlider, xOfPin));
};

var chooseOneOfThree = function (to, from) {
  var choosen = Math.floor(Math.random() * (to - from + 1) + from);
  return choosen;
};

var setNewStyle = function (block, xOfSlider, xOfPin) {
  var quantity;
  var effectName;
  var newStyle;
  var temp = (1 / 100) * proportion(xOfSlider, xOfPin);
  if (temp <= 0) {
    temp = 0;
  } else if (temp >= 100) {
    temp = 100;
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
    quantity = chooseOneOfThree(temp, 0) + 'px';
    effectName = 'blur';
  } else if (block.classList.contains('effects__preview--heat')) {
    quantity = chooseOneOfThree(temp, 1);
    effectName = 'brightness';
  } else if (quantity < 0) {
    quantity = 0;
  }
  newStyle = 'filter: ' + effectName + '(' + quantity + ');';
  effectValue = newStyle;
  return newStyle;
};

var sliderX = slider.getBoundingClientRect();

var translatePinToEffect = function () {
  var pinX = sliderPin.getBoundingClientRect();
  setValueScale(sliderX, pinX.left);
  previewImg.removeAttribute('style');
  previewImg.setAttribute('style', setNewStyle(previewImg, sliderX, pinX.left));
  updatePreviewStyle(effectValue, sizeValue);
};

sliderPin.addEventListener('mousedown', function (evt) {
  translatePinToEffect();

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

    sliderPin.style.left = (sliderPin.offsetLeft - shift.x) + 'px';

    if (startCoords.x < sliderX.left) {
      sliderPin.style.left = 0;
    } else if (startCoords.x > sliderX.right) {
      sliderPin.style.left = sliderX.width + 'px';
    }
    scaleLevel.style.width = sliderPin.style.left;
    translatePinToEffect();
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


//  а теперь изменяем размеры
var minusSize = document.querySelector('.resize__control--minus');
var plusSize = document.querySelector('.resize__control--plus');
var valueSize = document.querySelector('.resize__control--value');
var defaultQuantity = 100;
var MAX_QUANITY = 100;
var MIN_QUANITY = 25;
var QUANITY_STEP = 25;

var oversizeCheck = function (number) {
  if (number >= MAX_QUANITY) {
    number = MAX_QUANITY;
  } else if (number <= MIN_QUANITY) {
    number = MIN_QUANITY;
  }
  return number;
};

var makeResize = function (number) {
  var newSize;
  newSize = 'transform: scale(' + (number / 100) + ');';
  sizeValue = newSize;
  return newSize;
};

var setValueSize = function (size) {
  valueSize.setAttribute('value', size + '%');
  previewImg.setAttribute('style', makeResize(size));
};

setValueSize(defaultQuantity);

var quantity = defaultQuantity;

var setNewSize = function (step, increase) {
  if (increase === 1) {
    quantity = quantity + step;
  } else {
    quantity = quantity - step;
  }
  quantity = oversizeCheck(quantity);
  setValueSize(quantity);
  var size = quantity / 100;
  return size;
};

minusSize.addEventListener('click', function () {
  setNewSize(QUANITY_STEP, 0);
  updatePreviewStyle(effectValue, sizeValue);
});

plusSize.addEventListener('click', function () {
  setNewSize(QUANITY_STEP, 1);
  updatePreviewStyle(effectValue, sizeValue);
});

var updatePreviewStyle = function (effectDescription, sizeDescription) {
  if (effectDescription === null || undefined) {
    effectDescription = '';
  } else if (sizeDescription === null || undefined) {
    sizeDescription = '';
  }
  previewImg.setAttribute('style', effectDescription + sizeDescription);
};

// проверка хештегов на валидность.
var hashTagField = document.querySelector('.text__hashtags');

var checkHashTagQuantity = function (element, array) {
  var message = '';
  if (array.length > 5) {
    message = 'Максимальное количество хешгетов - 5. Удалите один или несколько хешгетов';
  }
  return message;
};

var checkDuplicates = function (element, array) {
  var message = '';
  array.sort();
  for (var i = 0; i < array.length - 1; i++) {
    if (String(array[i]).toUpperCase() === String(array[i + 1]).toUpperCase()) {
      message = 'один и тот же хэш-тег не может быть использован дважды';
    }
  }
  return message;
};

var checkHashTags = function (element, array) {
  var message = '';
  var regExp = /^#[^\s]{1,19}$/i;
  for (var i = 0; i < array.length; i++) {
    if (regExp.test(array[i].toString()) === false) {
      message =
        'Пожалуйста проверьте, что хэш-тег начинается с символа # (решётка), хэш-теги разделяются пробелами, длина хештега не превышает 20 символов, также хеш-тег не может состоять только из одной решётки'
      ;
      break;
    }
  }
  return message;
};

var checkHashTagValidity = function (element) {
  var arrayOfTags = element.value.trim().split(/\s+/);
  var errorMessage = checkHashTagQuantity(element, arrayOfTags) || checkDuplicates(element, arrayOfTags) || checkHashTags(element, arrayOfTags);
  element.setCustomValidity(errorMessage);
};

hashTagField.addEventListener('input', function () {
  checkHashTagValidity(hashTagField);
});
