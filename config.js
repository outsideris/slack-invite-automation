module.exports = {
  // your cummunity or team name to display on join page.
  community: 'YOUR-TEAM-NAME',
  // your slack team url (ex: socketio.slack.com)
  slackUrl: 'YOUR-TEAM.slack.com',
  // access token of slack
  // You can generate it in https://api.slack.com/web#auth
  slacktoken: 'YOUR-ACCESS-TOKEN',
  // channels to join when the user is invited.(Array of channel-id)
  // You can find id of channels in your slack.(look at sidebar on the left)
  // channel list's HTML looks like:
  //   <li class="channel_C024R4462 channel ">
  //     <a class="channel_name" data-channel-id="C024R4462">
  //       <span class="unread_just_C024R4462 unread_just hidden">0</span>
  //       <span class="unread_highlight_C024R4462 unread_highlight hidden">0</span>
  //       <span class="overflow-ellipsis"><span class="prefix">#</span>codeport</span>
  //     </a>
  //   </li>
  // "C024R4462" is channel id(in data-channel-id)
  channels: ["CHANNEL-ID", "CHANNEL-ID"].join(',')
};
