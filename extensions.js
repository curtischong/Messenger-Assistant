// run this function everytime you enter messenger.com
let initOnPageLoad = () => {

  initEmojis();
  initReminders();
  let charCntChart = initCharacterCount()

  const initVars = {
    "charCntChart": charCntChart,
  }
  return initVars;
}

// run this fucntion everytime you enter a new chats
let initOnChatLoad = (initVars, convo) => {
  generateCharCntChart(initVars.charCntChart, convo);
  populateReminders()
}

// run this fucntion everytime you press the refresh button
let onRefreshBtnPressed = (initVars, convo) => {
  generateCharCntChart(initVars.charCntChart, convo);
  populateReminders()
}

// run this function everytime the chat changes
let onChatChange = (initVars, convo, message) => {
  generateCharCntChart(initVars.charCntChart, convo);
}

// TODO: write a listener to call this function
// run this function everytime someone sends a message to the chat
let onMessageReceived = (initVars, convo, message) => {

}

// TODO: write a listener to call this function
// run this function everytime you send a message
let onMessageSent = (initVars, convo, message) => {

}
