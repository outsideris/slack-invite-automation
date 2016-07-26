(Pokemon Go API Slack Invite Automation)
------------

A tiny web application to invite a user into the PgoApi Slack group.


[Pokemon Go Python API](https://github.com/tejado/pgoapi/) By [Tejado](https://github.com/tejado)

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Settings
Fill out `config.js` as your infomation.

* `community`: your community or team name to display on join page.
* `slackUrl` : your slack team url (ex: pgoapi.slack.com)
* `slacktoken` : access token of slack.
  You can generate it in <https://api.slack.com/web#auth>.
  **You should generate the token in admin user, not owner.**
  If you generate the token in owner user, `missing_scope` error will be occurred.
* `inviteToken`: an optional security measure - if it is set, then that token will be required to get invited.
* `locale`: application language (currently `en`, `de`, `es`, `fr`, `pt`, `zh-CN`, `zh-TW`, `ja` and `ko` available).

  You can test your token via curl:

  ```shell
   curl -X POST 'https://YOUR-SLACK-TEAM.slack.com/api/users.admin.invite' \
   --data 'email=EMAIL&token=TOKEN&set_active=true' \
   --compressed
  ```

## Run
[Node.js](http://nodejs.org/) is required.

```shell
$ git clone https://github.com/mikeres0/PgoAPI-Slack-Signup.git *folder name*
$ cd *folder name*
$ npm install
$ bin/www
```

You can access <http://localhost:3000> on your web browser.

## Run with Docker

It's easy to run this service if you have installed Docker on your system.

```shell
$ git clone git@github.com:outsideris/slack-invite-automation.git
$ cd slack-invite-automation
$ docker build -t slack-invite-automation .
$ docker run -it --rm -e COMMUNITY_NAME="YOUR-TEAM-NAME" -e SLACK_URL="YOUR-TEAM.slack.com" -e SLACK_TOKEN="YOUR-ACCESS-TOKEN" -p 3000:3000 slack-invite-automation
```
