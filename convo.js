const YOUR_NAME = "Curtis";

let loadSidebar = (charCntChart) => {
  // These relevant Msgs are from the last conversation
  let relevantMsgs = getRelevantMsgs();
  let convo = parseConvo(relevantMsgs);
  generateCharCntChart(charCntChart, convo);
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

let observeMessageChanges = (messageObserver, config, retries) => {
  if (retries <= 0){
    return
  }
  try {
    messageObserver.observe($("#js_1")[0], config);
  }
  catch(error) {
    console.log("Cannot attach observer to detect new messages with error:")
    console.error(error);
    setTimeout(observeMessageChanges(messageObserver, retries - 1),1000);
  }
}

// run this fucntion everytime you enter a new chats
let main = (initVars) => {
  let charCntChart = initVars.charCntChart;
  let messageObserver = initVars.messageObserver;

  loadSidebar(charCntChart);
  const config = { attributes: false, childList: true, subtree: true};
  observeMessageChanges(messageObserver, config, 5)
}

let initMessageObserver = (charCntChart) => {
  let observeNewChats = (mutationsList, observer) => {
    if(mutationsList.length == 1 && $(mutationsList[0].target).attr("class") == "_41ud"){
      console.log("new change!")
      loadSidebar(charCntChart);
    // Theory: when you just start a new conversation
    // the mutationsList.length == 2
    }else if(mutationsList.length == 2){
      console.log(mutationsList);
    }
  }
  return new MutationObserver(observeNewChats);
}
let initPageObserver = (initVars) => {
  let observePageChange = (mutationsList, observer) => {
    console.log("swiched chats");
    let i = setInterval(() => {
      if ($('._41ud').length) {
        clearInterval(i);
        initVars.messageObserver.disconnect();
        main(initVars);
      }
    }, 100);
  }
  // Note: this mutation server never needs to be reassigned!
  const config = { attributes: false, childList: true, subtree: false};
  const pageObserver = new MutationObserver(observePageChange);
  pageObserver.observe($("._4sp8")[0], config)
}

let copyStringToClipboard = (str) => {
  // https://techoverflow.net/2018/03/30/copying-strings-to-the-clipboard-using-pure-javascript/
  var el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style = {position: 'absolute', left: '-9999px'};
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};


let initReloadBtn = (charCntChart) => {
  $("#reload").on("click", () => {
    console.log("reload");
    loadSidebar(charCntChart);
  })
}

let initPasteBin = () => {
  $(".pasteBtn").on("click", (e)=>{
    let text = $(e.target).html();
    copyStringToClipboard(text);
  });
}

// run this function everytime you enter messenger.com
let init = () => {
  setShowBtnListener();
  var charCntChartCtx = document.getElementById('charCntChart').getContext('2d');
  let charCntChart = getCharCntChart(charCntChartCtx);

  const messageObserver = initMessageObserver(charCntChart);
  const initVars = {
    "charCntChart": charCntChart,
    "messageObserver": messageObserver
  }

  initReloadBtn(charCntChart);
  initPageObserver(initVars);
  initPasteBin();
  return initVars;
}

$(document).ready( () => {
  $.get(chrome.extension.getURL('convo.html'), (data) => {
    $(data).appendTo('body');
    initReminders();

    $(window).on("load", () => {
      let i = setInterval(() => {
          if ($('._41ud').length) {
            clearInterval(i);
            // everything is now loaded
            console.log("Using convo.js!")
            let initVars = init();
            main(initVars);
          }
      }, 100);
    });
  });
});