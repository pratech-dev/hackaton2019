$(document).ready(function () {
  injectReferences();
  openchatbox();
  getLocation($("#location").get())
  $("#sharelocation").on("click", function(e){
    getLocation($("#location").get())    
  });
});

function openchatbox() {

  if (!this.userBot) {
    this.userBot = {
      id: 'Pratech-Pruebas ' + guid(),
      name: ''
    };
    this.directLineSecret =
      'YkhVw8Yipp8.cwA.9Kk.cWxKQe97pAYCDlLAMtVEjK7XiYvucpYZ817z0TlirRk';
    this.botConnection = new BotChat.DirectLine({
      secret: this.directLineSecret
    });
    this.id = 'invitado ' + new Date().getTime();

    BotChat.App({
        botConnection: botConnection,
        user: this.userBot,
        bot: {
          id: 'botid'
        },
        resize: 'detect'
      },
      document.getElementById('bot')
    );
    saludar()
  }
}

function saludar() {
  this.botConnection
    .postActivity({
      type: 'message',
      from: {
        id: this.userBot.id,
        name: this.userBot.name
      },
      text: 'hola'
    })
    .subscribe(
      id => console.log('success', id),
      err => {
        console.log(err);
        this.error = err;
        mensajeerror = this.error;
        // splunk();
      }
    );
}

// function splunk() {
//   let origin = window.location.origin;
//   // console.log('Consulta => ', origin);
//   let aplication = 'http://pratech-integrador-qa.us-east.mybluemix.net';
//   // console.log('aplication => ', aplication);
//   let urlsplunk = 'https://pratech-logger-qa.us-east.mybluemix.net/api/logger';
//   // console.log('urlsplunk => ', urlsplunk);
//   let date = moment().format();
//   // console.log('moment => ', date);

//   let datos = {
//     date: date,
//     aplication: origin,
//     level: 'DEBUG',
//     typeEntrance: 'REQUEST',
//     customer: 'Pratech-Pruebas',
//     id_session: this.id,
//     // guid: '',
//     origin: origin,
//     data: {
//       mensaje: this.error
//     }
//   };
//   console.log('Datos => ', datos);
//   $.post(urlsplunk, datos, function (data, status) {
//     console.log('Data: ' + data + '\nStatus: ' + status);
//   });
// }

function getFecha() {
  moment.tz.add("America/Bogota|LMT BMT -05 -04|4U.g 4U.g 50 40|01232|-3sTv3.I 1eIo0 38yo3.I 2en0|90e5");
  moment.locale('es');
  return moment()
    .tz('America/Bogota')
    .format();
}



function injectReferences() {
  //Css bot framework
  $('head').append(
    $('<link rel="stylesheet" type="text/css" />').attr(
      'href',
      'https://cdn.botframework.com/botframework-webchat/master/botchat.css'
    )
  );
  $('head').append(
    $('<link rel="stylesheet" type="text/css" />').attr('href', 'css/hackaton.css')
  );

  //js font awesome
  $.ajax({
    url: 'https://use.fontawesome.com/e95ecc4c16.js',
    dataType: 'script',
    cache: true
  }).done(function (script, textStatus) {
    console.log('load  https://use.fontawesome.com/e95ecc4c16.js');
  });
  //js moment.js
  $.ajax({
    url: 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js',
    dataType: 'script',
    cache: true
  }).done(function (script, textStatus) {
    console.log('load  https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js');
  });
  //js moment-timezone.js
  $.ajax({
    url: 'https://momentjs.com/downloads/moment-timezone-with-data.min.js',
    dataType: 'script',
    cache: true
  }).done(function (script, textStatus) {
    console.log('load  https://momentjs.com/downloads/moment-timezone-with-data.min.js');
  });

}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    s4() +
    s4()
  );
}

function getLocation(element) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    element.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  return position;
}
