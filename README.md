# Messenger-Assistant

<p align="center">
  <img style="width: 800px;" src="https://chongcurtis.com/file_hosting/messenger_assistant_position.png" alt="The position of the extension on Messenger.com" width="800"/>
</p>
<p align="center">
  <img style="width: 400px;" src="https://chongcurtis.com/file_hosting/messenger_assistant_emojis2.png" alt="Messenger Assistant emojis" width="400"/>
  <img style="width: 400px;" src="https://chongcurtis.com/file_hosting/messenger_assistant_reminders2.png" alt="Messenger Assistant reminders" width="400"/>
</p>

# Features
 - Reminders
 - Copy and paste emojis at will ¯\\_(ツ)_/¯
 - A graph that displays the number of characters sent over time

# Installation
1) Run `git clone git@github.com:curtischong/Messenger-Assistant.git` in your terminal.
2) Change `const YOUR_NAME = "Curtis";` in [settings.js](settings.js) to your name. (Please capitalize your name).
3) Choose which extensions you want by placing the name of the extension in the `EXTENSIONS_TO_LOAD` array in [settings.js](settings.js). All extensions are selected by default.
4) Load the unpacked extension into Chrome https://github.com/web-scrobbler/web-scrobbler/wiki/Install-an-unpacked-extension.
5) go on messenger.com and the side panel should appear! (You may need to reload messenger.com).

# Design Decisions
- Each Messenger-Assistant Extension should have an index, script, and syle.css under its directory name in the extensions directory.
- The dependencies directory is on the outside so multiple extensions can reuse the same dependencies.

# How Create a Messenger Assistant Extension
1) Put the html, css, and js files for your extension under the `extensions` directory.
1) In the [manifest.json](manifest.json) add the path to your js and css files under `content_scripts`. Then add the path to your HTML file under `web_accessible_resources`.
2) in [main.html](main.html) add `<div data-include="<your_extension_name>"></div>` in the `<div id="extensionsCon">...</div>` section.
3) Put `<extensionName>Init()` in the `initOnPageLoad()` function in [extensions.js](extensions.js) to initialize your extension. Your init function can return variables that will be passed on at every triggered event in [extensions.js](extensions.js). Simply put these variables in `initVars` if you need to reference them later.
4) Put functions that you want to be called for each event in [extensions.js](extensions.js). The current supported events are: `initOnPageLoad()`, `initOnChatLoad()`, `onRefreshBtnPressed()`, and `onChatChange()`.
5) If your extension needs to make an external network call go into [manifest.json](manifest.json) and change the website in the `content_security_policy` section to the url of your website.

# Dev Notes
 - If you update the [manifest.json](manifest.json) you have to manually turn off/on the extension in the extensions page ([Extensions Reloader](https://chrome.google.com/webstore/detail/extensions-reloader/fimgfedafeadlieiabdeeaodndnlbhid?hl=en) won't work).
 - This repo uses ES6 so if you are traversing DOM elements in jquery use `.each((idx, element) => {})';` when looping through children elements.
 - Due to limitations with Chrome extensions, when you create a new file you must delete Messenger Assistant and reload the unpacked version of Messenger Assistant.
