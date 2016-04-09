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
        if (err) { 
		return res.send('Error:' + err); 
	}

        body = JSON.parse(body);

        if (body.ok) {
          res.render('result', {
            community: config.community,
            message: req.__('INVITATION_SUCCESS', req.body.email)
          });
        } else {
          var error = body.error;

          if (error === 'already_invited' || error === 'already_in_team') {
            res.render('result', {
              community: config.community,
              message: req.__('INVITATION_ALREADY', config.slackUrl, config.community)
            });
            return;
          } else if (error === 'invalid_email') {
            error = req.__('INVALID_EMAIL')
          } else if (error === 'invalid_auth') {
            error = req.__('INVALID_AUTH', config.supportEmail)
          }

          res.render('result', {
            community: config.community,
	    isFailed: true,
            message: req.__('FORM_POST_ERROR', error)            
          });
        }
      });
  } else {

	alert('no email found 1');

	var errMsg = [];

	if (!req.body.email) {
		errMsg.push(req.__('EMAIL_REQUIRED'));
	}

	if (!!config.inviteToken) {
		if (!req.body.token) {
			errMsg.push(req.__('TOKEN_REQUIRED'));
		}

		if (req.body.token && req.body.token !== config.inviteToken) {
			errMsg.push(req.__('TOKEN_INVALID'));
		}
	}

	alert('no email found 2');

	res.render('result', {
		community: config.community,
		isFailed: true,
		message: req.__('FORM_INVALID_ERROR', errMsg.join('</br>'))      
	});

	alert('no email found 3');
  }
});

module.exports = router;
