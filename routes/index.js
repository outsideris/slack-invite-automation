var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config');

router.get('/', function(req, res) {
  res.render('index', {
    community: config.community,
    success: '',
    message: ''
  });
});

router.post('/invite', function(req, res) {
  if (req.body.email) {
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
        if (err) {
          return res.send('Erro:' + err);
        }

        body = JSON.parse(body);

        if (body.ok) {
          res.render('index', {
            community: config.community,
            success: 1,
            message: 'Parabéns! Verifique o email "' + req.body.email + '" para aceitar o convite do Slack.'
          });
        } else {
          var errorResp;
          switch(body.error) {
            case 'already_in_team':
              errorResp = 'Você já faz parte do time!';
              break;
            case 'invalid_email':
              errorResp = 'Utilize um e-mail válido!';
              break;

            default:
              errorResp = 'Erro! ' + body.error;
              break;
          }

          res.render('index', {
            community: config.community,
            success: 0,
            message: errorResp
          });
        }
      });
  } else {
    res.status(400).send('Email é obrigatório.');
  }
});

module.exports = router;
