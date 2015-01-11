Slack Invite Automation
------------

A tiny web application to invite a user info your slack team.

Inspired by
[How I hacked Slack into a community platform with Typeform](https://levels.io/slack-typeform-auto-invite-sign-ups/)
and
[Socket.io's slack page](http://socket.io/slack/).

## Setting
fill out `config.js` as your infomation.

* `community`: your cummunity or team name to display on join page.
* `slackUrl` : your slack team url (ex: socketio.slack.com)
* `slacktoken` : access token of slack.
  You can generate it in <https://api.slack.com/web#auth>

  You can test your token via curl:

  ```shell
   curl -X POST 'https://YOUR-SLACK-TEAM.slack.com/api/users.admin.invite' \
   --data 'email=EMAIL&channels=CHANNEL_ID&token=TOKEN&set_active=true' \
   --compressed
  ```

* `channels` : channels to join when the user is invited.(Array)
  You can find id of channels in your slack.(look at sidebar on the left)

  channel list's HTML looks like:

  ```html
  <li class="channel_C024R4462 channel ">
    <a class="channel_name" data-channel-id="C024R4462">
      <span class="unread_just_C024R4462 unread_just hidden">0</span>
      <span class="unread_highlight_C024R4462 unread_highlight hidden">0</span>
      <span class="overflow-ellipsis"><span class="prefix">#</span>codeport</span>
    </a>
  </li>
  ```

  the value of `data-channel-id` is channel id.(`C024R44` in above example)

## Run
[Node.js](http://nodejs.org/) is required.

```shell
$ git clone git@github.com:outsideris/slack-invite-automation.git
$ cd slack-invite-automation
$ npm install
$ bin/www
```

You can access <http://localhost:3000> on your web browser.

![](https://raw.github.com/outsideris/slack-invite-automation/master/screenshots/join-page.png)
