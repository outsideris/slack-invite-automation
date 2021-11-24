const express = require('express');
const router = express.Router();
const fetch = require('cross-fetch');

const config = require('../config');
const { badge } = require('../lib/badge');

const sanitize = require('sanitize');

router.get('/', function(req, res) {
  res.setLocale(config.locale);
  res.render('index', { community: config.community,
                        tokenRequired: !!config.inviteToken,
                        recaptchaSiteKey: config.recaptchaSiteKey });
});

router.post('/invite', function(req, res) {
  if (req.body.email && (!config.inviteToken || (!!config.inviteToken && req.body.token === config.inviteToken))) {
    async function doInvite() {
      const email = req.body.email;
      const channelId = config.slackChannel;
      const body = {
        "channel": channelId,
        "blocks": [
          {
              "type": "section",
              "text": {
                  "type": "mrkdwn",
                  "text": `:eyes::wave:  *${email}* :wave::eyes:`
              }
          },
          {
              "type": "section",
              "text": {
                  "type": "mrkdwn",
                  "text": `A person with email \`${email}\` has requested to join your workspace. Copy next message and post it to invite that person`
              }
          },
          {
              "type": "section",
              "text": {
                  "type": "mrkdwn",
                  "text": `\`/invite ${email}\``
              }
          }
        ]
      };
      const url = 'https://'+ config.slackUrl + '/api/chat.postMessage';
      try {
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": `Bearer ${config.slacktoken}`
          }
        });
        if(response.ok) {
          const data = await response.json();
          if (data.ok) {
            res.render('result', {
              community: config.community,
              message: "Your email &ldquo;" + req.body.email + "&rdquo; has been sent to our admin for invite. Keep a look out in your inbox for an invitation."
            });
          } else {
            console.error(data);
            throw new Error('Non-ok response')
          }
        }
      } catch(err) {
        console.error(err);
        error = 'Something has gone wrong. Please try again at a later time.';
        res.render('result', {
          community: config.community,
          message: 'Failed! ' + error,
          isFailed: true
        });

      }
    }
    if (!!config.recaptchaSiteKey && !!config.recaptchaSecretKey) {
      request.post({
        url: 'https://www.google.com/recaptcha/api/siteverify',
        form: {
          response: req.body['g-recaptcha-response'],
          secret: config.recaptchaSecretKey
        }
      }, function(err, httpResponse, body) {
        if (typeof body === "string") {
          body = JSON.parse(body);
        }

        if (body.success) {
          doInvite();
        } else {
          error = 'Invalid captcha.';
          res.render('result', {
            community: config.community,
            message: 'Failed! ' + error,
            isFailed: true
          });
        }
      });
    } else {
      doInvite();
    }
  } else {
    const errMsg = [];
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

    res.render('result', {
      community: config.community,
      message: 'Failed! ' + errMsg.join(' and ') + '.',
      isFailed: true
    });
  }
});

router.get('/badge.svg', (req, res) => {
  request.get({
    url: 'https://'+ config.slackUrl + '/api/users.list',
    qs: {
      token: config.slacktoken,
      presence: true
    }
  }, function(err, httpResponse, body) {
    try {
      body = JSON.parse(body);
    } catch(e) {
      return res.status(404).send('');
    }
    if (!body.members) {
      return res.status(404).send('');
    }

    const members = body.members.filter(function(m) {
      return !m.is_bot;
    });
    const total = members.length;
    const presence = members.filter(function(m) {
      return m.presence === 'active';
    }).length;

    const hexColor = /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    sanitize.middleware.mixinFilters(req);

    res.type('svg');
    res.set('Cache-Control', 'max-age=0, no-cache');
    res.set('Pragma', 'no-cache');
    res.send(
        badge(
            presence,
            total,
            req.queryPattern('colorA', hexColor),
            req.queryPattern('colorB', hexColor)
        )
    );
  });
});

module.exports = router;
