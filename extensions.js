// These functions are event hooks that are called upon events.
// Use them to give your extensions functionality.
// Due to limitations with Chrome Extensions, it's difficult to import modules.
// Please start your function hook names with the name of your extension

// initOnPageLoad runs everytime you enter messenger.com
let initOnPageLoad = () => {
  emojisInit();
  remindersInit();
  let characterCountInitVars = characterCountInit()

  // This object will be passed into the function hooks below.
  const initVars = {
    "characterCountChart": characterCountInitVars,
  }
  return initVars;
}

// initOnChatLoad runs everytime you enter a new chats
let initOnChatLoad = (initVars, convo) => {
  characterCountGenerateChart(initVars, convo);
  remindersPopulate();
}

// onRefreshBtnPressed runs everytime you press the refresh button
let onRefreshBtnPressed = (initVars, convo) => {
  characterCountGenerateChart(initVars, convo);
  remindersPopulate();
}

// onChatChange runs everytime the chat changes
let onChatChange = (initVars, convo, message) => {
  characterCountGenerateChart(initVars, convo);
}

// TODO: write a listener to call this function
// onMessageReceived runs everytime someone sends a message to the chat
let onMessageReceived = (initVars, convo, message) => {

}

// TODO: write a listener to call this function
// onMessageSent everytime you send a message
let onMessageSent = (initVars, convo, message) => {

}
