var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config');

router.get('/', function(req, res) {
  res.render('index', { community: config.community,
                        tokenRequired: !!config.inviteToken });
});

router.post('/invite', function(req, res) {
  if (req.body.email && (!config.inviteToken || (!!config.inviteToken && req.body.token === config.inviteToken))) {
    request.post({
        url: 'https://'+ config.slackUrl + '/api/users.admin.invite',
        form: {
          email: req.body.email,
          token: config.slacktoken,
          set_active: true
        }
      }, function(err, httpResponse, body) {
        // body looks like:
        //   {"ok":true}
        //       or
        //   {"ok":false,"error":"already_invited"}
        if (err) { return res.send('Error:' + err); }
        body = JSON.parse(body);
        if (body.ok) {
          res.render('result', {
            community: config.community,
            message: res.__('INVITATION_SUCCESS', req.body.email);
          });
        } else {
          var error = body.error;
          if (error === 'already_invited' || error === 'already_in_team') {
            res.render('result', {
              community: config.community,
              message: 'Éxito! Ya has sido invitado.<br>' +
                       'Visita <a href="https://'+ config.slackUrl +'">'+ config.community +'</a>'
            });
            return;
          } else if (error === 'invalid_email') {
            error = 'El email ingresado no es válido.'
          } else if (error === 'invalid_auth') {
            error = 'Algo salió mal. Por favor contacta al administrador en info@cppcolombia.tech'
          }

          res.render('result', {
            community: config.community,
            message: 'Falló! ' + error,
            isFailed: true
          });
        }
      });
  } else {
    var errMsg = [];
    if (!req.body.email) {
      errMsg.push('El email es obligatorio');
    }

    if (!!config.inviteToken) {
      if (!req.body.token) {
        errMsg.push('El token es obligatorio');
      }

      if (req.body.token && req.body.token !== config.inviteToken) {
        errMsg.push('El token ingresado no es correcto');
      }
    }

    res.render('result', {
      community: config.community,
      message: 'Falló! ' + errMsg.join(' and ') + '.',
      isFailed: true
    });
  }
});

module.exports = router;
