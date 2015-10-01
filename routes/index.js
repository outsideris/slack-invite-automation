var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config');

router.get('/', function(req, res) {
  res.render('index', { community: config.community,
                        tokenRequired: config.inviteToken !== "" });
});

router.post('/invite', function(req, res) {
  if (req.body.email && req.body.token && config.inviteToken !== "" && req.body.token === config.inviteToken) {
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
            message: 'Success! Check "'+ req.body.email +'" for an invite from Slack.'
          });
        } else {
          var error = body.error;
          if (error === 'already_invited') {
            error = 'You are already invited.'
          } else if (error === 'invalid_email') {
            error = 'The email you entered is an invalid email.'
          }

          res.render('result', {
            community: config.community,
            message: 'Failed! ' + error
          });
        }
      });
  } else {
    var errMsg = [];
    if (!req.body.email) {
      errMsg.push('email is required.');
    }

    if (config.inviteToken !== "") {
      if (!req.body.token) {
        errMsg.push('token is required.');
      }

      if (req.body.token && req.body.token !== config.inviteToken) {
        errMsg.push('token is wrong.');
      }
    }

    res.render('result', {
      community: config.community,
      message: errMsg.join(" and ")
    });
  }
});

module.exports = router;
