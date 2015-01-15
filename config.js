module.exports = {
  // your cummunity or team name to display on join page.
  community: 'YOUR-TEAM-NAME',
  // your slack team url (ex: socketio.slack.com)
  slackUrl: 'YOUR-TEAM.slack.com',
  // access token of slack
  // You can generate it in https://api.slack.com/web#auth
  //
  // You can test your token via curl:
  //   curl -X POST 'https://YOUR-SLACK-TEAM.slack.com/api/users.admin.invite' \
  //   --data 'email=EMAIL&token=TOKEN&set_active=true' \
  //   --compressed
  slacktoken: 'YOUR-ACCESS-TOKEN'
};
