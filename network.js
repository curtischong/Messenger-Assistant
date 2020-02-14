chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    switch(request.contentScriptQuery){
      case "httpPostRequest":
        const myHeaders = new Headers({
          'Content-Type': 'application/json; charset=utf-8',
        });
        fetch(request.url, {
          method: "POST",
          headers: myHeaders,
          body: request.body
        })
        .then((response) => {
          response.text().then((text) => {
            request.callback(JSON.parse(text))
          })
        })
        .catch((error) => {
          console.log("ERROR: request failed at " + request.url);
          console.log(error);
        })
        break
    case "httpGetRequest":
      const myHeaders = new Headers({
        'Content-Type': 'application/json; charset=utf-8',
      });
      fetch(request.url, {
        method: "GET",
        headers: myHeaders,
        body: request.body
      })
      .then((response) => {
        response.text().then((text) => {
          request.callback(JSON.parse(text))
        })
      })
      .catch((error) => {
        console.log("ERROR: request failed at " + request.url);
        console.log(error)
      })
      break
    }
    return true
  });