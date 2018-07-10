'use strict';

window.data = (function () {
  var COUNT_OF_PICTURES = 25;
  var descriptions = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];

  var loadData = function (callback) {
    window.backend.load(function (response) {
      var tempData = response;
      window.data.pictures = tempData;
      callback(window.data.pictures);
    });
  };

  return {
    loadData: loadData,
    countComments: function (comments) {
      return comments.length;
    },
    COUNT_OF_PICTURES: COUNT_OF_PICTURES,
    descriptions: descriptions
  };
})();
