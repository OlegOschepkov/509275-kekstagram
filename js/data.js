'use strict';

window.data = (function () {
  var commentCount = document.querySelector('.social__comment-count'); // MM
  var addComment = document.querySelector('.social__loadmore');
  var utility = window.utility;

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

  var countComments = function (array) {
    return array.length;
  };

  var hideBlock = function (block) {
    block.classList.add('visually-hidden');
  };

  hideBlock(commentCount);
  hideBlock(addComment);

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
    for (var j = 0; j <= utility.getRandomInt(min, max); j++) {
      var singleComment;
      if (Math.random() > 0.5) {
        singleComment = utility.getRandomElement(commentsArr) + ' ' + utility.getRandomElement(commentsArr);
      } else {
        singleComment = utility.getRandomElement(commentsArr);
      }
      messageArray.push(singleComment);
    }
    return messageArray;
  };

  var generateDescription = function (descriptionArr) {
    return utility.getRandomElement(descriptionArr);
  };

  // создаю массив картинок и присваиваю свойства
  var generatePictures = function (commentsArr, descriptionArr) {
    var picturesArr = [];
    for (var i = 0; i < COUNT_OF_PICTURES; i++) {
      var commentsArray = generateComments(commentStrings, MIN_COMMENTS, MAX_COMMENTS);
      var picture = {
        url: 'photos/' + (sourceLinks[i] + 1) + '.jpg',
        likes: utility.getRandomInt(MIN_LIKES, MAX_LIKES),
        comments: countComments(commentsArray),
        commentsText: commentsArray,
        description: generateDescription(descriptionArr)
      };
      picturesArr.push(picture);
    }
    return picturesArr;
  };

  var pictures = generatePictures(commentStrings, descriptions);

  return {
    pictures: pictures,
    countComments: function (array) {
      return array.length;
    }
  };

})();
