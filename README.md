# Messenger-Assistant

<p align="center">
  <img src="https://chongcurtis.com/file_hosting/messenger_assistant_emojis.png" alt="The engine in action!"/>
</p>

<p align="center">
  <img src="https://chongcurtis.com/file_hosting/messenger_assistant_reminders.png" alt="The engine in action!"/>
</p>

# Features
 - Time elapsed since you started talking
 - Graphs showing you:
  - The number of characters sent over time

# Installation
1) Run `git clone git@github.com:curtischong/Messenger-Assistant.git` in your terminal
2) Change `const YOUR_NAME = "Curtis";` in [convo.js](convo.js) to your name. (Please make it capitalized)
3) Load the unpacked extension into Chrome https://github.com/web-scrobbler/web-scrobbler/wiki/Install-an-unpacked-extension
4) go on messenger.com and the side panel should appear! (You may need to reload messenger.com)

# Dev Notes
 - If you update the manifest.json you have to manually turn off/on the extension in the extensions page
 - This repo uses ES6 so if you are traversing DOM elements in jquery use `.each((idx, element) => {})';` when looping through children elements
 - If you add a new js file. you have to delete the extension. Then load the unpacked version again for it to recognize the new js file