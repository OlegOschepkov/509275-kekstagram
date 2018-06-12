'use strict';

var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');
var bigPictureBlocks = bigPicture.querySelector('.social__comments');
var similarListElement = document.querySelector('.pictures');
var similarListTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture__link');

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

var COUNT_OF_PICS = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_COMMENTS = 1;
var MAX_COMMENTS = 6;
var BIG_PICTURE_INDEX = 0;
var MIN_AVATAR_NUMBER = 1; //эти две переменные отвечают за подбор случайного аватара (в задании src="img/avatar-{{случайное число от 1 до 6}}.svg")
var MAX_AVATAR_NUMBER = 6;
var AVATAR_HEIGHT = 35;
var AVATAR_WIDTH = 35;
var AVATAR_ALT = 'Аватар комментатора фотографии';

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};


// создаю и перемешиваю массив номеров фоток
var generateSrcArray = function (countOfPics) {
  var array = [];
  for (i = 0; i < countOfPics; i++) {
    array.push(i);
  }
  return array;
};

function shuffle(array) {
  var thisValue;
  var thatValue;
  for (var i = array.length - 1; i > 0; i--) {
    thisValue = Math.floor(Math.random() * (i + 1));
    thatValue = array[i];
    array[i] = array[thisValue];
    array[thisValue] = thatValue;
  }
  return array;
}

var srcArray = shuffle(generateSrcArray(COUNT_OF_PICS));

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

// собираю из отдельных массивов одним большой с комментами. Не объеденил эти две функции потому что не получилось.
var generateCommentsArray = function (picsCount, commentsArr, min, max) {
  var bigArray = [];
  for (var i = 0; i < picsCount; i++) {
    var onePhotoComments = generateComments(commentsArr, min, max);
    bigArray.push(onePhotoComments);
  }
  return bigArray;
};

var commentsArray = generateCommentsArray(COUNT_OF_PICS, commentStrings, MIN_COMMENTS, MAX_COMMENTS);

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
  for (var i = 0; i < COUNT_OF_PICS; i++) {
    var picture = {
      url: 'photos/' + (srcArray[i] + 1) + '.jpg',
      likes: getRandomInt(MIN_LIKES, MAX_LIKES),
      comments: countComments(commentsArray[i]),
      commentsText: commentsArray[i],
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

  createNewElement(picture, commentsArray[BIG_PICTURE_INDEX]);
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < pictures.length; i++) {
  fragment.appendChild(renderPhoto(pictures[i]));
}

renderBigPicture(pictures[BIG_PICTURE_INDEX]);

similarListElement.appendChild(fragment);
