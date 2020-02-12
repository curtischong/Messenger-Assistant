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


let initReloadBtn = (charCntChart) => {
  $("#reloadBtn").on("click", () => {
    console.log("reload");
    loadSidebar(charCntChart);
  })
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
  initEmojis();
  return initVars;
}

let includeHtml = () => {
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
  $.get(chrome.extension.getURL('convo.html'), (data) => {
    $(data).appendTo('body');
    includeHtml();
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