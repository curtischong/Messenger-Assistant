const chatObserverConfig = { attributes: false, childList: true, subtree: true};

let getConvo = () => {
  let relevantMsgs = getRelevantMsgs();
  return parseConvo(relevantMsgs);
}

let setShowBtnListener = () => {
  let bodyIsHidden = true;
  $("#visibilityBtn").click(() => {
    if(bodyIsHidden){
      bodyIsHidden = false;
      $("#convoBody").css("visibility","visible");
    $("#visibilityBtn").html("Hide");
    }else{
      bodyIsHidden = true;
      $("#convoBody").css("visibility","hidden");
      $("#visibilityBtn").html("Show");
    }
  });
}

let initReloadBtn = (initVars) => {
  $("#reloadBtn").on("click", () => {
    console.log("reload");
    onRefreshBtnPressed(initVars, getConvo());
  })
}

let initMessengerAssistant = (initVars) => {
  console.log("Init Messenger Assistant");
  setShowBtnListener();
  initReloadBtn(initVars);

  const chatObserver = initChatObserver(initVars)
  observeChatChanges(chatObserver, chatObserverConfig, 5);
  initPageObserver(initVars, chatObserver);
  // not sure if I need to remake this chat observer when we switch chats.
  // If I have to I'll put this inside the initPageObserver function
  // so we'll make a new observer when we switch chats
}

let observeChatChanges = (chatObserver, config, retries) => {
  if (retries <= 0){
    console.log("Ran out of retries to attach Chat Observer")
    return
  }
  try {
    chatObserver.observe($("#js_1")[0], config)
    console.log("Chat Observer attached")
  }
  catch(error) {
    console.log("Cannot attach observer to detect new messages with error:")
    console.error(error)
    setTimeout(observeChatChanges(chatObserver, config, retries - 1),1000)
  }
}

let initChatObserver = (initVars) => {
  let observeNewChats = (mutationsList, observer) => {
    if(mutationsList.length == 1 && $(mutationsList[0].target).attr("class") == "_41ud"){
      console.log("new change!")
      let newMutationNodes = mutationsList[0].addedNodes
      if(newMutationNodes.length != 1){
        console.log("ERROR: new mutation nodes length != 1")
        console.log(newMutationNodes)
        return;
      }
      let newMessage = newMutationNodes[0].innerText
      onChatChange(observer.initVars, getRelevantMsgs(), newMessage)
    // Theory: when you just start a new conversation
    // the mutationsList.length == 2
    }else if(mutationsList.length == 2){
      console.log("error mutationsList has a length of 2 not 1")
      console.log(mutationsList)
    }
  }
  let chatObserver = new MutationObserver(observeNewChats);
  chatObserver.initVars = initVars;
  return chatObserver;
}
let initPageObserver = (initVars, chatObserver) => {
  let observePageChange = (mutationsList, observer) => {
    console.log("swiched chats");
    let i = setInterval(() => {
      if ($('._41ud').length) {
        clearInterval(i);
        chatObserver.disconnect();
        initOnChatLoad(initVars, getConvo());

        const newChatObserver = initChatObserver(initVars)
        observeChatChanges(newChatObserver, chatObserverConfig, 5);
      }
    }, 100);
  }
  // Note: this mutation server never needs to be reassigned!
  const config = { attributes: false, childList: true, subtree: false};
  const pageObserver = new MutationObserver(observePageChange);
  pageObserver.observe($("._4sp8")[0], config)
}

let loadHtmlForEachExtension = () => {
  $(function(){
    var includes = $('[data-include]');
    jQuery.each(includes, function(){
      var baseDir = "chrome-extension://kmghfconmpkjbigpjnahcfbjkgemaggf/"
      var htmlFile = baseDir + 'extensions/' + $(this).data('include') + '/index.html';
      //var js = baseDir + 'extensions/' + $(this).data('include') + '/index.html';
      $(this).load(htmlFile);
    });
  });
}

$(document).ready( () => {
  $.get(chrome.extension.getURL('main.html'), (data) => {
    $(data).appendTo('body');
    loadHtmlForEachExtension();
      let i = setInterval(() => {
          if ($('._41ud').length) {
            clearInterval(i);
            // everything is now loaded
            let initVars = initOnPageLoad();
            initMessengerAssistant(initVars);
            initOnChatLoad(initVars, getConvo());
          }
      }, 100);
  });
});