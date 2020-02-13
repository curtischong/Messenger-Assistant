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
1) Run `git clone git@github.com:curtischong/Messenger-Assistant.git` in your terminal.
2) Change `const YOUR_NAME = "Curtis";` in [main.js](main.js) to your name. (Please capitalize your name).
3) Load the unpacked extension into Chrome https://github.com/web-scrobbler/web-scrobbler/wiki/Install-an-unpacked-extension.
4) go on messenger.com and the side panel should appear! (You may need to reload messenger.com).

# Dev Notes
 - If you update the manifest.json you have to manually turn off/on the extension in the extensions page
 - This repo uses ES6 so if you are traversing DOM elements in jquery use `.each((idx, element) => {})';` when looping through children elements.
 - If you add a new js file. you have to delete the extension. Then load the unpacked version again for it to recognize the new js file.

# Design Decisions
- Each Messenger-Assistant Extension should have an index, script, and syle.css under it's directory name in the extensions directory.
- The dependencies directory is on the outside so multiple extensions can reuse the same dependencies.

# How to add a Messenger Assistant Extension
1) Put the html, css, and js files for your extension under the `extensions` directory.
1) In the [manifest.json](manifest.json) add the path to your js and css files under `content_scripts`. Then add the path to your HTML file under `web_accessible_resources`.
2) in [main.html](main.html) add `<div data-include="<your_extension_name>"></div>` in the `<div id="extensionsCon">...</div>` section.
3) Put `<extensionName>Init()` in the `initOnPageLoad()` function in [extensions.js](extensions.js) to initialize your extension. Your init function can return variables that will be passed on at every triggered event in [extensions.js](extensions.js). Simply put these variables in `initVars` if you need to reference them later.
4) Put functions that you want to be called for each event in [extensions.js](extensions.js). The current supported events are: `initOnPageLoad()`, `initOnChatLoad()`, `onRefreshBtnPressed()`, and `onChatChange()`.
