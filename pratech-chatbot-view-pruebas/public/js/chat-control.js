$(document).ready(function () {
  injectReferences();
  openchatbox();
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
    navigator.geolocation.getCurrentPosition(saludarPosition, saludarSinPosicion);
  }
}

function saludarPosition(position) {
  console.debug('position', position);
  botInit("hola::"+position.coords.latitude+"::"+position.coords.longitude)
}

function saludarSinPosicion(error) {
  console.debug('ERROR', error);
  var mensaje = "";
  switch(error.code) {
    case error.PERMISSION_DENIED:
      mensaje = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      mensaje = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      mensaje = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      mensaje = "An unknown error occurred."
      break;
  }
  botInit("hola::0::0::"+mensaje);
}

function botInit(saludo){
  this.botConnection
    .postActivity({
      type: 'message',
      from: {
        id: this.userBot.id,
        name: this.userBot.name
      },
      text: saludo
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
