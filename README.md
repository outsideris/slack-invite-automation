Slack Invite Automation
------------

A tiny web application to invite a user into your slack team.

Inspired by
[How I hacked Slack into a community platform with Typeform](https://levels.io/slack-typeform-auto-invite-sign-ups/)
and
[Socket.io's slack page](http://socket.io/slack/).

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)
[![Deploy to Azure](http://azuredeploy.net/deploybutton.png)](https://azuredeploy.net/)

## Settings

##### Local

Create a file in the root called `.env` with the following key/value pairs. `.env`
files are added to the `.gitignore`.

- `COMMUNITY_NAME` : Your community or team name to display on join page.
- `SLACK_URL` : Your slack team url (ex: socketio.slack.com)
- `SLACK_TOKEN` : Your access token for slack.
  - You can generate it in <https://api.slack.com/web#auth>.
  **You should generate the token as an admin user, not owner.**
  If you generate the token in owner user, a `missing_scope` error may occur.
- `INVITE_TOKEN`: An optional security measure - if it is set, then that token will be required to get invited.
- `LOCALE`: Application language (currently `en`, `de`, `es`, `fr`, `pt`, `zh-CN`, `zh-TW`, `ja` and `ko` available).

**Sample**

```
COMMUNITY_NAME=socketio
SLACK_URL=socketio.slack.com
SLACK_TOKEN=ffsdf-5411524512154-16875416847864648976-45641654654654654-444334f43b34566f
INVITE_TOKEN=abcdefg
LOCAL=en
```

You can test your token via curl:

  ```shell
   curl -X POST 'https://YOUR-SLACK-TEAM.slack.com/api/users.admin.invite' \
   --data 'email=EMAIL&token=TOKEN&set_active=true' \
   --compressed
  ```

##### Heroku / Azure

Add the application settings that are defined above for the local `.env` file.

## Run
[Node.js](http://nodejs.org/) is required.

```shell
$ git clone git@github.com:outsideris/slack-invite-automation.git
$ cd slack-invite-automation
$ npm install
$ npm start
```

You can access <http://localhost:3000> on your web browser.

![](https://raw.github.com/outsideris/slack-invite-automation/master/screenshots/join-page.jpg)

## Run with Docker

It's easy to run this service if you have installed Docker on your system.

```shell
$ git clone git@github.com:outsideris/slack-invite-automation.git
$ cd slack-invite-automation
$ docker build -t slack-invite-automation .
$ docker run -it --rm -e COMMUNITY_NAME="YOUR-TEAM-NAME" -e SLACK_URL="YOUR-TEAM.slack.com" -e SLACK_TOKEN="YOUR-ACCESS-TOKEN" -p 3000:3000 slack-invite-automation
```
