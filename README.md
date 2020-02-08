# Messenger-Assistant

<p align="center">
  <img style="width: 400px;" src="https://chongcurtis.com/file_hosting/messenger_assistant_emojis.png" alt="The engine in action!" width="400"/>
  <img style="width: 400px;" src="https://chongcurtis.com/file_hosting/messenger_assistant_reminders2.png" alt="The engine in action!" width="400"/>
</p>

# Features
 - Reminders
 - Copy and paste emojis at will ¯\\_(ツ)_/¯
 - A graph that displays the number of characters sent over time

# Installation
1) Run `git clone git@github.com:curtischong/Messenger-Assistant.git` in your terminal
2) Change `const YOUR_NAME = "Curtis";` in [convo.js](convo.js) to your name. (Please capitalize your name)
3) Load the unpacked extension into Chrome https://github.com/web-scrobbler/web-scrobbler/wiki/Install-an-unpacked-extension
4) go on messenger.com and the side panel should appear! (You may need to reload messenger.com)

# Dev Notes
 - If you update the manifest.json you have to manually turn off/on the extension in the extensions page
 - This repo uses ES6 so if you are traversing DOM elements in jquery use `.each((idx, element) => {})';` when looping through children elements
 - If you add a new js file. you have to delete the extension. Then load the unpacked version again for it to recognize the new js file
