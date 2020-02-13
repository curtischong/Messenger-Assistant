chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.contentScriptQuery == "new-lap") {
      var url = prodIP + "new-lap"
      const myHeaders = new Headers({
        'Content-Type': 'application/json; charset=utf-8',
      });
      fetch(url,{
        method: "POST", //send it through get method
        headers: myHeaders,
        body: request.body
      })
          .then((response) => {
            response.text().then((text) => {
              console.log(text)
              let status = JSON.parse(text).status
              if(status == "success"){
                sendResponse()
              }else{
                console.log("new-lap response failed")
              }
            })
          })
          .catch((error) => {
            console.log("new-lap failed");
            console.log(error);
          })
      return true;  // Will respond asynchronously.
    }
  });