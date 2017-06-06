var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config');
var rootPath = '/join-slack';

router.get(rootPath, function(req, res) {
  res.setLocale(config.locale);
  res.render('index', { community: config.community,
                        tokenRequired: !!config.inviteToken });
});

router.post(rootPath + '/invite', function(req, res) {

	var sanitise = /^(([^<>()\[\]\\.,;:\s%@&{}"`'$#!]+(\.[^<>()\[\]\\.,;:\s%@&{}"`'!$#]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	var sanitisedEmail = sanitise.test(req.body.email)

  if (req.body.email && sanitisedEmail && (!config.inviteToken || (!!config.inviteToken && req.body.token === config.inviteToken))) {

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
            message: 'Success! Check &ldquo;'+ req.body.email +'&rdquo; for an invite from Slack.'
          });
        } else {
          var error = body.error;
          if (error === 'already_invited' || error === 'already_in_team') {
            res.render('result', {
              community: config.community,
              message: 'Success! You were already invited.<br>' +
                       'Visit <a href="https://'+ config.slackUrl +'">'+ config.community +'</a>'
            });
            return;
          } else if (error === 'invalid_email') {
            error = 'The email you entered is an invalid email.';
          } else if (error === 'invalid_auth') {
            error = 'Something has gone wrong.<br>' +
                    'Please contact us at guides@digital.gov.au and we can manually add you to the Slack channel';
          }

          res.render('result', {
            community: config.community,
            message: 'Uh oh! ' + error,
            isFailed: true
          });
        }
      });
  } else {
    var errMsg = [];
    if (!req.body.email) {
      errMsg.push('your email is required');
    }

    if (!!config.inviteToken) {
      if (!req.body.token) {
        errMsg.push('valid token is required');
      }

      if (req.body.token && req.body.token !== config.inviteToken) {
        errMsg.push('the token you entered is wrong');
      }
    }

		if (!sanitisedEmail) {
      errMsg.push('your email contains characters that are not allowed.<br>' +
                  'The following characters are not allowed ! < > ( ) ; : % @ & { }'
      );
    }

    res.render('result', {
      community: config.community,
      message: 'Oh no! ' + errMsg.join(' and ') + '.',
      isFailed: true
    });
  }
});

module.exports = router;
