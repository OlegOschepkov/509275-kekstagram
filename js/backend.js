'use strict';

window.backend = (function () {
  var URL_GET = 'https://js.dump.academy/kekstagram/data';
  var URL_POST = 'https://js.dump.academy/kekstagram';
  var OK_RESPONSE = 200;
  var RESPONSE_TIMEOUT = 10000;
  var load = function (onSuccess, onFail) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === OK_RESPONSE) {
        onSuccess(xhr.response);
      } else {
        onFail('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onFail('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onFail('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = RESPONSE_TIMEOUT; // 10s

    xhr.open('GET', URL_GET);
    xhr.send();
  };

  var save = function (data, onSuccess, onFail) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === OK_RESPONSE) {
        onSuccess();
      } else {
        onFail('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onFail('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onFail('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = RESPONSE_TIMEOUT; // 10s


    xhr.open('POST', URL_POST);
    xhr.send(data);
  };


  return {
    load: load,
    save: save
  };

})();
