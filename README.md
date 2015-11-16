Slack Invite Automation
------------

A tiny web application to invite a user into your slack team.

Inspired by
[How I hacked Slack into a community platform with Typeform](https://levels.io/slack-typeform-auto-invite-sign-ups/)
and
[Socket.io's slack page](http://socket.io/slack/).

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Setting
fill out `config.js` as your infomation.

* `community`: your community or team name to display on join page.
* `slackUrl` : your slack team url (ex: socketio.slack.com)
* `slacktoken` : access token of slack.
  You can generate it in <https://api.slack.com/web#auth>.
  **You should generate the token in admin user, not owner.**
  If you generate the token in owner user, `missing_scope` error will be occurred.
* `inviteToken`: an optional security measure - if it is set, then that token will be required to get invited.
  Intended to be provided in person or on a whiteboard or something.

  You can test your token via curl:

  ```shell
   curl -X POST 'https://YOUR-SLACK-TEAM.slack.com/api/users.admin.invite' \
   --data 'email=EMAIL&token=TOKEN&set_active=true' \
   --compressed
  ```

## Run
[Node.js](http://nodejs.org/) is required.

```shell
$ git clone git@github.com:outsideris/slack-invite-automation.git
$ cd slack-invite-automation
$ npm install
$ bin/www
```

You can access <http://localhost:3000> on your web browser.

![](https://raw.github.com/outsideris/slack-invite-automation/master/screenshots/join-page.jpg)
