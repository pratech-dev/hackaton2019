$(document).ready(function () {
  injectReferences();
  eventosChat();
});

function eventosChat() {
  $('a.chat').click(function () {
    openchatbox();
  });
  $('.hide-chat').click(function () {
    hidechatbox();
  });
}

function hidechatbox() {
  $('.chatbot-drag-pratech').removeClass('show');
  $('.chat').click(function () {
    openchatbox();
  });
}

// let url = 'http://localhost:8081/pruebas';
let url = 'https://pratech-chatbot-pruebas.us-east.mybluemix.net/pruebas'

function openchatbox() {
  if ($('.parentchatpratech').length) {
    $('.chatbot-drag-pratech').addClass('show');
  } else {
    $('body').append(
      $(
        '<div class="parentchatpratech parent">' +
        '<div class="chatbot-drag-pratech show" id="draggable">' +
        '<div class="chatbot-drag-pratech-header">' +
        '<div class="-info-title">' +
        '<div class="title-chat">¡Hola, soy Pratech-Pruebas!</div>' +
        '<div class="title-chat"><span class="lighter">¿En qué puedo ayudarte?</span></div>' +
        '<div class="icon">' +
        '<ul class="list-actions hide-chat">' +
        '<li><a href="#"><i class="fa fa-times"></i></a></li>' +
        '</ul>' +
        '</div>' +
        '<div class="avatar-img">' +
        '<img src="' +
        url +
        '/images/avatar.png" alt="" class="img-responsive">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="chatbot-drag-pratech-body" id="bot">' +
        '</div>' +
        '</div>' +
        '</div>'
      )
    );

    $('#draggable').show();
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
      // console.log(this.id);

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

      botConnection.activity$
        .filter(activity => {
          // console.log('activity filter');
        }).subscribe(activity => {
          // console.log('activity subs');
        }, err => {
          console.log(err);
          this.error = err;
          mensajeerror = this.error;
          splunk();
        })

      $('.chatbot-drag-pratech').addClass('show');
      $('.hide-chat').click(function () {
        hidechatbox();
      });
      $('#draggable').draggable({
        containment: 'parent'
      });
      //saludar()
    }
  }
}

// function saludar() {
//   this.botConnection
//     .postActivity({
//       type: 'message',
//       from: {
//         id: this.userBot.id,
//         name: this.userBot.name
//       },
//       text: 'hola'
//     })
//     .subscribe(
//       id => console.log('success', id),
//       err => {
//         console.log(err);
//         this.error = err;
//         mensajeerror = this.error;
//         splunk();
//       }
//     );
// }

function splunk() {
  let origin = window.location.origin;
  // console.log('Consulta => ', origin);
  let aplication = 'http://pratech-integrador-qa.us-east.mybluemix.net';
  // console.log('aplication => ', aplication);
  let urlsplunk = 'https://pratech-logger-qa.us-east.mybluemix.net/api/logger';
  // console.log('urlsplunk => ', urlsplunk);
  let date = moment().format();
  // console.log('moment => ', date);

  let datos = {
    date: date,
    aplication: origin,
    level: 'DEBUG',
    typeEntrance: 'REQUEST',
    customer: 'Pratech-Pruebas',
    id_session: this.id,
    // guid: '',
    origin: origin,
    data: {
      mensaje: this.error
    }
  };
  console.log('Datos => ', datos);
  $.post(urlsplunk, datos, function (data, status) {
    console.log('Data: ' + data + '\nStatus: ' + status);
  });
}

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
    $('<link rel="stylesheet" type="text/css" />').attr(
      'href',
      url + '/css/styles.css'
    )
  );


  //Js bot framework
  $.ajax({
    url: url + '/js/botchat.js',
    dataType: 'script',
    cache: true
  }).done(function (script, textStatus) {
    eventosChat();
  });

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