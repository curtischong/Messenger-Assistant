# Messenger-Assistant

# Features
 - Time elapsed since you started talking
 - Graphs showing you:
  - The number of characters sent over time

# Installation


# Dev Notes
 - If you update the manifest.json you have to manually turn off/on the extension in the extensions page
 - This repo uses ES6 so if you are traversing DOM elements in jquery use `.each((idx, element) => {})';` when looping through children elements
 - If you add a new js file. you have to delete the extension. Then load the unpacked version again for it to recognize the new js file